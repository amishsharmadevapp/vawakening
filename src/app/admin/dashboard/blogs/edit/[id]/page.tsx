
import BlogForm from '@/components/admin/BlogForm';
import { getBlogPostById, updateBlogPostAction } from '@/app/admin/dashboard/blogs/actions';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Edit3 } from 'lucide-react';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'Edit Blog Post - Admin',
  robots: 'noindex, nofollow',
};

interface EditBlogPageProps {
  params: { id: string };
}

export default async function EditBlogPage({ params }: EditBlogPageProps) {
  const post = await getBlogPostById(params.id);

  if (!post) {
    notFound();
  }

  // Bind the post ID to the update action
  const updateActionForPost = updateBlogPostAction.bind(null, params.id);

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <Card className="max-w-3xl mx-auto shadow-lg">
         <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <Edit3 className="h-8 w-8 text-primary" />
            <CardTitle className="font-headline text-2xl md:text-3xl text-primary">Edit Blog Post</CardTitle>
          </div>
          <CardDescription>Modify the details of your blog post below.</CardDescription>
        </CardHeader>
        <CardContent>
          <BlogForm post={post} action={updateActionForPost} />
        </CardContent>
      </Card>
    </div>
  );
}
