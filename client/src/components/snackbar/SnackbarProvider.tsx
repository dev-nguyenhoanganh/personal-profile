import { SnackbarProvider as NotiSnackbarProvider } from 'notistack';
import Slide, { SlideProps } from '@mui/material/Slide';
import { Snackbar } from '.';

const TransitionLeft = (props: Omit<SlideProps, 'direction'>) => {
  return <Slide {...props} direction="left" />;
};

interface SnackbarProviderProps {
  children: JSX.Element | JSX.Element[];
}

const SnackbarProvider = ({ children }: SnackbarProviderProps) => {
  return (
    <NotiSnackbarProvider
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      TransitionComponent={TransitionLeft}
      maxSnack={3}
      Components={{
        default: Snackbar,
        error: Snackbar,
        info: Snackbar,
        success: Snackbar,
        warning: Snackbar,
      }}>
      {children}
    </NotiSnackbarProvider>
  );
};

export default SnackbarProvider;
