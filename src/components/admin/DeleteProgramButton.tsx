
'use client';

import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { deleteProgramAction } from '@/app/admin/dashboard/programs/actions';

interface DeleteProgramButtonProps {
  programId: string;
  programTitle: string;
}

export default function DeleteProgramButton({ programId, programTitle }: DeleteProgramButtonProps) {
  return (
    <form action={deleteProgramAction.bind(null, programId)} className="inline-block">
      <Button
        type="submit"
        variant="destructive"
        size="sm"
        onClick={(e) => {
          if (!confirm(`Are you sure you want to delete the program "${programTitle}"? This action cannot be undone.`)) {
            e.preventDefault(); // Prevent form submission if cancelled
          }
        }}
      >
        <Trash2 className="mr-1.5 h-4 w-4" /> Delete
      </Button>
    </form>
  );
}
