import { NextApiRequest, NextApiResponse } from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';

export const authenticate = async (args: {
  req: NextApiRequest;
  res?: NextApiResponse;
}): Promise<Session | null> => {
  let session: Session;

  try {
    session = await getSession({ req: args.req });
  } catch (error) {
    // log.error(error as any);
  }

  if (session) {
    return session;
  }

  return null;
};
