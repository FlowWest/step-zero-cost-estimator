import { WaterSystem, WaterSystemState, WaterSystemAction } from '../../util/interfaces';

export const ACTIONS = {
  UPDATE_WATER_SYSTEM: 'update_water_system'
};

export const initialState = {
  currentWaterSystem: {},
  consolidationCostParams: {
    pipelineCost: 155,
    connectionCost: 6600,
    adminLegalCost: 285000,
    contingency: 20
  }
};

export const reducer = (state: WaterSystemState, action: WaterSystemAction): WaterSystemState => {
  switch (action.type) {
    case ACTIONS.UPDATE_WATER_SYSTEM:
      return {
        ...state,
        currentWaterSystem: action.payload
      };

    default:
      return state;
  }
};
