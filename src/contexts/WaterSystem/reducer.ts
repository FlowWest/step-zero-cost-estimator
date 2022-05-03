import { WaterSystem, WaterSystemState, WaterSystemAction } from '../../util/interfaces';

export const ACTIONS = {
  UPDATE_WATER_SYSTEM: 'update_water_system',
  UPDATE_CONSOLIDATION_COST_PARAMS: 'update_consolidation_cost_params',
  UPDATE_WATER_SYSTEM_AND_PARAMS: 'update_water_system_and_params'
};

export const initialState = {
  currentWaterSystem: {},
  consolidationCostParams: {
    connections: '100',
    pipelineCosts: '155',
    connectionCosts: '6600',
    adminLegalCosts: '285000',
    contingency: '20',
    distance: '1000'
  },
  existingComponents: [
    {
      qty: 5,
      component: "big hammer",
      unitCost: 3242,
      installedCost: 3500,
      avgLife: 7,
      annualReserve: 237.9,
      monthlyReserve: 2323,
      monthlyReservePerCustomer: 23.23
    },
  ],
  newComponents: [
    {
      qty: 5,
      component: "bigger hammer",
      unitCost: 3242,
      installedCost: 3500,
      avgLife: 7,
      annualReserve: 237.9,
      monthlyReserve: 2323,
      monthlyReservePerCustomer: 23.23
    },
    {
      qty: 5,
      component: "biggest hammer",
      unitCost: 3242,
      installedCost: 3500,
      avgLife: 7,
      annualReserve: 237.9,
      monthlyReserve: 2323,
      monthlyReservePerCustomer: 23.23
    },
  ],
};

export const reducer = (state: WaterSystemState, action: WaterSystemAction): WaterSystemState => {
  switch (action.type) {
    case ACTIONS.UPDATE_WATER_SYSTEM:
      return {
        ...state,
        currentWaterSystem: action.payload
      };
    case ACTIONS.UPDATE_CONSOLIDATION_COST_PARAMS:
      return {
        ...state,
        consolidationCostParams: { ...state.consolidationCostParams, ...action.payload }
      };
    case ACTIONS.UPDATE_WATER_SYSTEM_AND_PARAMS:
      return {
        ...state,
        currentWaterSystem: action.payload.newWaterSystem,
        consolidationCostParams: {
          ...state.consolidationCostParams,
          ...action.payload.updatedParams
        }
      };
    default:
      return state;
  }
};
