-- Create the similarity search function for Supabase
-- Run this in your Supabase SQL editor

-- First, make sure you have the vector extension enabled
create extension if not exists vector;

-- Create the match_resume function for similarity search
create or replace function match_resume (
  query_embedding vector(1024),
  match_threshold float,
  match_count int
)
returns table (
  id bigint,
  content text,
  similarity float
)
language sql stable
as $$
  select
    id,
    content,
    1 - (sankalp_resume.embedding <=> query_embedding) as similarity
  from sankalp_resume
  where 1 - (sankalp_resume.embedding <=> query_embedding) > match_threshold
  order by sankalp_resume.embedding <=> query_embedding
  limit match_count;
$$;
