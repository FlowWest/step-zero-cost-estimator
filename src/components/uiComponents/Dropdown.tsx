import React, { useState } from 'react';
import { Box, TextField, MenuItem, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { DropdownProps } from '../../util/interfaces';

const useStyles = makeStyles((theme: Theme) => ({
  boxContainer: {
    '&:hover': {
      '&& fieldset': {
        border: '2px solid',
        borderColor: theme.palette.primary.dark
      }
    }
  },
  fieldInput: {
    width: '50ch'
  }
}));

const Dropdown = ({ dropdownLabel, dropdownHelperText, dropdownOptions }: DropdownProps) => {
  const selectData = dropdownOptions;
  const styles = useStyles();
  console.log(selectData);
  const [value, setValue] = useState('' as string);

  const handleChange = (event: any) => {
    setValue(event.target.value);
  };

  return (
    <Box component="form" className={styles.boxContainer}>
      <div>
        <TextField
          id="outlined-select-currency"
          select
          label={dropdownLabel}
          value={value}
          onChange={handleChange}
          helperText={dropdownHelperText}
          variant="outlined"
          className={styles.fieldInput}
        >
          {selectData.map((option: any, index: number) => {
            option.id = index;
            return (
              <MenuItem key={option.id} value={option.name}>
                {option.name}
              </MenuItem>
            );
          })}
        </TextField>
      </div>
    </Box>
  );
};

export default Dropdown;
