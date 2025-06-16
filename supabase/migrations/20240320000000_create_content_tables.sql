-- Create blogs table
CREATE TABLE IF NOT EXISTS blogs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  slug TEXT UNIQUE NOT NULL,
  thumbnail_url TEXT,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE,
  created_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE
);

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

-- Create resources table
CREATE TABLE IF NOT EXISTS resources (
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

-- Enable Row Level Security
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for blogs
CREATE POLICY "Allow public read access to blogs"
  ON blogs FOR SELECT
  USING (true);

CREATE POLICY "Allow authenticated users to create blogs"
  ON blogs FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Allow users to update their own blogs"
  ON blogs FOR UPDATE
  TO authenticated
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Allow users to delete their own blogs"
  ON blogs FOR DELETE
  TO authenticated
  USING (auth.uid() = created_by);

-- Create RLS policies for programs
CREATE POLICY "Allow public read access to programs"
  ON programs FOR SELECT
  USING (true);

CREATE POLICY "Allow authenticated users to create programs"
  ON programs FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Allow users to update their own programs"
  ON programs FOR UPDATE
  TO authenticated
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Allow users to delete their own programs"
  ON programs FOR DELETE
  TO authenticated
  USING (auth.uid() = created_by);

-- Create RLS policies for resources
CREATE POLICY "Allow public read access to resources"
  ON resources FOR SELECT
  USING (true);

CREATE POLICY "Allow authenticated users to create resources"
  ON resources FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Allow users to update their own resources"
  ON resources FOR UPDATE
  TO authenticated
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Allow users to delete their own resources"
  ON resources FOR DELETE
  TO authenticated
  USING (auth.uid() = created_by);

-- Create indexes for blogs
CREATE INDEX IF NOT EXISTS blogs_created_by_idx ON blogs(created_by);
CREATE INDEX IF NOT EXISTS blogs_created_at_idx ON blogs(created_at);
CREATE INDEX IF NOT EXISTS blogs_tags_idx ON blogs USING GIN(tags);
CREATE INDEX IF NOT EXISTS blogs_slug_idx ON blogs(slug);

-- Create indexes for programs
CREATE INDEX IF NOT EXISTS programs_created_by_idx ON programs(created_by);
CREATE INDEX IF NOT EXISTS programs_created_at_idx ON programs(created_at);
CREATE INDEX IF NOT EXISTS programs_tags_idx ON programs USING GIN(tags);

-- Create indexes for resources
CREATE INDEX IF NOT EXISTS resources_created_by_idx ON resources(created_by);
CREATE INDEX IF NOT EXISTS resources_created_at_idx ON resources(created_at);
CREATE INDEX IF NOT EXISTS resources_tags_idx ON resources USING GIN(tags); 