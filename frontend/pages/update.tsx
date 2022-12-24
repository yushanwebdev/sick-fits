import { useRouter } from 'next/router';
import UpdateProduct from '../components/UpdateProduct';

export default function Update() {
  const { query } = useRouter();

  return (
    <div>
      <UpdateProduct id={query.id as string} />
    </div>
  );
}
