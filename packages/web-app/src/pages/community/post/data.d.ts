import type { TableListItem as User } from '../../user/user/data';

export class PostReply {
  id: number;
  user: User;
  content: string;
  createTime: string;
}

export type TableListItem = {
  id: number;
  anonymous: boolean;
  content: string;
  picture: JSON;
  views: number;
  user: User;
  replies: PostReply[];
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
