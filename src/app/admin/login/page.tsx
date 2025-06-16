import React, { Suspense } from 'react';
import LoginClientContent from '@/components/admin/LoginClientContent';

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginClientContent />
    </Suspense>
  );
}
