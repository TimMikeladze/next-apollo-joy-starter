import { QueryResolvers } from '@/generated/graphql';
import { APP_VERSION } from '@/util/constants';

const Query: QueryResolvers = {
  appVersion() {
    return {
      commit: (process.env.VERCEL_GIT_COMMIT_SHA || `xxxxxxx`).substr(0, 7),
      version: APP_VERSION,
    };
  },
};

const resolvers = { Query };

export default resolvers;
