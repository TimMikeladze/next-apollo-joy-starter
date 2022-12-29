declare namespace NodeJS {
  interface ProcessEnv {
    FIREBASE_PRIVATE_KEY: string;
    GITHUB_CLIENT_ID: string;
    GITHUB_CLIENT_SECRET: string;
  }
}

declare module '*.graphql' {
  const content: any;
  export default content;
}
