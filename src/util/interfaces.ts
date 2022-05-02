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
  selectedObject: { joinSystemName: string; joinSystemPWSID: string };
  setSelectedObject: any;
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

export interface WaterSystem {
  totalDistanceFeet: string;
  connectionId: string;
  joinClassNew: string;
  joinConnection: string;
  joinCounty: string;
  joinElevation: string;
  joinPipelineCost: string;
  joinSystemName: string;
  joinSystemPWSID: string;
  mergeType: string;
  receivingElevation: string;
  receivingType: string;
  receivingCounty: string;
  receivingSystemName: string;
  receivingSystemPWSID: string;
  routeElevationMax: string;
  routeElevationMean: string;
  routeElevationMin: string;
  routeElevationRange: string;
  routeName: string;
  connectionFee: string;
  adminFee: string;
}
