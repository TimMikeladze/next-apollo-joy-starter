import { GetStaticProps } from 'next';
import { Stack, Typography } from '@mui/joy';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { withTranslations } from '@/util/i18n/withTranslations';

const Home = () => {
  const { t } = useTranslation();
  return (
    <Stack spacing={1}>
      <Typography level="h5">{t(`helloThere`)}</Typography>
      <Typography level="body2">
        <Link href="https://github.com/TimMikeladze/next-apollo-joy-starter">
          {t(`learnMore`, {
            url: t(`learnMoreUrl`),
          })}
        </Link>
      </Typography>
    </Stack>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = withTranslations(() => {
  return {
    props: {},
  };
});
