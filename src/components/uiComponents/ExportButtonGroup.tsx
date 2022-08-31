import React from 'react';
import { Grid, Button } from '@mui/material';
import PDFRender from '../pdf/PDFRender';
import { PDFDownloadLink, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  linkButton: {
    color: 'white'
  }
});

const ExportButtonGroup = ({ state }: { state: any }) => {
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
        <PDFDownloadLink
          document={<PDFRender state={state} />}
          fileName="testingFile123.pdf"
          style={{ textDecoration: 'none' }}
        >
          {({ blob, url, loading, error }) => (
            <Button variant="contained" fullWidth>
              Export PDF
            </Button>
          )}
        </PDFDownloadLink>
      </Grid>
    </>
  );
};

export default ExportButtonGroup;
