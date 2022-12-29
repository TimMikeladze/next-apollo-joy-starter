import { Modal, Stack, ModalDialog, Button, Typography } from '@mui/joy';
import { useTranslation } from 'next-i18next';
import { GitHub } from '@mui/icons-material';
import { signIn } from 'next-auth/react';

export interface SignInDialogProps {
  onClose: () => void;
  open: boolean;
}

const SignInDialog = (props: SignInDialogProps) => {
  const { t } = useTranslation();
  return (
    <Modal open={props.open} onClose={props.onClose}>
      <ModalDialog>
        <Stack spacing={2}>
          <Typography level="h5">
            {t(`signIntoApp`, {
              appName: t(`appName`),
            })}
          </Typography>
          <Button variant="outlined" onClick={() => signIn(`github`)}>
            <GitHub sx={{ mr: 2 }} />
            {t(`providers.github`)}
          </Button>
        </Stack>
      </ModalDialog>
    </Modal>
  );
};

export default SignInDialog;
