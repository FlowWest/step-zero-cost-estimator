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
import { WaterSystemContext } from '../../../contexts/WaterSystem';
import { updateComponents } from '../../../contexts/WaterSystem/actions';

const useStyles = makeStyles((theme: Theme) => ({
  modal: {
    position: 'absolute' as 'absolute',
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

const AddComponentsModal = ({
  open,
  handleOpen,
  handleClose
}: {
  open: boolean;
  handleOpen: Function;
  handleClose: Function;
}) => {
  const styles = useStyles();
  const [state, dispatch] = useContext(WaterSystemContext);
  const [existingCpnts, setExistingCpnts] = useState(state.existingComponents);
  const [newCpnts, setNewCpnts] = useState(state.newComponents);

  const handleSubmit = () => {
    dispatch(updateComponents(existingCpnts, newCpnts));
    handleClose();
  };

  const handleCloseClick = (event: React.SyntheticEvent, reason: string) => {
    if (reason === 'backdropClick' || reason === 'backdropClick') {
      event.preventDefault();
    } else {
      handleClose();
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleCloseClick}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      disableEscapeKeyDown
    >
      <Box className={styles.modal}>
        <DialogTitle sx={{ m: 0, p: 2 }}>
          <Typography variant="h6">System Components</Typography>
          <IconButton
            aria-label="close"
            onClick={() => handleClose()}
            className={styles.closeIconButton}
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
            className={`${styles.actionButton} ${styles.cancelButton}`}
            variant="contained"
            // color="secondary"
            onClick={() => handleClose()}
          >
            CANCEL
          </Button>
          <Button
            className={styles.actionButton}
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
