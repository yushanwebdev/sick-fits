import { useRouter } from 'next/router';
import RequestReset from '../components/RequestReset';
import ResetForm from '../components/Reset';

export default function Reset() {
  const { query } = useRouter();

  if (!query?.token) {
    return <RequestReset />;
  }

  return (
    <div>
      <ResetForm token={query.token as string} />
    </div>
  );
}
