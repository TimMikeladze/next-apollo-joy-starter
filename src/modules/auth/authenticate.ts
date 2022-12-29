import { NextApiRequest, NextApiResponse } from 'next';
import { Session, unstable_getServerSession } from 'next-auth';
import { nextAuthConfig } from '@/pages/api/auth/[...nextauth]';

export const authenticate = async (args: {
  req: NextApiRequest;
  res?: NextApiResponse;
}): Promise<Session | null> => {
  let session: Session;

  try {
    session = await unstable_getServerSession(
      args.req,
      args.res,
      nextAuthConfig,
    );
  } catch (error) {
    // log.error(error as any);
  }

  if (session) {
    return session;
  }

  return null;
};
