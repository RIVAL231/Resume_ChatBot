import { Mistral } from '@mistralai/mistralai';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.MISTRAL_API;
 // Use environment variable or fallback
const supabaseUrl = process.env.SUPABASE_URL || 'https://hmzfnjcpojprdgnzqcbb.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const mistralClient = new Mistral({apiKey: apiKey });



const supabase = createClient(
  supabaseUrl,
  supabaseKey
);

// Main chat endpoint controller
export const chatController = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Process the chat request
    const embedding = await createEmbedding(message);
    const context = await retrieveMatches(embedding);
    const response = await generateResponse(context, message);

    res.json({ response });
  } catch (error) {
    console.error('Chat controller error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Helper function to create embeddings
async function createEmbedding(input) {
  const response = await mistralClient.embeddings.create({
    model: 'mistral-embed',
    inputs: [input], // ✅ Must use 'inputs' not 'input'
  });
  return response.data[0].embedding;
}

// Helper function to retrieve matches from Supabase
async function retrieveMatches(embedding) {
  try {
    const { data, error } = await supabase.rpc('match_resume', {
      query_embedding: embedding,
      match_threshold: 0.70, // Lowered threshold for better matches
      match_count: 3, // Get multiple chunks for better context
    });
    
    if (error) {
      console.error('Supabase RPC error:', error);
      return '';
    }
    
    if (!data || data.length === 0) {
      return 'No relevant information found in Sankalp\'s resume.';
    }
    
    // Combine multiple chunks for richer context
    return data.map(item => item.content).join('\n\n');
  } catch (error) {
    console.error('Error retrieving matches:', error);
    return '';
  }
}

// Helper function to generate response using Mistral
async function generateResponse(context, input) {
  const systemPrompt = `You are Sankalp Sharma's professional AI assistant. You have access to his complete resume and portfolio information.

About Sankalp:
- Final year Computer Science student at VIT Vellore (CGPA: 8.94/10)
- Specialization in IoT and Full Stack Development
- General Secretary at IET-VIT
- Winner of SIH Internal Hackathon 2024
- Currently working as Full Stack Developer and DevOps Intern at HealthSutra Analytics

Key Expertise:
- Full Stack Development (React.js, Next.js, Node.js, FastAPI)
- DevOps & Cloud (Docker, AWS EC2, GitHub Actions, CI/CD)
- AI/ML Projects (TensorFlow, CNN models)
- Database Management (MongoDB, Supabase, MySQL)

When answering:
1. Be enthusiastic and professional
2. Highlight his achievements and skills relevant to the question
3. Provide specific examples from his projects and experience
4. If asked about hiring, emphasize his strong academic record, leadership experience, and practical project experience
5. Use the context information to provide accurate details

Context from resume: ${context}

Always respond as if you're representing Sankalp professionally to potential employers, collaborators, or anyone interested in his work.`;

  const response = await mistralClient.chat.complete({
    model: 'mistral-small-latest',
    messages: [
      {
        role: 'system',
        content: systemPrompt,
      },
      {
        role: 'user',
        content: input,
      },
    ],
    temperature: 0.7, // Add some creativity while keeping factual
    max_tokens: 500, // Ensure detailed responses
  });

  return response.choices[0].message.content;
}