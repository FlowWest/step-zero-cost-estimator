import React from 'react';
import { Box, Modal, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import TransferList from './TransferList';
import ModalAutocomplete from './ModalAutocomplete';

const useStyles = makeStyles((theme: Theme) => ({
  modal: {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '800px',
    padding: '2rem 0',
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

  return (
    <Modal
      open={open}
      onClose={() => handleClose()}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={styles.modal}>
        <ModalAutocomplete />
        <br />
        <TransferList existingComponents={[]} newComponents={[]}/>
      </Box>
    </Modal>
  );
};

export default AddComponentsModal;
