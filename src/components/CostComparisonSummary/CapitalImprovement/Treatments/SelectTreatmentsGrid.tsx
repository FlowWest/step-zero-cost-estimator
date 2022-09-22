import React, { useState } from 'react';
import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', hide: true, type: 'number' },
  { field: 'treatment', headerName: 'Treatment', flex: 1 },
  { field: 'contaminant', headerName: 'Contaminant/Violation', flex: 1 }
];

const SelectTreatmentsGrid = ({
  treatmentOptions,
  setSelectedTreatments
}: {
  treatmentOptions: Array<any>;
  setSelectedTreatments: any;
}) => {
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);

  const handleRowSelectionChange = (newSelectionModel: GridSelectionModel) => {
    setSelectionModel(newSelectionModel);

    const selectedTreatments = newSelectionModel.map((rowId: any) => {
      const treatmentIndex = parseInt(rowId) - 1;
      return treatmentOptions[treatmentIndex];
    });

    setSelectedTreatments(selectedTreatments);
  };

  return (
    <div style={{ height: 400 }}>
      <DataGrid
        rows={treatmentOptions}
        getRowId={(row) => row.uid}
        columns={columns}
        checkboxSelection
        hideFooter
        onSelectionModelChange={handleRowSelectionChange}
        selectionModel={selectionModel}
      />
    </div>
  );
};

export default SelectTreatmentsGrid;
