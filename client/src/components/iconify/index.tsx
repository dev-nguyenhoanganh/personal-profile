import React from 'react';
import { Box } from '@mui/material';

import { Icon, IconifyIcon } from '@iconify/react';

interface RootProps {
  width?: string | number;
  icon: string | IconifyIcon;
  sx?: object;
  color?: string;
}

export default function Iconify({ width = 20, icon, sx, color }: RootProps) {
  return (
    <React.Fragment>
      <Box component={Icon} icon={icon} sx={{ color, width, height: width, ...sx }} />
    </React.Fragment>
  );
}
