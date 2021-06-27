import React, { createContext, ReducerWithoutAction, useEffect, useReducer } from "react";
import { getAccount } from "../services/go1";
import { AccountUpdate, Actions, ActionType } from "./store.actions";

interface IStoreState {
  token: string;
  player: any;
  account: any;
}

interface IAppContext {
  state: IStoreState;
  dispatch: React.Dispatch<Actions>;
}

const store = createContext<IAppContext>({
  state: {
    token: '',
    player: null,
    account: null,
  },
  dispatch: () => null,
});

const { Provider } = store;

const reducer = (state: IStoreState, action: Actions) => {
  switch (action.type) {
    case ActionType.PlayerUpdate:
      console.log(action)
      return {
        ...state,
        player: action.payload
      };
    case ActionType.AccountUpdate:
      console.log(action);
      return {
        ...state,
        account: action.payload
      };
    default:
      return state;
  }
}

const AppProvider = ({
  children,
  values,
}: {
  children: JSX.Element;
  values: IStoreState;
}) => {
  const [state, dispatch] = useReducer(reducer, values);

  useEffect(() => {
    getAccount(state.token).then(account => {
      console.log(account);
      dispatch(AccountUpdate(account));
    });
  }, []);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, AppProvider };