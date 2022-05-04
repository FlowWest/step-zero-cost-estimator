import React, { useContext, useState } from 'react';
import { Box, Button, Modal, Theme } from '@mui/material';
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
    padding: '2rem',
    background: theme.palette.background.default,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
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
    dispatch(
      updateComponents(existingCpnts, newCpnts)
    );
  };

  return (
    <Modal
      open={open}
      onClose={() => handleClose()}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={styles.modal}>
        <ModalAutocomplete  existingComponents={existingCpnts} setExistingCpnts={setExistingCpnts} />
        <br />
        <TransferList
          existingComponents={existingCpnts} 
          newComponents={newCpnts} 
          setExistingCpnts={setExistingCpnts} 
          setNewCpnts={setNewCpnts}
        />
        <br />
        <Button variant='contained' onClick={() => handleSubmit()}>UPDATE COMPONENTS</Button>
      </Box>
    </Modal>
  );
};

export default AddComponentsModal;
