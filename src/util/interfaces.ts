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
  name?: string | null;
  id?: number;
  connections?: number;
  distance?: number;
}

export interface ConsolidationCostParams {
  pipelineCosts: number;
  connectionCosts: number;
  adminLegalCosts: number;
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

export interface ConsolidationCostDetails {
  materialCosts: {
    total: number;
    totalPipelineCosts: number;
    totalServiceFee: number;
    totalConnectionCosts: number;
  };
  adminFees: {
    total: number;
    adminLegalCosts: number;
  };
  financialAssistance: {};
  adjustments: {
    total: number;
    totalContingency: number;
  };
  total: number;
  costPerConnection: number;
}
