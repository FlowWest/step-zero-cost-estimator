import React, { createContext, useReducer } from 'react';
import { reducer, initialState } from './reducer';

export const WaterSystemContext = createContext({
  state: initialState,
  dispatch: () => null
}) as any;

export const WaterSystemProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState) as any;

  return (
    <WaterSystemContext.Provider value={[state, dispatch]}>{children}</WaterSystemContext.Provider>
  );
};
