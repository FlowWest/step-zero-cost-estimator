import React, { useState, useEffect, useContext } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import {
  Typography,
  Checkbox,
  RadioGroup,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Theme,
  FormGroup,
  FormControlLabel,
  FormLabel,
  FormControl,
  Radio
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import { partition, filter, findIndex } from 'lodash';
import { WaterSystemContext } from '../../../../contexts/WaterSystem';

const useStyles = makeStyles((theme: Theme) => ({
  accordionContainer: {
    background: theme.palette.background.content
  }
}));

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', hide: true, type: 'number' },
  { field: 'contaminant', headerName: 'Contaminant/Violation', flex: 1 },
  { field: 'treatment', headerName: 'Treatment', flex: 1 }
];

const SelectTreatmentsList = ({
  treatmentOptions,
  setCheckedTreatments
}: {
  treatmentOptions: Array<any>;
  setCheckedTreatments: any;
}) => {
  const styles = useStyles();
  const [groundWaterOptions, setGroundWaterOptions] = useState<Array<any>>([]);
  const [surfaceWaterOptions, setSurfaceWaterOptions] = useState<Array<any>>([]);
  const [currentlySelectedOptions, setCurrentlySelectedOptions] = useState<Array<any>>([]);
  const [state, dispatch] = useContext(WaterSystemContext) as Array<any>;

  useEffect(() => {
    const [groundWaterArray, surfaceWaterArray] = partition(treatmentOptions, {
      category: 'groundWater'
    });

    setGroundWaterOptions(groundWaterArray);
    setSurfaceWaterOptions(surfaceWaterArray);
  }, [treatmentOptions]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const wasChecked = event.target.checked;
    const selectedTreatmentOption = JSON.parse(event.target.value);

    if (selectedTreatmentOption.contaminant === 'Arsenic') {
      setCurrentlySelectedOptions((prevState: Array<any>) => {
        const newState = filter(prevState, function (o) {
          return o.contaminant !== 'Arsenic';
        });
        newState.push(selectedTreatmentOption);
        return newState;
      });
    } else if (wasChecked) {
      setCurrentlySelectedOptions((prevState: Array<any>) => {
        const newState = [...prevState, selectedTreatmentOption];
        return newState;
      });
    } else {
      setCurrentlySelectedOptions((prevState: Array<any>) => {
        const newState = prevState.filter((option) => {
          return option.code !== selectedTreatmentOption.code;
        });
        return newState;
      });
    }
  };

  useEffect(() => {
    setCheckedTreatments(currentlySelectedOptions);
  }, [currentlySelectedOptions]);

  useEffect(() => {
    if (state.selectedTreatments.length) {
      setCurrentlySelectedOptions(state.selectedTreatments);
    }
  }, [state.selectedTreatments]);

  return (
    <div>
      <Accordion classes={{ root: styles.accordionContainer }} defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Ground Water Contaminant Treatment Options</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {filter(groundWaterOptions, function (o) {
              return o.contaminant !== 'Arsenic';
            }).map((option) => {
              return (
                <div>
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={handleChange}
                        checked={findIndex(currentlySelectedOptions, { code: option.code }) >= 0}
                      />
                    }
                    value={JSON.stringify(option)}
                    label={`${option.treatment} (${option.contaminant})`}
                  />
                </div>
              );
            })}
          </FormGroup>
          <FormControl style={{ marginTop: '1rem' }}>
            <FormLabel id="demo-radio-buttons-group-label">
              Arsenic Treatment Options (you may only select one)
            </FormLabel>
            <RadioGroup
              aria-labelledby="aresenic-options-group-label"
              name="radio-buttons-group"
              onChange={handleChange}
            >
              {filter(groundWaterOptions, function (o) {
                return o.contaminant === 'Arsenic';
              }).map((option) => {
                return (
                  <div>
                    <FormControlLabel
                      value={JSON.stringify(option)}
                      control={
                        <Radio
                          checked={findIndex(currentlySelectedOptions, { code: option.code }) >= 0}
                        />
                      }
                      label={`${option.treatment}`}
                    />
                  </div>
                );
              })}
            </RadioGroup>
          </FormControl>
        </AccordionDetails>
      </Accordion>
      <Accordion classes={{ root: styles.accordionContainer }} defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Surface Water Contaminant Treatment Options</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {surfaceWaterOptions.map((option) => {
              return (
                <FormControlLabel
                  value={JSON.stringify(option)}
                  control={
                    <Checkbox
                      onChange={handleChange}
                      checked={findIndex(currentlySelectedOptions, { code: option.code }) >= 0}
                    />
                  }
                  label={option.treatment}
                />
              );
            })}
          </FormGroup>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default SelectTreatmentsList;
