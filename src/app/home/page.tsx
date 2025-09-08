import { AuthProvider } from '@/contexts/auth-context';
import { HomeContent } from '@/components/home-content';

export default function HomePage() {
  return (
    <AuthProvider>
      <HomeContent />
    </AuthProvider>
  );
}
