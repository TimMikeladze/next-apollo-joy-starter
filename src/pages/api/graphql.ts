import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { apolloServer, apolloContext } from '@/graphql/server';

export default startServerAndCreateNextHandler(apolloServer, {
  context: apolloContext,
});
