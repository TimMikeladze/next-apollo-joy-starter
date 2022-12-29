import {
  Avatar,
  Divider,
  ListItemDecorator,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/joy';
import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import {
  DarkModeTwoTone,
  DashboardOutlined,
  LightModeTwoTone,
  LogoutOutlined,
} from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useColorScheme } from '@mui/joy/styles';
import { signOut } from 'next-auth/react';
import { SignedInUserQuery } from '@/modules/auth/graphql';
import { getHomeRoute } from '@/util/routes';
import { AppVersionQuery } from '@/modules/misc/graphql';

const UserMenu = () => {
  const { t } = useTranslation();
  const signedInUserQuery = useQuery(SignedInUserQuery);
  const appVersionQuery = useQuery(AppVersionQuery);
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);
  const router = useRouter();
  const { mode, setMode } = useColorScheme();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpen = (event: { currentTarget: any }) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <Avatar
        onClick={handleOpen}
        sx={{ cursor: `pointer` }}
        src={signedInUserQuery.data?.signedInUser?.image}
      />
      <Menu
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleClose}
        sx={(theme) => ({
          minWidth: theme.spacing(32),
        })}
        placement="bottom-start"
      >
        <MenuItem
          onClick={() => {
            handleClose();
            router.push(getHomeRoute());
          }}
        >
          <ListItemDecorator>
            <DashboardOutlined />
          </ListItemDecorator>
          {t(`home`)}
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            setMode(mode === `dark` ? `light` : `dark`);
          }}
        >
          <ListItemDecorator>
            {mode === `dark` ? <LightModeTwoTone /> : <DarkModeTwoTone />}
          </ListItemDecorator>
          {mode === `dark` ? t(`switchToLightMode`) : t(`switchToDarkMode`)}
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            handleClose();
            signOut();
          }}
        >
          <ListItemDecorator>
            <LogoutOutlined />
          </ListItemDecorator>
          {t(`signOut`)}
        </MenuItem>
        <Divider />
        <Stack
          sx={{
            px: 1,
            pt: 0.5,
          }}
          direction="row"
          flexWrap="wrap"
          justifyContent="space-between"
        >
          <Typography level="body3">
            {appVersionQuery.data?.appVersion?.version && (
              <>v{appVersionQuery.data?.appVersion?.version}</>
            )}
          </Typography>
          <Typography level="body3">
            {appVersionQuery.data?.appVersion?.commit}
          </Typography>
        </Stack>
      </Menu>
    </>
  );
};

export default UserMenu;
