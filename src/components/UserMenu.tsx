import { Avatar, Divider, ListItemDecorator, Menu, MenuItem } from '@mui/joy';
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

const UserMenu = () => {
  const { t } = useTranslation();
  const signedInUserQuery = useQuery(SignedInUserQuery);
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
        sx={{ ml: 1, cursor: `pointer` }}
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
      </Menu>
    </>
  );
};

export default UserMenu;
