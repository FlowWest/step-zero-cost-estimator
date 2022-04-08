import React, { createContext, useReducer } from 'react';
import { reducer, initialState } from './reducer';

export interface IProps {
  children: React.ReactNode;
  // All other props
  [x: string]: any;
}

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
