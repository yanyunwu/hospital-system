import type { TableListItem as User } from '../../user/user/data'
import type { TableListItem as Admin } from '../../user/admin/data'

export type TableListItem = {
  id: number;
  status: number
  user: User;
  adminUser: Admin;
  createTime: string;
};

export type TableListPagination = {
  total: number;
  pageSize: number;
  current: number;
};

export type TableListData = {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
};

export type TableListParams = {
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
};
