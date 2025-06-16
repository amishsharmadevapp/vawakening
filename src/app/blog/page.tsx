import React, { Suspense } from 'react';
import BlogClientContent from '@/components/blog/BlogClientContent';

export default function BlogPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BlogClientContent />
    </Suspense>
  );
}

