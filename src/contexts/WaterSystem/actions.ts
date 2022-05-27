import { ACTIONS } from './reducer';
import { WaterSystem, ComponentProperties } from '../../util/interfaces';

export const updateWaterSystem = (newWaterSystem: WaterSystem) => {
  return {
    type: ACTIONS.UPDATE_WATER_SYSTEM,
    payload: newWaterSystem
  };
};

export const updateConsolidationCostParams = (updatedParam: Object) => {
  return {
    type: ACTIONS.UPDATE_CONSOLIDATION_COST_PARAMS,
    payload: updatedParam
  };
};

export const updateWaterSystemAndParams = (newWaterSystem: WaterSystem, updatedParams: Object) => {
  return {
    type: ACTIONS.UPDATE_WATER_SYSTEM_AND_PARAMS,
    payload: { newWaterSystem, updatedParams }
  };
};

export const updateComponents = (
  existingComponents: ComponentProperties[],
  newComponents: ComponentProperties[]
) => {
  return {
    type: ACTIONS.UPDATE_COMPONENTS,
    payload: {
      existingComponents,
      newComponents
    }
  };
};

export const updateAutocompleteOptions = (autocompleteOptions: ComponentProperties[]) => {
  return {
    type: ACTIONS.UPDATE_AUTOCOMPLETE_OPTIONS,
    payload: {
      autocompleteOptions
    }
  };
};

export const updateCIPCostData = (rowId: number, cipCostData: Object) => {
  console.log('rowId', rowId);
  console.log('cipCostData', cipCostData);
  return {
    type: ACTIONS.UPDATE_CIP_COST_DATA,
    payload: {
      rowId,
      cipCostData
    }
  };
};
