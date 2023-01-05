import { gql, useMutation } from '@apollo/client';
import { CURRENT_USER_QUERY } from '../lib/useUser';

const SIGN_OUT_MUTATION = gql`
  mutation SignOut {
    endSession
  }
`;

export default function SignOut() {
  const [signout] = useMutation(SIGN_OUT_MUTATION, {
    refetchQueries: [
      {
        query: CURRENT_USER_QUERY,
      },
    ],
  });

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <button type="button" onClick={signout}>
      Sign Out
    </button>
  );
}
