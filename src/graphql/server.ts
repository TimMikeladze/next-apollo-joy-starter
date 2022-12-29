import { makeExecutableSchema } from '@graphql-tools/schema';
import isDev from '@/util/is/isDev';
import { GetServerSidePropsContext, NextApiHandler } from 'next';
import merge from 'lodash/merge';
import { resolvers as graphqlScalars } from 'graphql-scalars';
import { log } from 'next-axiom';
import { getI18n } from '@/util/i18n';

import { rateLimitDirective } from 'graphql-rate-limit-directive';
import { ApolloServer, ContextFunction } from '@apollo/server';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import schema from './schema.graphql';
import { Resolvers } from '@/generated/graphql';
import auth from '@/modules/auth/resolvers';
import misc from '@/modules/misc/resolvers';
import { createAuthDirective } from './directives';
import { ApolloServerErrorCode } from '@apollo/server/errors';
import { Session } from 'next-auth';
import { authenticate } from '@/modules/auth/authenticate';
import { TFunction } from 'next-i18next';
import parseIp from '@/util/parseIp';

const directives: any = [createAuthDirective()];

export const resolvers: Resolvers = merge(
  {},
  {
    Date: graphqlScalars.Date,
    DateTime: graphqlScalars.DateTime,
    EmailAddress: graphqlScalars.EmailAddress,
  },
  auth,
  misc,
);
const { rateLimitDirectiveTypeDefs, rateLimitDirectiveTransformer } =
  rateLimitDirective<Context>({
    keyGenerator: (rateLimitArgs, _, args, ctx) => {
      return [ctx.ip, ctx.session?.user?.email].filter(Boolean).join(`:`);
    },
  });

const executableSchema = rateLimitDirectiveTransformer(
  directives.reduce(
    (schema: any, directive: any) => directive.transformer(schema),
    makeExecutableSchema({
      resolvers,
      typeDefs: [
        rateLimitDirectiveTypeDefs,
        ...directives.map((x: any) => x.typeDefs),
        schema,
      ],
    }),
  ),
);

export interface Context {
  ip?: string;
  req?: GetServerSidePropsContext['req'];
  res?: GetServerSidePropsContext['res'];
  session?: Session;
  t?: TFunction;
}

export const createApolloContext = async (
  { req, res }: Partial<GetServerSidePropsContext>,
  session: Session,
): Promise<Context> => {
  const t = await getI18n();
  const ip = parseIp(req);
  return {
    req,
    res,
    t,
    session,
    ip,
  };
};

export const apolloContext: ContextFunction<
  Parameters<NextApiHandler>,
  Context
> = async (req, res) => {
  return createApolloContext(
    {
      req,
      res,
    },
    await authenticate({ req, res }),
  );
};

export const apolloServer = new ApolloServer({
  persistedQueries: false,
  csrfPrevention: true,
  allowBatchedHttpRequests: true,
  formatError: (error: any) => {
    log.error(`GraphQLError`, {
      source: JSON.stringify(error.source),
      path: JSON.stringify(error.path),
      nodes: JSON.stringify(error.nodes),
      positions: JSON.stringify(error.positions),
      locations: JSON.stringify(error.locations),
      ...error,
    });
    if (error.extensions.code === ApolloServerErrorCode.BAD_USER_INPUT) {
      return error;
    }
    return null;
  },
  introspection: isDev(),
  schema: executableSchema,
});
