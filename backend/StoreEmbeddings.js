import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { Mistral } from '@mistralai/mistralai';
import fs from 'fs/promises';
import {createClient} from '@supabase/supabase-js';

const supabase = createClient(
  'https://hmzfnjcpojprdgnzqcbb.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhtemZuamNwb2pwcmRnbnpxY2JiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI1OTc4NjIsImV4cCI6MjA2ODE3Mzg2Mn0.-ij3szAf7EXiAVFvSr4Tgfz7HbeCbvvPNuGgQGn3QKs'
);

const apiKey = '0D2KCupNsY8OX3bTJdo37hIyeJEJRTpi';
const client = new Mistral({ apiKey });

async function splitterDocument(path) {
  const text = await fs.readFile(path, 'utf-8'); // ✅ Use fs.readFile instead of fetch
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 100,
  });
  const output = await splitter.createDocuments([text]);
  const textArr = output.map((chunk) => chunk.pageContent);
  return textArr;
}

async function createEmbeddings(chunks) {
  const embeddingResponse = await client.embeddings.create({
    model: 'mistral-embed',
    inputs: chunks,
  });
  const data = chunks.map((chunk, i) => {
        return {
            content: chunk,
            embedding: embeddingResponse.data[i].embedding
        }
    });
    return data;
}

const output = await splitterDocument('resume.txt');
const data = await createEmbeddings(output);
await supabase.from('sankalp_resume').insert(data);
