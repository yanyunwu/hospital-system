import type { TableListItem as User } from '../../user/user/data'

export class PostReply {
  id: number
  user: User
  content: string
  createTime: string
}

export type TableListItem = {
  id: number;
  anonymous: boolean;
  content: string;
  picture: string[];
  views: number;
  user: User;
  replies: PostReply[];
  createTime: string;
};
