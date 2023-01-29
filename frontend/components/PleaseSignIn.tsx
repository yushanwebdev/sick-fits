/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import { useUser } from '../lib/useUser';
import SignIn from './SignIn';

export default function PleaseSignIn({
  children,
}: {
  children: React.ReactElement;
}) {
  const me = useUser();

  if (!me) {
    return <SignIn />;
  }

  return children;
}
