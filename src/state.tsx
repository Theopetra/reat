import React, { createContext, useContext, useState } from "react";

type INIT_STATE_TYPE = {
  senderAddress?: string;
  authenticated: boolean;

  _senderAddress: (address: string | undefined) => void;
  _authenticated: (authenticated: boolean) => void;
};

const INIT_STATE = {
  senderAddress: undefined,
  authenticated: false,
};

export const StateContext = createContext<INIT_STATE_TYPE>(null!);

const StateLogic = (props: React.PropsWithChildren<{}>) => {
  const [senderAddress, _senderAddress] = useState<string | undefined>(
    INIT_STATE.senderAddress
  );
  const [authenticated, _authenticated] = useState<boolean>(false);

  let contextValue = {
    senderAddress,
    _senderAddress,

    authenticated,
    _authenticated,
  };

  return (
    <StateContext.Provider value={{ ...contextValue }}>
      {props.children}
    </StateContext.Provider>
  );
};
export default StateLogic;

export const useAppState = () => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error("useAppState must be used within the AppStateProvider");
  }
  return context;
};
