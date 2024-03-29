import React, { useContext, useState } from 'react';
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
import TransferList from './TransferList';
import ModalAutocomplete from './ModalAutocomplete';
import { WaterSystemContext } from '../../../../contexts/WaterSystem';
import { updateComponents } from '../../../../contexts/WaterSystem/actions';

const useStyles = makeStyles((theme: Theme) => ({
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '850px',
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
  }
}));

const AddComponentsModal = ({ open, handleClose }: { open: boolean; handleClose: Function }) => {
  const classes = useStyles();
  const [state, dispatch] = useContext(WaterSystemContext) as Array<any>;
  const [existingCpnts, setExistingCpnts] = useState(state?.existingComponents);
  const [newCpnts, setNewCpnts] = useState(state?.newComponents);

  const handleSubmit = () => {
    dispatch(updateComponents(existingCpnts, newCpnts));
    handleClose();
  };

  const handleCloseClick = (event: React.SyntheticEvent | null, reason: string | null = null) => {
    if (reason && reason === 'backdropClick') {
      return;
    }

    if (existingCpnts !== state?.existingComponents || newCpnts !== state?.newComponents) {
      setExistingCpnts([...state?.existingComponents]);
      setNewCpnts([...state?.newComponents]);
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
            System Components
          </Typography>
          <br />
          <Typography variant="subtitle2" align="left" gutterBottom>
            Add water system components to best model the current inventory and future needs of your
            water system to provide safe drinking water.
          </Typography>
          <Typography variant="subtitle2" align="left" gutterBottom>
            If your desired water system component is not in the dropdown list, you may type in the
            name of it, click "+ Add" and the application will prompt you to enter a unit cost and
            average life for your custom component.
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
        <br />
        <ModalAutocomplete
          existingComponents={existingCpnts}
          newComponents={newCpnts}
          setExistingCpnts={setExistingCpnts}
          setNewCpnts={setNewCpnts}
        />
        <br />
        <TransferList
          existingComponents={existingCpnts}
          newComponents={newCpnts}
          setExistingCpnts={setExistingCpnts}
          setNewCpnts={setNewCpnts}
        />
        <br />
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

export default AddComponentsModal;
