import NextAuth, { AuthOptions } from 'next-auth';
import isDowntime from '@/util/is/isDowntime';
import Github from 'next-auth/providers/github';
import isPreview from '@/util/is/isPreview';

export const nextAuthConfig: AuthOptions = {
  providers: [
    // Add your providers here
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    session(params) {
      // Note: you can add custom params to your session here,
      // for example a user role fetched from your database.

      // params.session = "admin";

      // Remember to update the `types.d.ts` file in order to
      // reflect your changes to the session type.

      return params.session;
    },
    async signIn({ user, account }) {
      if (isDowntime()) {
        throw new Error(`Downtime`);
      }
      if (!account?.provider) {
        throw new Error(`No provider`);
      }

      if (!user) {
        throw new Error(`No user`);
      }

      if (!user.email) {
        throw new Error(`No email`);
      }

      if (isPreview() && process.env.ALLOWED_EMAILS) {
        const allowedEmails = process.env.ALLOWED_EMAILS?.split(`,`);
        if (!allowedEmails?.includes(user.email)) {
          return false;
        }
      }

      // Note: This is a good place to check if a user is exists in your database
      // and if not, create a new user record. A sample implementation is provided
      // below.

      // try {
      //   const foundUser = await getUser({ email: user.email });
      //   if (foundUser) {
      //     const matchingProviders = foundUser.provider === account.provider;
      //     if (matchingProviders) {
      //       await upsertUser({
      //         id: foundUser.id,
      //         image: user.image,
      //       });
      //     }
      //     return matchingProviders;
      //   } else {
      //     await createUser({
      //       email: user.email,
      //       displayName: user.name || user.email.split(`@`)[0],
      //       provider: account.provider,
      //       image: user.image,
      //     });
      //     return true;
      //   }
      // } catch (err) {
      //   return false;
      // }

      return true;
    },
  },
};

export default NextAuth(nextAuthConfig);
