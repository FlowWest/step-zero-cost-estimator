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
    padding: '3rem 0',
    background: theme.palette.background.default,
    border: `.2rem solid ${theme.palette.primary.main}`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
    // boxShadow: 24,
    // p: 4
  },
  autocomplete: {
    background: theme.palette.background.default
  },
  transferList: {
    background: theme.palette.background.default
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
        <TransferList existingComponents={[]} newComponents={[]} styles={styles}/>
      </Box>
    </Modal>
  );
};

export default AddComponentsModal;
