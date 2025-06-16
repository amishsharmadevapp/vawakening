
import ProgramForm from '@/components/admin/ProgramForm';
import { getProgramById, updateProgramAction } from '@/app/admin/dashboard/programs/actions';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Edit3 } from 'lucide-react';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'Edit Program - Admin',
  robots: 'noindex, nofollow',
};

interface EditProgramPageProps {
  params: { id: string };
}

export default async function EditProgramPage({ params }: EditProgramPageProps) {
  const program = await getProgramById(params.id);

  if (!program) {
    notFound();
  }

  const updateActionForProgram = updateProgramAction.bind(null, params.id);

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <Card className="max-w-3xl mx-auto shadow-lg">
         <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <Edit3 className="h-8 w-8 text-primary" />
            <CardTitle className="font-headline text-2xl md:text-3xl text-primary">Edit Program</CardTitle>
          </div>
          <CardDescription>Modify the details of the program below.</CardDescription>
        </CardHeader>
        <CardContent>
          <ProgramForm program={program} action={updateActionForProgram} />
        </CardContent>
      </Card>
    </div>
  );
}
