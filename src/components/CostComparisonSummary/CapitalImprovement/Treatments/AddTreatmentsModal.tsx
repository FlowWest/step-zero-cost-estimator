import React, { useContext, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Modal,
  Theme,
  Stack,
  DialogTitle,
  IconButton,
  Typography,
  Divider
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import { WaterSystemContext } from '../../../../contexts/WaterSystem';
import SelectTreatmentsList from './SelectTreatmentsList';
import { getTreatmentOptionsValues } from '../../../../util/costUtil';
import { updateSelectedTreatments } from '../../../../contexts/WaterSystem/actions';

const useStyles = makeStyles((theme: Theme) => ({
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '950px',
    padding: '0 2rem 2rem 2rem',
    background: theme.palette.background.default,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  actionButton: {
    width: '15rem'
  },
  cancelButton: {
    backgroundColor: theme.palette.cancel.main,
    color: '#000',
    '&:hover': {
      backgroundColor: theme.palette.cancel.dark
    }
  },
  closeIconButton: {
    position: 'absolute',
    right: 8,
    top: 8
  },
  treatmentGridContainer: {
    width: '100%',
    margin: '1rem 0'
  }
}));

const AddTreatmentsModal = ({ open, handleClose }: { open: boolean; handleClose: Function }) => {
  const classes = useStyles();
  const [state, dispatch] = useContext(WaterSystemContext) as Array<any>;
  const [treatmentOptions, setTreatmentOptions] = useState([] as Array<any>);
  const [checkedTreatments, setCheckedTreatments] = useState([] as Array<any>);

  useEffect(() => {
    const treatmentOptionsValues = getTreatmentOptionsValues({
      waterSystemDetails: state.currentWaterSystem,
      consolidationCostParams: state.consolidationCostParams
    });
    setTreatmentOptions(treatmentOptionsValues);
  }, [state]);

  const handleSubmit = () => {
    dispatch(updateSelectedTreatments(checkedTreatments));
    handleClose();
  };

  const handleCloseClick = (event: React.SyntheticEvent | null, reason: string | null = null) => {
    if (reason && reason === 'backdropClick') {
      return;
    }

    handleClose();
  };

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      disableEscapeKeyDown
    >
      <Box className={classes.modal}>
        <DialogTitle sx={{ m: 0, p: 2 }}>
          <Typography variant="h6" align="center">
            Treatment Options
          </Typography>
          <br />
          <Typography variant="subtitle2" align="left" gutterBottom>
            {
              'Add the neccessary treatment option(s) for the water system to stay in compliance with SAFER regulations'
            }
          </Typography>
          <IconButton
            aria-label="close"
            onClick={() => handleCloseClick(null)}
            className={classes.closeIconButton}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <Divider style={{ width: '100%' }} />
        <Box className={classes.treatmentGridContainer}>
          <SelectTreatmentsList
            treatmentOptions={treatmentOptions}
            setCheckedTreatments={setCheckedTreatments}
          />
        </Box>
        <Stack direction="row" spacing={2}>
          <Button
            className={`${classes.actionButton} ${classes.cancelButton}`}
            variant="contained"
            onClick={() => handleCloseClick(null)}
          >
            CANCEL
          </Button>
          <Button
            className={classes.actionButton}
            variant="contained"
            onClick={() => handleSubmit()}
          >
            UPDATE COMPONENTS
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default AddTreatmentsModal;
