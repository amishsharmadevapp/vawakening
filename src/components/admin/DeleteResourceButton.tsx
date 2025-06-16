
'use client';

import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { deleteResourceAction } from '@/app/admin/dashboard/resources/actions'; // Ensure this path is correct

interface DeleteResourceButtonProps {
  resourceId: string;
  resourceName: string;
}

export default function DeleteResourceButton({ resourceId, resourceName }: DeleteResourceButtonProps) {
  return (
    <form action={deleteResourceAction.bind(null, resourceId)} className="inline-block">
      <Button
        type="submit"
        variant="destructive"
        size="sm"
        onClick={(e) => {
          if (!confirm(`Are you sure you want to delete the resource "${resourceName}"? This action cannot be undone.`)) {
            e.preventDefault(); // Prevent form submission if cancelled
          }
        }}
      >
        <Trash2 className="mr-1.5 h-4 w-4" /> Delete
      </Button>
    </form>
  );
}
