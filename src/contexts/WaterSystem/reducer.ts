interface WaterSystemAction {
  type: string;
  payload: any;
}

interface WaterSystemState {
  currentWaterSystem: any;
}

export const initialState = {
  currentWaterSystem: {}
};

export const reducer = (state: WaterSystemState, action: WaterSystemAction): WaterSystemState => {
  switch (action.type) {
    case 'update_water_system':
      return {
        ...state,
        currentWaterSystem: action.payload
      };

    default:
      return state;
  }
};
