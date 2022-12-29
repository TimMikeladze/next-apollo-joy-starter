import { useColorScheme } from '@mui/joy/styles';
import { useEffect, useState } from 'react';
import { IconButton, Button, IconButtonProps } from '@mui/joy';
import { DarkModeTwoTone, LightModeTwoTone } from '@mui/icons-material';

const ThemeModeToggle = (props: IconButtonProps) => {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // to avoid layout shift, render a placeholder button
    return (
      <Button variant="plain" sx={(theme) => ({ width: theme.spacing(60) })} />
    );
  }

  return (
    <IconButton
      variant="plain"
      onClick={() => setMode(mode === `dark` ? `light` : `dark`)}
      {...props}
    >
      {mode === `dark` ? <LightModeTwoTone /> : <DarkModeTwoTone />}
    </IconButton>
  );
};

export default ThemeModeToggle;
