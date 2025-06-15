
'use client';

import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { deleteBlogPostAction } from '@/app/admin/dashboard/blogs/actions';

interface DeletePostButtonProps {
  postId: string;
  postTitle: string;
}

export default function DeletePostButton({ postId, postTitle }: DeletePostButtonProps) {
  return (
    <form action={deleteBlogPostAction.bind(null, postId)} className="inline-block">
      <Button
        type="submit"
        variant="destructive"
        size="sm"
        onClick={(e) => {
          if (!confirm(`Are you sure you want to delete the post "${postTitle}"? This action cannot be undone.`)) {
            e.preventDefault(); // Prevent form submission if cancelled
          }
        }}
      >
        <Trash2 className="mr-1.5 h-4 w-4" /> Delete
      </Button>
    </form>
  );
}
