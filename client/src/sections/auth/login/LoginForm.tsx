import { FormEvent, useState } from 'react';
import { Link as ReactLink } from 'react-router-dom';
import { FieldValues, FormProvider, useForm, Resolver } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { useSnackbar } from 'notistack';

// Validate
import { object, ValidationError, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// @mui
import { Link, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// components
import InputControl from '@/components/form-control/InputControl';
import CheckboxControl from '@/components/form-control/CheckboxControl';

// Hook
// import { useAppDispatch } from '@/store/hook';
// import { login } from '@/store/auth';

import { URL_MAPPING } from '@/routes/urlMapping';
import { CheckboxValue } from '@/utils/constants';

// ----------------------------------------------------------------------

const LOGIN_OPTION = [{ label: 'Remember me', value: CheckboxValue.Checked }];

interface FormData extends FieldValues {
  username: string;
  password: string;
  remember: string[];
}

export default function LoginForm() {
  const { formatMessage } = useIntl();
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar: openSnackbar } = useSnackbar();

  const validationSchema = object<FormData>().shape({
    username: string()
      .min(4)
      .max(100)
      .required(formatMessage({ id: 'validate.required' })),
    password: string().required(formatMessage({ id: 'validate.required' })),
  });

  const formConfig = useForm<FormData>({
    defaultValues: {
      username: '',
      password: '',
      remember: [],
    },
    resolver: yupResolver(validationSchema) as unknown as Resolver<FormData>,
  });

  const { getValues, clearErrors, setError } = formConfig;

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (loading) {
        return;
      }

      setLoading(true);
      clearErrors();

      const { username, password } = getValues();
      await validationSchema.validate({ username, password }, { abortEarly: false });
    } catch (e) {
      if (e instanceof ValidationError) {
        e.inner.map((field) => {
          const fieldName = field.path ?? '';
          // Highlight Error and display error message
          setError(fieldName, field);
        });
        return;
      }

      openSnackbar((e as Error).message, { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <FormProvider {...formConfig}>
        <Stack spacing={3}>
          <InputControl label="Username" name="username" dataTestId="username-input" />
          <InputControl label="Password" name="password" type="password" dataTestId="password-input" />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <CheckboxControl name="remember" options={LOGIN_OPTION} />
          <Link
            component={ReactLink}
            variant="subtitle2"
            underline="hover"
            to={URL_MAPPING.RESET_PASSWORD}
            data-testid="forgot-button">
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={loading}
          data-testid="login-button">
          Login
        </LoadingButton>
      </FormProvider>
    </form>
  );
}
