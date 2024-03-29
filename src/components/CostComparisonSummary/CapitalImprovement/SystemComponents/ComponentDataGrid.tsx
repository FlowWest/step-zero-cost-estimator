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
  footer: { width: '100%', textAlign: 'right', marginRight: 10 },
  infoIcon: {
    padding: '.4rem',
    marginLeft: '.5rem',
    transform: 'translateY(-.1rem)'
  }
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

  if (typeof v1 === 'string') {
    return gridStringOrNumberComparator(v1, v2, params1, params2);
  }

  if (typeof v1 === 'number') {
    return gridNumberComparator(v1, v2, params1, params2);
  }

  return v1 - v2;
};

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
      sortComparator: sortComparator,
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
      cellClassName: classes.nonEditableCell,
      sortComparator: sortComparator
    },
    {
      field: 'measurement',
      headerName: 'Measurement',
      description:
        'The measurement value is the amount of material that makes up 1 unit. (ex: For a Storage Tank, the measurement value could be 200,000 to represent the gallon size of a tank. Or for a Drilled Well, the measurement value would be for the depth of the well in feet',
      editable: true,
      flex: 1.5,
      type: 'number',
      headerAlign: 'right',
      sortComparator: sortComparator,
      cellClassName: (params) => {
        if (!params.row.requiresMeasurement) {
          return classes.nonEditableCell;
        }
        return '';
      }
    },
    {
      field: 'measurementUnit',
      headerName: 'Unit',
      editable: false,
      flex: 1.5,
      type: 'number',
      headerAlign: 'right',
      sortComparator: sortComparator,
      cellClassName: classes.nonEditableCell
    },
    {
      field: 'unitCost',
      headerName: 'Unit Cost',
      editable: true,
      flex: 1.5,
      type: 'number',
      headerAlign: 'right',
      sortComparator: sortComparator,
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
      sortComparator: sortComparator,
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
        const measurement = getValue(id, 'measurement') || 1;
        const installedCost = quantity * row.unitCost * measurement;

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
      headerAlign: 'right',
      sortComparator: sortComparator
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
      },
      sortComparator: sortComparator
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
      },
      sortComparator: sortComparator
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
      },
      sortComparator: sortComparator
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
          isCellEditable={(params) => {
            return params.field === 'measurement' ? params?.row?.requiresMeasurement : true;
          }}
        />
      </div>
    </div>
  );
};

export default ComponentDataGrid;
