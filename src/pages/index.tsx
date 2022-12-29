import { GetStaticProps } from 'next';
import { Stack } from '@mui/joy';
import { withTranslations } from '@/util/i18n/withTranslations';
import { join } from 'path';
import { readFileSync } from 'fs';
import { remark } from 'remark';
import html from 'remark-html';

export interface HomePageProps {
  contentHtml: string;
}

const HomePage = (props: HomePageProps) => {
  return (
    <Stack spacing={1}>
      <div dangerouslySetInnerHTML={{ __html: props.contentHtml }} />
    </Stack>
  );
};

export default HomePage;

export const getStaticProps: GetStaticProps = withTranslations(async () => {
  const fullPath = join(`.`, `README.md`);
  let fileContents = readFileSync(fullPath, `utf8`);

  fileContents = fileContents
    .split(
      `
`,
    )
    .splice(3, fileContents.length)
    .join(`\n`);

  const processedContent = await remark().use(html).process(fileContents);

  const contentHtml = processedContent.toString();

  return {
    props: {
      contentHtml,
    },
  };
});
