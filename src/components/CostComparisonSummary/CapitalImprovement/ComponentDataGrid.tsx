import React from 'react';
import { DataGrid, GridColDef, GridFooterContainer } from '@mui/x-data-grid';
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

const ComponentDataGrid = ({
  rows,
  openAddComponents,
  connections,
  setTotalCostValues
}: {
  rows: Array<any>;
  openAddComponents: Function;
  connections: number;
  setTotalCostValues: Function;
}) => {
  const classes = useStyles();
  const columns: GridColDef[] = [
    {
      field: 'quantity',
      headerName: 'Quantity',
      editable: true,
      flex: 1,
      type: 'number',
      headerAlign: 'right',
      valueGetter: (params) => {
        if (params.getValue(params.id, 'component') === 'Total') {
          return null;
        }
        return params.value || 1;
      }
    },
    {
      field: 'component',
      headerName: 'Component',
      flex: 3,
      cellClassName: classes.nonEditableCell
    },
    {
      field: 'unitCost',
      headerName: 'Unit Cost',
      editable: true,
      flex: 1.5,
      type: 'number',
      headerAlign: 'right',
      valueGetter: (params) => {
        if (params.getValue(params.id, 'component') === 'Total') {
          return null;
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
      field: 'installedCost',
      headerName: 'Installed Cost',
      flex: 1.5,
      type: 'number',
      headerAlign: 'right',
      cellClassName: classes.nonEditableCell,
      valueGetter: (params) => {
        if (params.getValue(params.id, 'component') === 'Total') {
          const allRowIds = params.api.getAllRowIds();
          const componentRows = allRowIds.slice(0, allRowIds.length - 1);
          const total = componentRows.reduce((currentTotal: number, rowId: number) => {
            return (currentTotal += params.getValue(rowId, 'installedCost'));
          }, 0);
          return total;
        }

        const { id, getValue, row } = params;
        const quantity = getValue(id, 'quantity');
        const installedCost = quantity * row.unitCost;

        return installedCost;
      },
      valueFormatter: (params) => {
        return `$${formatter.format(params.value)}`;
      }
    },
    {
      field: 'avgLife',
      headerName: 'Average Life (Years)',
      editable: true,
      flex: 1.5,
      type: 'number',
      headerAlign: 'right'
    },
    {
      field: 'annualReserve',
      headerName: 'Annual Reserve',
      flex: 1.5,
      type: 'number',
      headerAlign: 'right',
      cellClassName: classes.nonEditableCell,
      valueGetter: (params) => {
        if (params.getValue(params.id, 'component') === 'Total') {
          const allRowIds = params.api.getAllRowIds();
          const componentRows = allRowIds.slice(0, allRowIds.length - 1);
          const total = componentRows.reduce((currentTotal: number, rowId: number) => {
            return (currentTotal += params.getValue(rowId, 'annualReserve'));
          }, 0);
          return total;
        }
        const installedCost = params.getValue(params.id, 'installedCost');
        return installedCost / params.row.avgLife;
      },
      valueFormatter: (params) => {
        return `$${formatter.format(params.value)}`;
      }
    },
    {
      field: 'monthlyReserve',
      headerName: 'Monthly Reserve',
      flex: 1.5,
      type: 'number',
      headerAlign: 'right',
      cellClassName: classes.nonEditableCell,
      valueGetter: (params) => {
        const annualReserve = params.getValue(params.id, 'annualReserve');
        return annualReserve / 12;
      },
      valueFormatter: (params) => {
        return `$${formatter.format(params.value)}`;
      }
    },
    {
      field: 'monthlyReservePerCustomer',
      headerName: 'Monthly Reserve Per Customer',
      // width: 225,
      flex: 1.5,
      type: 'number',
      headerAlign: 'right',
      cellClassName: classes.nonEditableCell,
      valueGetter: (params) => {
        const monthlyReserve = params.getValue(params.id, 'monthlyReserve');
        return monthlyReserve / connections;
      },
      valueFormatter: (params) => {
        return `$${formatter.format(params.value)}`;
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
            openAddComponents();
          }}
        >
          Add Components
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
          onCellEditCommit={(cell: any) => {
            setTotalCostValues((prevState: Array<any>) => {
              const { id, field, value } = cell;
              const newState = prevState.map((row) => {
                if (row.uid === id) {
                  row[field] = value;
                }
                return row;
              });
              return newState;
            });
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

export default ComponentDataGrid;
