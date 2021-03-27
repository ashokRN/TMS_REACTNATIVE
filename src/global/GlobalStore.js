import React from 'react';
import {reducer} from './GlobalReducer';

const initialState = {Auth: false};

export const GlobalContext = React.createContext({});

const Store = ({children}) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  
  return (
    <GlobalContext.Provider value={{State: state, StateDispatch: dispatch}}>
      {children}
    </GlobalContext.Provider>
  );
};

export default Store;