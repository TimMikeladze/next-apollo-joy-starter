import { QueryResolvers } from '@/generated/graphql';

const Query: QueryResolvers = {
  signedInUser(root, args, ctx) {
    return ctx.session.user;
  },
};

const resolvers = {
  Query,
};

export default resolvers;
