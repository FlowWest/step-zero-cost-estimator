import { ACTIONS } from './reducer';
import { WaterSystem } from '../../util/interfaces';

export const updateWaterSystem = (newWaterSystem: WaterSystem) => {
  return {
    type: ACTIONS.UPDATE_WATER_SYSTEM,
    payload: newWaterSystem
  };
};
