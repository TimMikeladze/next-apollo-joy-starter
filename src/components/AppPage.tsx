import { Box, Button, Divider, Sheet, Stack, Typography } from '@mui/joy';
import { PropsWithChildren, useState } from 'react';
import { useTranslation } from 'next-i18next';
import ThemeModeToggle from './ThemeModeToggle';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Head from 'next/head';

import UserMenu from './UserMenu';
import { getHomeRoute } from '@/util/routes';
import dynamic from 'next/dynamic';

const AppToaster = dynamic(() => import(`@/components/AppToaster`), {
  ssr: true,
});

const SignInDialog = dynamic(() => import(`@/components/SignInDialog`), {
  ssr: true,
});

const AppPage = (props: PropsWithChildren) => {
  const { t } = useTranslation();
  const session = useSession();
  const [signInDialogOpen, setSignInDialogOpen] = useState(false);
  return (
    <>
      <Head>
        <title>{t(`appName`)}</title>
      </Head>
      <Sheet
        sx={() => ({
          height: `100vh`,
        })}
      >
        <AppToaster />
        <SignInDialog
          open={signInDialogOpen}
          onClose={() => setSignInDialogOpen(false)}
        />
        <Box
          sx={(theme) => ({
            margin: `0 auto`,
            maxWidth: theme.breakpoints.values.lg,
          })}
        >
          <Stack direction="column">
            <Box
              sx={(theme) => ({
                width: `100%`,
                maxWidth: theme.breakpoints.values.xl,
              })}
            >
              <Sheet
                sx={() => ({
                  p: 2,
                })}
              >
                <Stack
                  direction="row"
                  flexWrap="wrap"
                  spacing={1}
                  alignItems="center"
                >
                  <Link href={getHomeRoute()}>
                    <Typography
                      level="h4"
                      sx={{
                        cursor: `pointer`,
                      }}
                    >
                      {t(`appName`)}
                    </Typography>
                    <Typography level="body3">{t(`slogan`)}</Typography>
                  </Link>
                  <Box sx={{ flex: 1 }} />

                  <ThemeModeToggle />
                  {session.status !== `authenticated` && (
                    <>
                      <Button onClick={() => setSignInDialogOpen(true)}>
                        {t(`signIn`)}
                      </Button>
                    </>
                  )}
                  {session.status === `authenticated` && (
                    <>
                      <UserMenu />
                    </>
                  )}
                </Stack>
                <Divider sx={{ mt: 2 }} />
              </Sheet>
            </Box>
            <Box sx={{ p: 2, pt: 0 }}>{props.children}</Box>
          </Stack>
        </Box>
      </Sheet>
    </>
  );
};

export default AppPage;
