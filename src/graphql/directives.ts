import { mapSchema, getDirective, MapperKind } from '@graphql-tools/utils';
import { defaultFieldResolver, GraphQLError, GraphQLSchema } from 'graphql';

export const createAuthDirective = (directiveName = `auth`) => {
  return {
    typeDefs: `directive @${directiveName}(noError: Boolean) on OBJECT | FIELD_DEFINITION`,
    transformer: (schema: GraphQLSchema) =>
      mapSchema(schema, {
        [MapperKind.OBJECT_FIELD](fieldConfig) {
          const directive = getDirective(
            schema,
            fieldConfig,
            directiveName,
          )?.[0];
          if (directive) {
            const { resolve = defaultFieldResolver } = fieldConfig;
            return {
              ...fieldConfig,
              async resolve(root, args, ctx, info) {
                const authed = !!ctx.session;
                if (!authed) {
                  if (!directive.noError) {
                    throw new GraphQLError(`Not signed in`, {
                      extensions: {
                        code: `FORBIDDEN`,
                      },
                    });
                  }
                }
                const result = authed
                  ? await resolve(root, args, ctx, info)
                  : null;
                return result;
              },
            };
          }
        },
      }),
  };
};
