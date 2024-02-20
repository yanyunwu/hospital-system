export type TableListItem = {
  id: number;
  title: string;
  intro: string;
  status: number;
  createTime: string;
};

export type DateTableListItem = {
  id: number;
  date: string;
  count: number;
  bookingDateRecords: BookingDateRecord[];
  createTime: string;
};

export type BookingDateRecord = {
  id: number;
  status: number;
  code: string;
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
