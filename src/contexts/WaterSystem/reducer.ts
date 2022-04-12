import { WaterSystem, WaterSystemState, WaterSystemAction } from '../../util/interfaces';

export const ACTIONS = {
  UPDATE_WATER_SYSTEM: 'update_water_system',
  UPDATE_CONSOLIDATION_COST_PARAMS: 'update_consolidation_cost_params'
};

export const initialState = {
  currentWaterSystem: {},
  consolidationCostParams: {
    connections: 100,
    pipelineCosts: 155,
    connectionCosts: 6600,
    adminLegalCosts: 285000,
    contingency: 20,
    distance: 1000
  }
};

export const reducer = (state: WaterSystemState, action: WaterSystemAction): WaterSystemState => {
  switch (action.type) {
    case ACTIONS.UPDATE_WATER_SYSTEM:
      return {
        ...state,
        currentWaterSystem: action.payload,
        consolidationCostParams: initialState.consolidationCostParams
      };
    case ACTIONS.UPDATE_CONSOLIDATION_COST_PARAMS:
      return {
        ...state,
        consolidationCostParams: { ...state.consolidationCostParams, ...action.payload }
      };

    default:
      return state;
  }
};
