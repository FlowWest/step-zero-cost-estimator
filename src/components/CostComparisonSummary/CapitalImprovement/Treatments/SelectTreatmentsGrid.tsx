import React, { useState } from 'react';
import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', hide: true, type: 'number' },
  { field: 'treatment', headerName: 'Treatment', flex: 1 },
  { field: 'contaminant', headerName: 'Contaminant/Violation', flex: 1 }
];

export const treatmentOptions = [
  {
    id: 1,
    code: 'GAC',
    treatment: 'Granular Activated Carbon',
    contaminant: 'Organic Contaminants, Total Organic Carbon'
  },
  { id: 2, code: 'AX', treatment: 'Anion Exchange', contaminant: 'Nitrate' },
  { id: 3, code: 'CX', treatment: 'Cation Exchange', contaminant: 'Radium' },
  {
    id: 4,
    code: 'IX',
    treatment: 'Ion Exchange',
    contaminant: ' Uranium, Gross Alpha as a result of Uranium, and Perchlorate'
  },
  { id: 5, code: 'AD', treatment: 'Adsorption', contaminant: 'Arsenic' },
  { id: 6, code: 'CF', treatment: 'Coagulation Filtration', contaminant: 'Arsenic' },
  { id: 7, code: 'F', treatment: 'Filtration', contaminant: 'Iron and Manganese' },
  { id: 8, code: 'AA', treatment: 'Activated Alumina', contaminant: 'Fluoride' },
  {
    id: 9,
    code: 'SWPP',
    treatment: 'Surface Water Package Plant',
    contaminant: null
  },
  { id: 10, code: '4LVI', treatment: '4-Log Virus Inactivation', contaminant: null }
] as Array<any>;

const SelectTreatmentsGrid = ({ setSelectedTreatments }: { setSelectedTreatments: any }) => {
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
