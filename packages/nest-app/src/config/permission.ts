interface Permission {
  // 标识符
  identifier: string;
  // 权限名称
  name: string;
  // 描述
  description?: string;
}

export default [
  {
    identifier: 'super',
    name: '超级管理员权限',
  },
  {
    identifier: 'permission.mp.community.see.tag',
    name: '社区帖子标签查看权限',
  },
] as Permission[];
