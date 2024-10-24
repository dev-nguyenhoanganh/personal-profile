import React from 'react';
import { useIntl } from 'react-intl';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Typography, Divider, Stack, Button, Box, Paper } from '@mui/material';
import { useSnackbar } from 'notistack';

// hooks
import useResponsive from '@/hooks/useResponsive';
// components
import Iconify from '@/components/iconify';
import LazyImage from '@/components/lazy-image';
import LoginForm from '@/sections/auth/login/LoginForm';
// sections

// ----------------------------------------------------------------------

const StyledContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  minHeight: '100vh',

  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'center/cover no-repeat url("./assets/images/River side.jpg")',
    zIndex: '-1',
    opacity: theme.palette.mode === 'dark' ? 0.5 : 1,
  },
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(2),
  },
}));

const StyledForm = styled(Paper)(({ theme }) => ({
  margin: 'auto',
  backgroundImage: 'none',
  overflow: 'hidden',
  position: 'relative',
  borderRadius: '16px',
  zIndex: 0,
  padding: theme.spacing(6, 3),
  backgroundColor: alpha(theme.palette.background.paper, theme.palette.mode === 'dark' ? 0.1 : 0.8),
  backdropFilter: 'blur(135px)',
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 500,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(3),

  [theme.breakpoints.down('lg')]: {
    margin: 'auto',
    borderRadius: '16px',
    backgroundColor: alpha(theme.palette.background.paper, theme.palette.mode === 'dark' ? 0.1 : 0.8),
    backdropFilter: 'blur(135px)',
  },
}));

const StyledContent = styled('div')(() => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
}));

// ----------------------------------------------------------------------

export default function HomePage() {
  const upLg = useResponsive('up', 'lg');
  // const dispatch = useAppDispatch();
  const { formatMessage } = useIntl();

  const { enqueueSnackbar: openSnackbar } = useSnackbar();

  const showMaintainMessage = () => {
    openSnackbar(formatMessage({ id: 'notice.maintain' }), {
      variant: 'warning',
    });
  };

  return (
    <React.Fragment>
      <StyledContainer>
        <StyledSection>
          <Typography data-testid="sign-in-label" variant="h3" sx={{ mt: 2, mb: 4 }} gutterBottom>
            Sign in
          </Typography>

          <Stack direction="row" spacing={2}>
            <Button
              fullWidth
              data-testid="google-button"
              size="large"
              color="inherit"
              variant="outlined"
              onClick={showMaintainMessage}>
              <Iconify icon="eva:google-fill" color="#DF3E30" width={22} />
            </Button>

            <Button
              data-testid="facebook-button"
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              onClick={showMaintainMessage}>
              <Iconify icon="eva:facebook-fill" color="#1877F2" width={22} />
            </Button>

            <Button
              data-testid="twitter-button"
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              onClick={showMaintainMessage}>
              <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={22} />
            </Button>
          </Stack>

          <Divider sx={{ my: 3 }}>
            <Typography data-testid="or-label" variant="body2" sx={{ color: 'text.secondary' }}>
              OR
            </Typography>
          </Divider>

          <LoginForm />
        </StyledSection>

        {upLg && (
          <StyledForm>
            <StyledContent>
              <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
                Hi, Welcome Back
              </Typography>
              <LazyImage src="/assets/illustrations/illustration_dashboard.png" alt="login" />
            </StyledContent>
          </StyledForm>
        )}
      </StyledContainer>
    </React.Fragment>
  );
}
