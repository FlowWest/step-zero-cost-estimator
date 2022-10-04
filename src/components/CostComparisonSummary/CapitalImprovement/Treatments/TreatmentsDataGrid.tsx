import React from 'react';
import {
  DataGrid,
  GridColDef,
  GridFooterContainer,
  gridStringOrNumberComparator,
  gridNumberComparator,
  GridSortCellParams
} from '@mui/x-data-grid';
import { Theme, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  nonEditableCell: {
    background: `${theme.palette.background.default} !important`,
    color: 'black',
    pointerEvents: 'none'
  },
  cellEditing: {
    backgroundColor: '#fff !important'
  },
  cellInput: {
    color: 'black'
  },
  addItemButtonWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginBlock: '5px',
    zIndex: 1000
  },
  root: {
    '& .MuiDataGrid-columnHeaderTitle': {
      textOverflow: 'clip',
      whiteSpace: 'break-spaces',
      lineHeight: 1,
      textAlign: 'right'
    },
    '& .MuiDataGrid-row.Mui-even:not(:hover)': {
      backgroundColor:
        theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.04)'
    }
  },
  summaryRow: {
    background: `${theme.palette.background.default} !important`,
    color: 'black',
    pointerEvents: 'none',
    borderTop: '1px solid black'
  },
  footer: { width: '100%', textAlign: 'right', marginRight: 10 }
}));

const formatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

const sortComparator = (
  v1: any,
  v2: any,
  params1: GridSortCellParams<any>,
  params2: GridSortCellParams<any>
) => {
  const row1 = params1.api.getRow(params1.id);
  const row2 = params2.api.getRow(params2.id);
  const sortModel = params1.api.getSortModel();
  const { sort } = sortModel[0];

  // sort total row at bottom
  if (row1.component === 'Total') {
    return sort === 'asc' ? 1 : -1;
  }
  if (row2.component === 'Total') {
    return sort === 'asc' ? -1 : 1;
  }

  if (typeof v1 === 'string' || v1 === undefined || v1 === null) {
    return gridStringOrNumberComparator(v1, v2, params1, params2);
  }

  if (typeof v1 === 'number' || v1 === undefined || v1 === null) {
    return gridNumberComparator(v1, v2, params1, params2);
  }

  return v1 - v2;
};

const TreatmentsDataGrid = ({
  rows,
  openAddTreatments
}: {
  rows: Array<any>;
  openAddTreatments: Function;
}) => {
  console.log('rows', rows);
  const classes = useStyles();
  const columns: GridColDef[] = [
    {
      field: 'contaminant',
      headerName: 'Contaminant',
      editable: true,
      flex: 1,
      headerAlign: 'right',
      sortComparator: sortComparator,
      valueGetter: (params) => {
        if (params.getValue(params.id, 'component') === 'Total') {
          return 'Total';
        }
        return params.value;
      }
    },
    {
      field: 'treatment',
      headerName: 'Treatment',
      editable: true,
      flex: 1,
      headerAlign: 'right',
      sortComparator: sortComparator
    },
    {
      field: 'capitalCost',
      headerName: 'Capital Cost',
      editable: true,
      flex: 1.5,
      type: 'number',
      headerAlign: 'right',
      sortComparator: sortComparator,
      valueGetter: (params) => {
        if (params.getValue(params.id, 'component') === 'Total') {
          const allRowIds = params.api.getAllRowIds();
          const treatmentRows = allRowIds.slice(0, allRowIds.length - 1);

          const total = treatmentRows.reduce((currentTotal: number, rowId: number) => {
            return (currentTotal += params.getValue(rowId, 'capitalCost') || 0);
          }, 0);
          return total;
        }

        return params.value;
      },
      valueFormatter: (params) => {
        if (params.value) {
          return `$${formatter.format(params.value)}`;
        }
      }
    },
    {
      field: 'operationalCost',
      headerName: 'Operational Cost',
      editable: true,
      flex: 1.5,
      type: 'number',
      headerAlign: 'right',
      sortComparator: sortComparator,
      valueGetter: (params) => {
        if (params.getValue(params.id, 'component') === 'Total') {
          const allRowIds = params.api.getAllRowIds();
          const treatmentRows = allRowIds.slice(0, allRowIds.length - 1);

          const total = treatmentRows.reduce((currentTotal: number, rowId: number) => {
            return (currentTotal += params.getValue(rowId, 'operationalCost') || 0);
          }, 0);
          return total;
        }

        return params.value;
      },
      valueFormatter: (params) => {
        if (params.value) {
          return `$${formatter.format(params.value)}`;
        }
      }
    }
  ];

  const renderNoRowsOverlay = () => {
    return (
      <div
        style={{ position: 'relative', zIndex: 1, height: '100%' }}
        className={classes.addItemButtonWrapper}
      >
        <Button
          onClick={() => {
            openAddTreatments();
          }}
        >
          Add Treatments
        </Button>
      </div>
    );
  };

  const renderFooter = () => {
    return rows.length > 0 ? (
      <GridFooterContainer>
        <div className={classes.footer}>{rows.length} Rows</div>
      </GridFooterContainer>
    ) : null;
  };

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <div style={{ flexGrow: 1 }}>
        <DataGrid
          autoHeight
          rows={
            rows.length > 0
              ? [
                  ...rows,
                  {
                    uid: Math.random(),
                    component: 'Total'
                  }
                ]
              : []
          }
          columns={columns}
          getRowId={(row) => row.uid}
          classes={{
            root: classes.root,
            'cell--editing': classes.cellEditing,
            editInputCell: classes.cellInput
          }}
          getRowClassName={(params) => {
            if (params.isLastVisible) {
              return classes.summaryRow;
            }
            return '';
          }}
          components={{
            NoRowsOverlay: renderNoRowsOverlay,
            Footer: renderFooter
          }}
          disableSelectionOnClick
        />
      </div>
    </div>
  );
};

export default TreatmentsDataGrid;
