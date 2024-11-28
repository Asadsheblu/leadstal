// /pages/[shortCode].js
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function RedirectPage() {
  const router = useRouter();
  const { shortCode } = router.query;

  useEffect(() => {
    if (typeof window !== 'undefined' && shortCode) {
      const originalUrl = localStorage.getItem(shortCode);

      if (originalUrl) {
        window.location.replace(originalUrl);
      } else {
        router.replace('/404');
      }
    }
  }, [shortCode, router]);

  return (
    <div style={{ display: 'none' }}>
      {/* কোনো কনটেন্ট এখানে রেন্ডার হবে না */}
    </div>
  );
}
