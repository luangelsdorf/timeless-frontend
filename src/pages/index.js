import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

export default function Index() {
  const router = useRouter();
  useEffect(() => {
    router.push('/categorias');
  })
  return (
    <div>index</div>
  )
}