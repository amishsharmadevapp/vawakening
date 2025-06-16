import { Suspense } from 'react';
import LoginClientContent from '@/components/admin/LoginClientContent';

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginClientContent />
    </Suspense>
  );
}
