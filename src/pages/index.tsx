import { GetStaticProps } from 'next';
import { Stack, Box } from '@mui/joy';
import { withTranslations } from '@/util/i18n/withTranslations';
import { join } from 'path';
import { existsSync, readFileSync } from 'fs';
import { remark } from 'remark';
import html from 'remark-html';

export interface HomePageProps {
  contentHtml: string;
}

const HomePage = (props: HomePageProps) => {
  return (
    <Stack spacing={1}>
      <Box dangerouslySetInnerHTML={{ __html: props.contentHtml }} />
    </Stack>
  );
};

export default HomePage;

export const getStaticProps: GetStaticProps = withTranslations(async () => {
  const fullPath = join(`.`, `README.md`);
  let fileContents = existsSync(fullPath)
    ? readFileSync(fullPath, `utf8`)
    : null;

  fileContents = fileContents
    ? fileContents
        .split(
          `
`,
        )
        .splice(3, fileContents.length)
        .join(`\n`)
    : `No README.md found in the root of the project. But that's okay! You probably just want begin coding your app. A great place to start would be by modifying the \`getStaticProps\` function in \`src/pages/index.tsx\` to remove this message and accompanying logic. Beyond that, good luck and happy coding!`;

  const processedContent = await remark().use(html).process(fileContents);

  const contentHtml = processedContent.toString();

  return {
    props: {
      contentHtml,
    },
  };
});
