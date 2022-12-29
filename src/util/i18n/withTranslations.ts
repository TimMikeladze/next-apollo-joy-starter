import {
  GetServerSidePropsContext,
  GetStaticProps,
  GetStaticPropsContext,
} from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next/types';

export const withTranslations =
  (fn: GetServerSideProps | GetStaticProps) =>
  async (context: GetServerSidePropsContext | GetStaticPropsContext) => {
    const translations = await serverSideTranslations(context.locale, [
      `common`,
    ]);

    const gsspData: any = await fn(context as any);

    return {
      props: {
        ...(gsspData?.props || {}),
        ...translations,
      },
    };
  };
