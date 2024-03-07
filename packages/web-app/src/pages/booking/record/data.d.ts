import type { TableListItem as User } from '@/pages/user/user/data'

export type Booking = {
  id: number;
  title: string;
  intro: string;
  status: number;
  createTime: string;
};

export type BookingDate = {
  id: number;
  date: string;
  count: number;
  booking: Booking;
  bookingDateRecords: TableListItem[];
  createTime: string;
};

export type TableListItem = {
  id: number;
  bookingDate: BookingDate;
  user: User;
  // 状态 0已预约 1已完成 2未完成/过期 3用户取消 4系统取消
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
