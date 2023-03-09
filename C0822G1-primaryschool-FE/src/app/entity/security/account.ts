import {AccountRole} from './account-role';

export interface Account {
  accountId?: number;
  userName?: string;
  password?: string;
  accountRoleList?: AccountRole[];
}
