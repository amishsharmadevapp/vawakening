
import ResourceForm from '@/components/admin/ResourceForm';
import { getResourceById, updateResourceAction } from '@/app/admin/dashboard/resources/actions';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Edit3 } from 'lucide-react';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'Edit Resource - Admin',
  robots: 'noindex, nofollow',
};

interface EditResourcePageProps {
  params: { id: string };
}

export default async function EditResourcePage({ params }: EditResourcePageProps) {
  const resource = await getResourceById(params.id);

  if (!resource) {
    notFound();
  }

  // Bind the resource ID to the update action
  const updateActionForResource = updateResourceAction.bind(null, params.id);

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <Card className="max-w-3xl mx-auto shadow-lg">
         <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <Edit3 className="h-8 w-8 text-primary" />
            <CardTitle className="font-headline text-2xl md:text-3xl text-primary">Edit Resource</CardTitle>
          </div>
          <CardDescription>Modify the details of the resource below.</CardDescription>
        </CardHeader>
        <CardContent>
          <ResourceForm resource={resource} action={updateActionForResource} />
        </CardContent>
      </Card>
    </div>
  );
}
