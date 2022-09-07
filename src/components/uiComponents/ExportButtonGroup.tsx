import React, { useState } from 'react';
import { Grid, Button } from '@mui/material';
import PreviewModal from '../exports/pdf/PreviewModal';

const ExportButtonGroup = ({ state }: { state: any }) => {
  const [previewIsOpen, setPreviewIsOpen] = useState(false as boolean);

  return (
    <>
      <Grid item xs={12} md={4} lg={2}>
        <Button variant="contained" fullWidth>
          Export Excel
        </Button>
      </Grid>
      <Grid item xs={12} md={4} lg={2}>
        <Button variant="contained" fullWidth>
          Export CSV
        </Button>
      </Grid>
      <Grid item xs={12} md={4} lg={2}>
        <Button
          variant="contained"
          fullWidth
          onClick={() => {
            setPreviewIsOpen(true);
          }}
        >
          Export PDF
        </Button>
      </Grid>
      {previewIsOpen && (
        <PreviewModal
          state={state}
          previewIsOpen={previewIsOpen}
          setPreviewIsOpen={setPreviewIsOpen}
        />
      )}
    </>
  );
};

export default ExportButtonGroup;
