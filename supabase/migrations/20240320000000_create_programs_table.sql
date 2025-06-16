-- Create programs table
CREATE TABLE IF NOT EXISTS programs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  content_link TEXT NOT NULL,
  thumbnail_url TEXT,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE,
  created_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Create RLS policies
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read programs
CREATE POLICY "Allow public read access to programs"
  ON programs FOR SELECT
  USING (true);

-- Allow authenticated users to create programs
CREATE POLICY "Allow authenticated users to create programs"
  ON programs FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

-- Allow users to update their own programs
CREATE POLICY "Allow users to update their own programs"
  ON programs FOR UPDATE
  TO authenticated
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

-- Allow users to delete their own programs
CREATE POLICY "Allow users to delete their own programs"
  ON programs FOR DELETE
  TO authenticated
  USING (auth.uid() = created_by);

-- Create indexes
CREATE INDEX IF NOT EXISTS programs_created_by_idx ON programs(created_by);
CREATE INDEX IF NOT EXISTS programs_created_at_idx ON programs(created_at);
CREATE INDEX IF NOT EXISTS programs_tags_idx ON programs USING GIN(tags); 