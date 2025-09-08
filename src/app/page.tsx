import { AuthProvider } from '@/contexts/auth-context';
import { BankPageContent } from '@/components/bank-page-content';

export default function Home() {
  return (
    <AuthProvider>
      <BankPageContent />
    </AuthProvider>
  );
}
