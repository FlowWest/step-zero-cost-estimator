import { ACTIONS } from './reducer';
import { WaterSystem, ComponentProperties } from '../../util/interfaces';

export const updateConsolidationCostParams = (updatedParam: Record<string, unknown>) => {
  return {
    type: ACTIONS.UPDATE_CONSOLIDATION_COST_PARAMS,
    payload: updatedParam
  };
};

export const updateWaterSystemAndParams = (
  newWaterSystem: WaterSystem,
  updatedParams: Record<string, unknown>
) => {
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

export const updateCIPCostData = (cipType: string, cipCostData: number) => {
  return {
    type: ACTIONS.UPDATE_CIP_COST_DATA,
    payload: {
      cipType,
      cipCostData
    }
  };
};

export const updateSelectedTreatments = (selectedTreatments: Array<any>) => {
  return {
    type: ACTIONS.UPDATE_SELECTED_TREATMENTS,
    payload: selectedTreatments
  };
};
