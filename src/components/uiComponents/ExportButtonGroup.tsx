import React, { useState } from 'react';
import { Grid, Button } from '@mui/material';
import PreviewModal from '../exports/pdf/PreviewModal';
import { read, utils, writeFile } from 'xlsx';

const ExportButtonGroup = ({ state }: { state: any }) => {
  const [previewIsOpen, setPreviewconIsOpen] = useState(false as boolean);

  //const [sheetData, setSheetData] = useState(null);

  const handleExcelExport = () => {
    const workbook = utils.book_new();
    const guidelinesPage = utils.json_to_sheet([]);
    const budgetPage = utils.json_to_sheet([state.currentWaterSystem]);
    const cipPage = utils.json_to_sheet([]);
    utils.book_append_sheet(workbook, guidelinesPage, 'GUIDELINES');
    utils.book_append_sheet(workbook, budgetPage, '5-Year Budget');
    utils.book_append_sheet(workbook, cipPage, 'CIP');
    writeFile(workbook, 'sws_budget_calculator.xlsx');

    console.clear(); //Will not work if 'Preserve Log' is enabled on Dev Tools
    console.group('Sheet 1: Guidelines');
    console.log('No Data');
    console.groupEnd();
    console.group('Sheet 2: 5-year Budget');
    console.log(state);
    console.groupEnd();
    console.group('Sheet 3: CIP');
    console.log('No Data');
    console.groupEnd();
    return;
  };

  return (
    <>
      <Grid item xs={12} md={4} lg={2}>
        <Button variant="contained" fullWidth onClick={handleExcelExport}>
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
