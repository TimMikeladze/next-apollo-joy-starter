import { CssBaseline, CssVarsProvider } from '@mui/joy';
import { PropsWithChildren } from 'react';
import { appTheme } from '@/theme';

const AppBase = (props: PropsWithChildren) => {
  return (
    <CssVarsProvider theme={appTheme} defaultMode="dark">
      <CssBaseline />
      {props.children}
    </CssVarsProvider>
  );
};

export default AppBase;
