export type TableListItem = {
  id: number;
  openId: string;
  username: string;
  password: string;
  sex: number;
  age: number;
  birthday: string
  nickname: string
  stuId: number;
  createTime: string;
  avatar: string
  name: string
  description: string
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
