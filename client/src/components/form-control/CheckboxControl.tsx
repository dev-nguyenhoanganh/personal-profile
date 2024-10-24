import React, { ChangeEvent, useEffect } from 'react';
import { useFormContext, Controller, FieldValues } from 'react-hook-form';
import { FormGroup, Checkbox, FormControlLabel } from '@mui/material';

import { CheckboxValue } from '@/utils/constants';

type Option = {
  label: string;
  value: number;
};

interface InputControlProps {
  name: string;
  initValue?: string[];
  standAlone?: boolean;
  options: Option[];
}

const CheckboxControl = ({ options = [], name, initValue = [] }: InputControlProps) => {
  const { control, setValue } = useFormContext();

  useEffect(() => {
    if (initValue.length) {
      setValue(name, initValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initValue]);

  return (
    <React.Fragment>
      <FormGroup>
        {options.map((item, idx) => (
          <React.Fragment key={idx}>
            <Controller
              name={`${name}.${idx}`}
              control={control}
              render={({ field: { onChange, onBlur, ref, value } }: { field: FieldValues }) => (
                <FormControlLabel
                  label={item.label}
                  control={
                    <Checkbox
                      ref={ref}
                      checked={item.value === value}
                      value={value}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        onChange(e.target.checked ? CheckboxValue.Checked : CheckboxValue.Uncheck)
                      }
                      onBlur={onBlur}
                    />
                  }
                />
              )}
            />
          </React.Fragment>
        ))}
      </FormGroup>
    </React.Fragment>
  );
};

export default CheckboxControl;
