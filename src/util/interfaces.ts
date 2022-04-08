export interface DropdownProps {
  dropdownLabel: string;
  dropdownPlaceholder: string;
  dropdownOptions: Array<Object>;
  setSelectedObject: any;
}

export interface AutocompleteProps {
  dropdownLabel: string;
  dropdownPlaceholder: string;
  dropdownOptions: Array<Object>;
  selectedObject: Object;
  setSelectedObject: any;
}

export interface WaterSystem {
  name: string | null;
  id?: number;
  connections?: number;
}

export interface ConsolidationCostParams {
  connections: number;
  pipelineCost: number;
  connectionCost: number;
  adminLegalCost: number;
  contingency: number;
}

export interface WaterSystemAction {
  type: string;
  payload: any;
}

export interface WaterSystemState {
  currentWaterSystem: WaterSystem;
  consolidationCostParams: ConsolidationCostParams;
}
