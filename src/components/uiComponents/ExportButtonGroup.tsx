import React, { useState } from 'react';
import { Grid, Button } from '@mui/material';
import PreviewModal from '../exports/pdf/PreviewModal';
import { handleExcelExport } from '../exports/excel/excelUtil';

const ExportButtonGroup = ({ state }: { state: any }) => {
  console.log('🚀 ~ ExportButtonGroup ~ state', state);
  const [previewIsOpen, setPreviewIsOpen] = useState(false as boolean);

  //const [sheetData, setSheetData] = useState(null);

  return (
    <>
      <Grid item xs={12} md={4} lg={2}>
        <Button variant="contained" fullWidth onClick={() => handleExcelExport(state)}>
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
