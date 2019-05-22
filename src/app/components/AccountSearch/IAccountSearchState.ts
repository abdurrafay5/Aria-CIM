import { IAccount } from "../Account/IAccount";

export interface IAccountSearchState {
  accounts: IAccount[];
  showAddAccountDialog: boolean;
  loading: boolean;
  page: number;
  rowsPerPage: number;
};