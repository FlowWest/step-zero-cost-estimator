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
  connections: number;
  feeCostPerConnection: number;
  distance: number;
  pipelineCosts: number;
  adminLegalCEQACosts: number;
  contingency: number;
}

export interface WaterSystemAction {
  type: string;
  payload: any;
}

export interface WaterSystemState {
  currentWaterSystem: WaterSystem | {};
  consolidationCostParams: ConsolidationCostParams;
  existingComponents: ComponentProperties[];
  newComponents: ComponentProperties[];
  autocompleteOptions: ComponentProperties[];
  cipCostData: {
    new: Object;
    existing: Object;
  };
  systemComponents: Array<any>;
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
    adminLegalCEQACosts: number;
  };
  adjustments: {
    total: number;
    totalContingencyCost: number;
    elevationAdjustmentCost: number;
    regionalAdjustmentCost: number;
    inflationAdjustmentCost: number;
    planningAndConstructionAdjustmentCost: number;
  };
  total: number;
  totalCostPerConnection: number;
}

export interface WaterSystem {
  distanceFt: string;
  joinClassNew: string;
  joinConnections: string;
  joinCounty: string;
  joinElevation: string;
  joinPopulation: string;
  joinSystemName: string;
  joinSystemPWSID: string;
  mergeType: string;
  receivingCounty: string;
  receivingElevation: string;
  receivingSystemName: string;
  receivingSystemPassword: string;
  receivingType: string;
  routeElevationMax: string;
  routeElevationMean: string;
  routeElevationMin: string;
  routeElevationRange: string;
  routeName: string;
}

export interface ComponentProperties {
  uid: string | null;
  qty: number;
  component: string;
  unitCost: number;
  installedCost: number | null;
  avgLife: number;
  annualReserve: number | null;
  monthlyReserve: number | null;
  monthlyReservePerCustomer: number | null;
}
