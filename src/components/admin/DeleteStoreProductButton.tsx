
'use client';

import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { deleteStoreProductAction } from '@/app/admin/dashboard/store/actions';

interface DeleteStoreProductButtonProps {
  productId: string;
  productName: string;
}

export default function DeleteStoreProductButton({ productId, productName }: DeleteStoreProductButtonProps) {
  return (
    <form action={deleteStoreProductAction.bind(null, productId)} className="inline-block">
      <Button
        type="submit"
        variant="destructive"
        size="sm"
        onClick={(e) => {
          if (!confirm(`Are you sure you want to delete the product "${productName}"? This action cannot be undone.`)) {
            e.preventDefault();
          }
        }}
      >
        <Trash2 className="mr-1.5 h-4 w-4" /> Delete
      </Button>
    </form>
  );
}
