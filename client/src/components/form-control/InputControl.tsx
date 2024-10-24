import React, { useCallback, useEffect, useState } from 'react';
import { useFormContext, Controller, FieldValues } from 'react-hook-form';
import {
  IconButton,
  InputAdornment,
  TextField,
  OutlinedInput,
  FormControl,
  InputLabel,
  FormHelperText,
  alpha,
} from '@mui/material';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

interface InputControlProps {
  label: string;
  name: string;
  initValue?: string;
  type?: string;
  disabled?: boolean;
  dataTestId?: string;
}

const InputControl = ({
  label,
  name,
  initValue = '',
  type = 'text',
  disabled = false,
  dataTestId,
}: InputControlProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    if (initValue) {
      setValue(name, initValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initValue]);

  const renderInput = useCallback(
    ({ field }: { field: FieldValues }) => {
      if (type !== 'password') {
        return (
          <TextField
            inputProps={{
              ...field,
              'aria-label': name,
              'data-testid': dataTestId,
            }}
            error={Boolean(errors[name])}
            type={type}
            sx={(theme) => ({
              '&>.Mui-error>input': {
                background: alpha('#FFF2F721', theme.palette.mode === 'dark' ? 0.12 : 0.8),
              },
              '&>.MuiFormHelperText-root': { fontSize: 'inherit' },
              '&>.Mui-disabled>fieldset': {
                backgroundColor: alpha(theme.palette.text.primary, 0.12),
              },
            })}
            helperText={errors[name]?.message as string}
            label={label}
            disabled={disabled}
          />
        );
      }

      return (
        <FormControl variant="outlined">
          <InputLabel error={Boolean(errors[name])}>{label}</InputLabel>
          <OutlinedInput
            name={name}
            label={label}
            sx={(theme) => ({
              '&.Mui-error': {
                background: alpha('#FFF2F721', theme.palette.mode === 'dark' ? 0.12 : 0.8),
              },
            })}
            type={showPassword ? 'text' : 'password'}
            error={Boolean(errors[name])}
            inputProps={{
              ...field,
              'aria-label': name,
              'data-testid': dataTestId,
            }}
            disabled={disabled}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            }
          />
          {errors[name]?.message && (
            <FormHelperText error={Boolean(errors[name])} sx={{ fontSize: 'inherit' }}>
              {errors[name]?.message as string}
            </FormHelperText>
          )}
        </FormControl>
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [showPassword, errors],
  );

  return (
    <React.Fragment>
      <Controller name={name} control={control} render={renderInput} />
    </React.Fragment>
  );
};

export default InputControl;
