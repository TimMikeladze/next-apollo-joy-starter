import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSidePropsContext } from 'next';
import { Stack } from '@mui/joy';
import { useTranslation } from 'next-i18next';

const Landing = () => {
  const { t } = useTranslation();

  return <Stack spacing={1}></Stack>;
};

export default Landing;

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  return {
    props: {
      ...(await serverSideTranslations(context.locale as string, [`common`])),
    },
  };
};
