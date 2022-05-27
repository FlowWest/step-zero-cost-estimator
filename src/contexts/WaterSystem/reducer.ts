import { WaterSystem, WaterSystemState, WaterSystemAction } from '../../util/interfaces';

export const ACTIONS = {
  UPDATE_WATER_SYSTEM: 'update_water_system',
  UPDATE_CONSOLIDATION_COST_PARAMS: 'update_consolidation_cost_params',
  UPDATE_WATER_SYSTEM_AND_PARAMS: 'update_water_system_and_params',
  UPDATE_COMPONENTS: 'update_components',
  UPDATE_AUTOCOMPLETE_OPTIONS: 'update_autocomplete_options',
  UPDATE_CIP_COST_DATA: 'update_cip_cost_data'
};

export const initialState = {
  currentWaterSystem: {},
  consolidationCostParams: {
    connections: 100,
    pipelineCosts: 155,
    connectionFees: 6600,
    adminLegalCosts: 285000,
    contingency: 20,
    distance: 1000
  },
  existingComponents: [],
  newComponents: [],
  autocompleteOptions: [],
  cipCostData: {
    existing: {},
    new: {}
  }
};

export const reducer = (state: WaterSystemState, action: WaterSystemAction): WaterSystemState => {
  switch (action.type) {
    case ACTIONS.UPDATE_WATER_SYSTEM:
      return {
        ...state,
        currentWaterSystem: action.payload,
        existingComponents: [],
        newComponents: [],
        autocompleteOptions: []
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
        },
        existingComponents: [],
        newComponents: [],
        autocompleteOptions: []
      };
    case ACTIONS.UPDATE_COMPONENTS:
      return {
        ...state,
        existingComponents: [...action.payload.existingComponents],
        newComponents: [...action.payload.newComponents]
      };
    case ACTIONS.UPDATE_AUTOCOMPLETE_OPTIONS:
      return {
        ...state,
        autocompleteOptions: [...action.payload.autocompleteOptions]
      };
    case ACTIONS.UPDATE_CIP_COST_DATA:
      return {
        ...state,
        cipCostData: { ...state.cipCostData, [action.payload.rowId]: action.payload.cipCostData }
      };
    default:
      return state;
  }
};
