import { WaterSystem, WaterSystemState, WaterSystemAction } from '../../util/interfaces';
import { getSystemComponentValues } from '../../util/costUtil';

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
    feeCostPerConnection: 6600,
    adminLegalCEQACosts: 285000,
    contingency: 20,
    distance: 1000
  },
  existingComponents: [],
  newComponents: [],
  autocompleteOptions: [],
  cipCostData: {
    existing: 0,
    new: 0,
    total: 0
  },
  systemComponents: []
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
      const updatedParams = { ...state.consolidationCostParams, ...action.payload };

      return {
        ...state,
        consolidationCostParams: updatedParams,
        systemComponents: getSystemComponentValues({
          waterSystemDetails: state.currentWaterSystem,
          consolidationCostParams: updatedParams
        })
      };
    case ACTIONS.UPDATE_WATER_SYSTEM_AND_PARAMS:
      const updatedCostParams = {
        ...state.consolidationCostParams,
        ...action.payload.updatedParams
      };
      const test2 = state?.currentWaterSystem
        ? getSystemComponentValues({
            waterSystemDetails: state.currentWaterSystem,
            consolidationCostParams: updatedCostParams
          })
        : '';
      return {
        ...state,
        currentWaterSystem: action.payload.newWaterSystem,
        consolidationCostParams: updatedCostParams,
        existingComponents: [],
        newComponents: [],
        autocompleteOptions: [],
        systemComponents: getSystemComponentValues({
          waterSystemDetails: state.currentWaterSystem,
          consolidationCostParams: updatedCostParams
        })
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
        cipCostData: { ...state.cipCostData, [action.payload.cipType]: action.payload.cipCostData }
      };
    default:
      return state;
  }
};
