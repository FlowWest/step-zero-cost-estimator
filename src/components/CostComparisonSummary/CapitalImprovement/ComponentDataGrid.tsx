import React, { useContext } from 'react';
import { WaterSystemContext } from '../../../contexts/WaterSystem';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  editableCell: {
    background: '#fed330',
    color: 'black'
  },
  cellEditing: {
    backgroundColor: '#fed330 !important'
  },
  cellInput: {
    color: 'black'
  }
}));

const formatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

const ComponentDataGrid = ({ rows }: { rows: Array<any> }) => {
  const [state, dispatch] = useContext(WaterSystemContext);
  const styles = useStyles();
  console.log('state', state);
  const columns: GridColDef[] = [
    {
      field: 'quantity',
      headerName: 'Quantity',
      editable: true,
      flex: 1,
      type: 'number',
      valueGetter: (params) => {
        return params.value || 1;
      },
      cellClassName: styles.editableCell
    },
    { field: 'component', headerName: 'Component', flex: 3 },
    {
      field: 'unitCost',
      headerName: 'Unit Cost',
      editable: true,
      flex: 1.5,
      type: 'number',
      valueFormatter: (params) => {
        return `$${formatter.format(params.value)}`;
      },
      cellClassName: styles.editableCell
    },
    {
      field: 'installedCost',
      headerName: 'Installed Cost',
      flex: 1.5,
      type: 'number',
      valueGetter: (params) => {
        const quantity = params.getValue(params.id, 'quantity');
        return quantity * params.row.unitCost;
      },
      valueFormatter: (params) => {
        return `$${formatter.format(params.value)}`;
      }
    },
    {
      field: 'avgLife',
      headerName: 'Avg Life (Years)',
      editable: true,
      flex: 1.5,
      type: 'number',
      cellClassName: styles.editableCell
    },
    {
      field: 'annualReserve',
      headerName: 'Annual Reserve',
      flex: 1.5,
      type: 'number',
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
      width: 225,
      type: 'number',
      valueGetter: (params) => {
        const monthlyReserve = params.getValue(params.id, 'monthlyReserve');
        const numConnections = parseInt(state.consolidationCostParams.connections);
        return monthlyReserve / numConnections;
      },
      valueFormatter: (params) => {
        return `$${formatter.format(params.value)}`;
      }
    }
  ];
  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <div style={{ flexGrow: 1 }}>
        <DataGrid
          autoHeight
          rows={rows}
          columns={columns}
          getRowId={(row) => row.uid}
          classes={{
            'cell--editing': styles.cellEditing,
            editInputCell: styles.cellInput
          }}
          // sx={{
          //   '& .MuiDataGrid-root .MuiDataGrid-cell.MuiDataGrid-cell--editing': styles.cellEditing
          // }}
        />
      </div>
    </div>
  );
};

export default ComponentDataGrid;
