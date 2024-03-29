export interface AutocompleteProps {
  dropdownLabel: string;
  dropdownPlaceholder: string;
  dropdownOptions: Array<Record<string, unknown>>;
  selectedObject: { joinSystemName: string; joinSystemPWSID: string };
  setSelectedObject: any;
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
export interface ConsolidationCostParams {
  connections: number;
  feeCostPerConnection: number;
  distance: number;
  pipelineCosts: number;
  adminLegalCEQACosts: number;
  contingency: number;
}
export interface DropdownProps {
  dropdownLabel: string;
  dropdownPlaceholder: string;
  dropdownOptions: Array<Record<string, unknown>>;
  setSelectedObject: any;
}

export interface ResourceObject {
  fileName?: string;
  logo?: string;
  description: string;
  title: string;
  link: string;
  category: string;
}

export interface SystemComponent {
  annualReserve: number;
  avgLife: number;
  component: string;
  monthlyReserve: number;
  requiresMeasurement: boolean;
  uid: number;
  unitCost: number;
}

export interface TransformedSystemComponent {
  annualReserve: number;
  avgLife: number;
  component: string;
  monthlyReserve: number;
  quantity: number;
  uid: number;
  unitCost: number;
}

export interface Treatment {
  capitalCost: number;
  category: string;
  code: string;
  contaminant: string;
  operationalCost: number;
  treatment: string;
  uid: number;
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

export interface WaterSystemAction {
  type: string;
  payload: any;
}
export interface WaterSystemState {
  currentWaterSystem: WaterSystem | Record<string, unknown>;
  consolidationCostParams: ConsolidationCostParams;
  existingComponents: ComponentProperties[];
  newComponents: ComponentProperties[];
  autocompleteOptions: ComponentProperties[];
  cipCostData: {
    new: Record<string, unknown>;
    existing: Record<string, unknown>;
  };
  systemComponents: Array<SystemComponent>;
  selectedTreatments: Array<Treatment>;
}
