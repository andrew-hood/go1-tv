export enum ActionType {
  PlayerUpdate = "player.update",
  AccountUpdate = "account.update",
}

interface IPlayerUpdate {
  type: ActionType.PlayerUpdate;
  payload: any;
}

interface IAccountUpdate {
  type: ActionType.AccountUpdate;
  payload: any;
}

export type Actions =
  | IPlayerUpdate
  | IAccountUpdate;

export const PlayerUpdate = (url: string): IPlayerUpdate => ({
  type: ActionType.PlayerUpdate,
  payload: { url },
});

export const AccountUpdate = (account: any): IAccountUpdate => ({
  type: ActionType.AccountUpdate,
  payload: account,
});