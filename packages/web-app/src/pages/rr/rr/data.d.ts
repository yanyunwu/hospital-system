export type TableListItem = {
  id: number;
  picture: JSON;
  // 状态 0已提交/审核中 1审核成功 2审核失败 3已完成报销/已到款
  status: number;
  user: any;
  createTime: string;
  name: string;
  stuId: string;
  sex: number;
  phone: string;
  datetime: string;
  remark: string;
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
