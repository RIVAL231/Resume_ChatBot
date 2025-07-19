import { Mistral } from '@mistralai/mistralai';
import { createClient } from '@supabase/supabase-js';

const mistralClient = new Mistral({apiKey: "0D2KCupNsY8OX3bTJdo37hIyeJEJRTpi"});

const supabase = createClient(
  'https://hmzfnjcpojprdgnzqcbb.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhtemZuamNwb2pwcmRnbnpxY2JiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI1OTc4NjIsImV4cCI6MjA2ODE3Mzg2Mn0.-ij3szAf7EXiAVFvSr4Tgfz7HbeCbvvPNuGgQGn3QKs'
);

async function testEmbeddings() {
  const testQueries = [
    "What is Sankalp's education background?",
    "What programming languages does Sankalp know?",
    "Tell me about Sankalp's projects",
    "What is Sankalp's work experience?",
    "What are Sankalp's achievements?"
  ];

  console.log('Testing embedding retrieval...\n');

  for (const query of testQueries) {
    console.log(`\n🔍 Query: "${query}"`);
    
    try {
      // Create embedding for the query
      const response = await mistralClient.embeddings.create({
        model: 'mistral-embed',
        inputs: [query],
      });
      
      const embedding = response.data[0].embedding;
      
      // Retrieve matches
      const { data, error } = await supabase.rpc('match_resume', {
        query_embedding: embedding,
        match_threshold: 0.70,
        match_count: 3,
      });
      
      if (error) {
        console.error('❌ Error:', error);
        continue;
      }
      
      if (!data || data.length === 0) {
        console.log('❌ No matches found');
        continue;
      }
      
      console.log(`✅ Found ${data.length} matches:`);
      data.forEach((match, index) => {
        console.log(`   ${index + 1}. Similarity: ${match.similarity?.toFixed(3) || 'N/A'}`);
        console.log(`      Content: ${match.content.substring(0, 100)}...`);
      });
      
    } catch (error) {
      console.error('❌ Error:', error.message);
    }
  }
}

// Run the test
testEmbeddings().catch(console.error);
