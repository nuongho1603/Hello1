import {AccountRole} from './account-role';

export interface Role {
  roleId: number;
  name: string;

  accountRoleList: AccountRole[];
}
