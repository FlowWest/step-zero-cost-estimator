import React, { useEffect, useState } from 'react';
import { Box, TextField, Theme } from '@mui/material';
import MUIAutocomplete from '@mui/material/Autocomplete';
import { makeStyles } from '@mui/styles';
import { AutocompleteProps } from '../../util/interfaces';

const useStyles = makeStyles((theme: Theme) => ({
  selectItem: {
    backgroundColor: theme.palette.background.default
  },
  paper: {
    backgroundColor: theme.palette.background.default
  }
}));

const Autocomplete = ({
  dropdownLabel,
  dropdownPlaceholder,
  dropdownOptions,
  selectedObject,
  setSelectedObject
}: AutocompleteProps) => {
  const selectData = dropdownOptions;
  const styles = useStyles();
  const [value, setValue] = useState('' as any);

  useEffect(() => {
    if (Object.keys(selectedObject).length > 0) {
      setValue(`${selectedObject?.joinSystemName} (${selectedObject?.joinSystemPWSID})`);
    }
  }, []);

  return (
    <Box component="form">
      <MUIAutocomplete
        freeSolo
        fullWidth
        forcePopupIcon
        disableClearable
        blurOnSelect
        autoSelect
        disabled={Object.keys(selectedObject).length > 0}
        id={`${dropdownLabel}-autocomplete`}
        classes={{ paper: styles.selectItem }}
        options={selectData}
        value={value}
        onChange={(event: React.SyntheticEvent, newValue: string | null) => {
          event.preventDefault();
          setValue(newValue);
          setSelectedObject(newValue);
        }}
        renderInput={(params: any) => (
          <TextField
            {...params}
            margin="normal"
            variant="outlined"
            label={dropdownLabel}
            placeholder={dropdownPlaceholder}
            InputLabelProps={{ shrink: true }}
          />
        )}
        renderOption={(props, option) => {
          return <li {...props}>{option}</li>;
        }}
        renderGroup={(params) => params}
      />
    </Box>
  );
};

export default Autocomplete;
