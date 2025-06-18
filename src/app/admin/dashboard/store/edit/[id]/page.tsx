
import StoreProductForm from '@/components/admin/StoreProductForm';
import { getStoreProductById, updateStoreProductAction } from '@/app/admin/dashboard/store/actions';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Edit3 } from 'lucide-react';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'Edit Store Product - Admin',
  robots: 'noindex, nofollow',
};

interface EditStoreProductPageProps {
  params: { id: string };
}

export default async function EditStoreProductPage({ params }: EditStoreProductPageProps) {
  const product = await getStoreProductById(params.id);

  if (!product) {
    notFound();
  }

  const updateActionForProduct = updateStoreProductAction.bind(null, params.id);

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <Card className="max-w-3xl mx-auto shadow-lg">
         <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <Edit3 className="h-8 w-8 text-primary" />
            <CardTitle className="font-headline text-2xl md:text-3xl text-primary">Edit Store Product</CardTitle>
          </div>
          <CardDescription>Modify the details of the store product below.</CardDescription>
        </CardHeader>
        <CardContent>
          <StoreProductForm product={product} action={updateActionForProduct} />
        </CardContent>
      </Card>
    </div>
  );
}
