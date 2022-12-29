import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next/types';

export const withTranslations =
  (fn: GetServerSideProps) => async (context: GetServerSidePropsContext) => {
    const translations = await serverSideTranslations(context.locale, [
      `common`,
    ]);

    const gsspData: any = await fn(context);

    return {
      props: {
        ...(gsspData?.props || {}),
        ...translations,
      },
    };
  };
