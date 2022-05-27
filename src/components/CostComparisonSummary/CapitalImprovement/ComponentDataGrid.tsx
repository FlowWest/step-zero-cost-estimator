import React, { useContext, useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridOverlay } from '@mui/x-data-grid';
import { Theme, Button } from '@mui/material';
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
  },
  addItemButtonWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginBlock: '5px',
    zIndex: 1000
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
  getNewGridState
}: {
  rows: Array<any>;
  openAddComponents: Function;
  connections: number;
  getNewGridState: Function;
}) => {
  const styles = useStyles();
  const [test, setTest] = useState({} as any);
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
        // getTest(params);
        return monthlyReserve / connections;
      },
      valueFormatter: (params) => {
        return `$${formatter.format(params.value)}`;
      }
    }
  ];

  //   const getTest = (params: any) => {
  //     setTest((prevState: any) => {return  {
  //       ...prevState,
  //       [params.id]: {

  //         installedCost: params.getValue(params.id, 'installedCost'),
  //         annualReserve: params.getValue(params.id, 'annualReserve')
  //       }
  //     }})
  //   );
  // };

  useEffect(() => {
    console.log('test');
  }, [test]);

  const renderNoRowsOverlay = () => {
    return (
      <GridOverlay>
        <div className={styles.addItemButtonWrapper}>
          <Button
            onClick={() => {
              openAddComponents();
            }}
          >
            Add Components
          </Button>
        </div>
      </GridOverlay>
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
          // onCellEditCommit={(cell: any) => {
          //   setGridState((prevState: any) => {
          //     const test = {
          //       ...prevState,
          //       [cell.id]: {
          //         installedCost: cell.getValue(cell.id, 'installedCost'),
          //         annualReserve: cell.getValue(cell.id, 'annualReserve')
          //       }
          //     };
          //     return test;
          //   });
          // }}
          components={{
            NoRowsOverlay: renderNoRowsOverlay
          }}
          classes={{
            'cell--editing': styles.cellEditing,
            editInputCell: styles.cellInput
          }}
          hideFooterPagination
        />
      </div>
    </div>
  );
};

export default ComponentDataGrid;
