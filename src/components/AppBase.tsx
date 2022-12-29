import { CssVarsProvider } from '@mui/joy';
import { PropsWithChildren } from 'react';
import { appTheme } from '@/theme';

const AppBase = (props: PropsWithChildren) => {
  return (
    <CssVarsProvider theme={appTheme} defaultMode="dark">
      {props.children}
    </CssVarsProvider>
  );
};

export default AppBase;
