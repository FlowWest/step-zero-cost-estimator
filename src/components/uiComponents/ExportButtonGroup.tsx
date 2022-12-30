import React, { useState } from 'react';
import { Grid, Button } from '@mui/material';
import PreviewModal from '../exports/pdf/PreviewModal';
import { handleExcelExport } from '../exports/excel/excelUtility';
import { useStaticQuery, graphql } from 'gatsby';
import { WaterSystemState } from '../../util/interfaces';

const ExportButtonGroup = ({ state }: { state: WaterSystemState }): JSX.Element => {
  const [previewIsOpen, setPreviewIsOpen] = useState(false as boolean);

  const queryResponse = useStaticQuery(
    graphql`
      query {
        allFile(filter: { name: { eq: "export_template" } }) {
          edges {
            node {
              extension
              dir
              modifiedTime
              name
              sourceInstanceName
              publicURL
            }
          }
        }
      }
    `
  );

  const templateFileNode = queryResponse?.allFile?.edges[0]?.node;

  return (
    <>
      <Grid item xs={12} md={4} lg={2}>
        <Button
          variant="contained"
          fullWidth
          onClick={() => handleExcelExport(state, templateFileNode)}
        >
          Export Excel
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
