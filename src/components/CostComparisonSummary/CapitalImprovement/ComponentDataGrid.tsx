import React, { useContext, useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridOverlay } from '@mui/x-data-grid';
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
  }
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
  const styles = useStyles();
  const [pageSize, setPageSize] = useState(5 as number);
  const columns: GridColDef[] = [
    {
      field: 'quantity',
      headerName: 'Quantity',
      editable: true,
      flex: 1,
      type: 'number',
      headerAlign: 'right',
      valueGetter: (params) => {
        return params.value || 1;
      }
    },
    { field: 'component', headerName: 'Component', flex: 3, cellClassName: styles.nonEditableCell },
    {
      field: 'unitCost',
      headerName: 'Unit Cost',
      editable: true,
      flex: 1.5,
      type: 'number',
      headerAlign: 'right',
      valueFormatter: (params) => {
        return `$${formatter.format(params.value)}`;
      }
    },
    {
      field: 'installedCost',
      headerName: 'Installed Cost',
      flex: 1.5,
      type: 'number',
      headerAlign: 'right',
      cellClassName: styles.nonEditableCell,
      valueGetter: (params) => {
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
      cellClassName: styles.nonEditableCell,
      valueGetter: (params) => {
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
      cellClassName: styles.nonEditableCell,
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
      cellClassName: styles.nonEditableCell,
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
      // <GridOverlay>
      <div
        className={styles.addItemButtonWrapper}
        style={{ position: 'relative', zIndex: 1, height: '100%' }}
      >
        <Button
          onClick={() => {
            openAddComponents();
          }}
        >
          Add Components
        </Button>
      </div>
      // </GridOverlay>
    );
  };

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <div style={{ flexGrow: 1 }}>
        <DataGrid
          autoHeight
          rows={rows}
          columns={columns}
          getRowId={(row) => row.uid}
          classes={{
            root: styles.root,
            'cell--editing': styles.cellEditing,
            editInputCell: styles.cellInput
          }}
          onCellEditCommit={(cell: any) => {
            console.log('cell', cell);
            setTotalCostValues((prevState: Array<any>) => {
              const { id, row, field, value } = cell;
              const installedCost = cell.getValue(id, 'installedCost');
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
            NoRowsOverlay: renderNoRowsOverlay
          }}
          pageSize={pageSize}
          rowsPerPageOptions={[5, 10, 20]}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          disableSelectionOnClick
        />
      </div>
    </div>
  );
};

export default ComponentDataGrid;
