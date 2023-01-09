import React, { useState, useEffect, useContext } from 'react';
import { DataGrid, GridColDef, GridOverlay } from '@mui/x-data-grid';
import { Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { WaterSystemContext } from '../../../../contexts/WaterSystem';
import { updateCIPCostData } from '../../../../contexts/WaterSystem/actions';

const useStyles = makeStyles((theme: Theme) => ({
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
  hideRightSeparator: {
    '& > .MuiDataGrid-columnSeparator': {
      visibility: 'hidden'
    }
  }
}));

const formatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

const TotalCIPDataGrid = ({
  totalCostValues,
  connections
}: {
  totalCostValues: Array<any>;
  connections: number;
}) => {
  const [state, dispatch] = useContext(WaterSystemContext) as Array<any>;
  const [totalInstalledCost, setTotalInstalledCost] = useState({
    installedCost: 0,
    annualReserve: 0
  });
  const classes = useStyles();
  const columns: GridColDef[] = [
    {
      field: 'quantity',
      headerName: '',
      editable: false,
      flex: 1,
      type: 'number',
      headerAlign: 'right',
      headerClassName: classes.hideRightSeparator
    },
    {
      field: 'component',
      headerName: '',
      flex: 3,
      headerClassName: classes.hideRightSeparator
    },
    {
      field: 'measurement',
      headerName: '',
      flex: 1.5,
      headerClassName: classes.hideRightSeparator
    },
    {
      field: 'measurementUnit',
      headerName: '',
      flex: 1.5,
      headerClassName: classes.hideRightSeparator
    },
    {
      field: 'unitCost',
      headerName: '',
      editable: false,
      flex: 1.5,
      type: 'number',
      headerAlign: 'right',
      headerClassName: classes.hideRightSeparator
    },
    {
      field: 'installedCost',
      headerName: 'Installed Cost',
      flex: 1.5,
      type: 'number',
      headerAlign: 'right',
      valueFormatter: (params) => {
        return `$${formatter.format(params.value)}`;
      }
    },
    {
      field: 'avgLife',
      headerName: '',
      editable: false,
      flex: 1.5,
      type: 'number',
      headerAlign: 'right',
      headerClassName: classes.hideRightSeparator
    },
    {
      field: 'annualReserve',
      headerName: 'Annual Reserve',
      flex: 1.5,
      type: 'number',
      headerAlign: 'right',
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
      valueGetter: (params) => {
        const monthlyReserve = params.getValue(params.id, 'monthlyReserve');
        return monthlyReserve / connections;
      },
      valueFormatter: (params) => {
        return `$${formatter.format(params.value)}`;
      }
    }
  ];

  useEffect(() => {
    const updatedCostValues = totalCostValues.reduce(
      (previousValue, currentValue) => {
        const newValue = { ...previousValue };
        const quantity = currentValue.quantity || 1;
        const measurement = currentValue.measurement || 1;
        const installedCost = quantity * currentValue.unitCost * measurement;
        newValue.installedCost += installedCost;
        newValue.annualReserve += installedCost / currentValue.avgLife;

        return newValue;
      },
      {
        installedCost: 0,
        annualReserve: 0
      }
    );
    dispatch(updateCIPCostData('total', updatedCostValues.installedCost));
    setTotalInstalledCost(updatedCostValues);
  }, [totalCostValues]);

  const renderNoRowsOverlay = () => {
    return (
      <GridOverlay>
        <Typography>
          New and/or Existing components required to perform Total CIP Cost calculations
        </Typography>
      </GridOverlay>
    );
  };

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <div style={{ flexGrow: 1 }}>
        <DataGrid
          autoHeight
          rows={
            totalCostValues.length > 0
              ? [
                  {
                    id: 0,
                    ...totalInstalledCost
                  }
                ]
              : []
          }
          columns={columns}
          getRowId={(row) => row.id}
          components={{
            NoRowsOverlay: renderNoRowsOverlay
          }}
          hideFooter
          hideFooterPagination
          classes={{
            root: classes.root
          }}
        />
      </div>
    </div>
  );
};

export default TotalCIPDataGrid;
