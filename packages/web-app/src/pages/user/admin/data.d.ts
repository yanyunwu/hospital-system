export type TableListItem = {
  id: number;
  username: string;
  password: string;
  roles: string;
  sex: number;
  age: number;
  birthday: string;
  nickname: string
  doctorId: number;
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
