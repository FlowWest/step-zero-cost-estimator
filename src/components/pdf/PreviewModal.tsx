import React, { useState, useEffect } from 'react';
import { CircularProgress, Backdrop, Modal, IconButton, Fab } from '@mui/material';
import { usePDF } from '@react-pdf/renderer';
import PdfRender from './PdfRender';
import CloseIcon from '@mui/icons-material/Close';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  backdrop: {
    zIndex: 1000,
    color: '#fff'
  },
  modalContent: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  actionButtons: {
    marginTop: '10px'
  },
  embedContainer: {
    width: '60vw',
    height: '80vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  closeButton: {
    position: 'relative',
    marginBottom: '5px',
    left: '100%'
  }
}));

const PreviewModal = ({
  state,
  previewIsOpen,
  setPreviewIsOpen
}: {
  state: any;
  previewIsOpen: boolean;
  setPreviewIsOpen: any;
}) => {
  const classes = useStyles();
  const [instance, updateInstance] = usePDF({ document: <PdfRender state={state} /> });

  if (instance?.loading) {
    return (
      <Backdrop className={classes.backdrop} open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  const instanceUrl = (instance?.url || '') as string;

  return (
    <>
      <Modal
        open={previewIsOpen}
        onClose={() => {
          setPreviewIsOpen(false);
        }}
        className={classes.modalContent}
      >
        <div>
          <Fab className={classes.closeButton} size="small" aria-label="exit preview button">
            <IconButton
              aria-label="close"
              onClick={() => {
                setPreviewIsOpen(false);
              }}
            >
              <CloseIcon />
            </IconButton>
          </Fab>
          <br />
          <embed src={instanceUrl} className={classes.embedContainer}></embed>
        </div>
      </Modal>
    </>
  );
};

export default PreviewModal;
