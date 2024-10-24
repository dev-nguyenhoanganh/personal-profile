import * as React from 'react';
import MuiAlert, { AlertColor } from '@mui/material/Alert';
import { useSnackbar, CustomContentProps, SnackbarContent, SnackbarKey } from 'notistack';

const Snackbar = React.forwardRef<HTMLDivElement, CustomContentProps>((props, ref) => {
  const { message, variant, id } = props;
  const { closeSnackbar } = useSnackbar();

  const handleClose = (id: SnackbarKey) => (_?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    closeSnackbar(id);
  };

  return (
    <SnackbarContent role="alert" ref={ref}>
      <MuiAlert
        elevation={6}
        variant="filled"
        sx={{ width: 'fit-content', fontWeight: 'normal' }}
        onClose={handleClose(id)}
        severity={variant as AlertColor}>
        {message}
      </MuiAlert>
    </SnackbarContent>
  );
});

export default Snackbar;
