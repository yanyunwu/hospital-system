import { useMemo } from 'react'
import { ProColumns, ProColumnType } from '@ant-design/pro-components'
import { useGlobalContext } from '@/templates/CommonTemplate'
import { TableListItem } from '../type'
import ChatDetailDrawer from '../components/ChatDetailDrawer'
import { Button, message } from 'antd'
import { replySession } from '@/services/hospital-app/api'
import UserInfoCard from '@/components/UserInfoCard'

const useAction = (): ProColumnType<TableListItem> => {
  const { setCurrentRow } = useGlobalContext<TableListItem>()
  return {
    title: '操作',
    dataIndex: 'option',
    valueType: 'option',
    render: (_, record) => [
      <ChatDetailDrawer
        key="ChatDetailDrawer"
        trigger={
          <a
            onClick={async () => {
              setCurrentRow(record)
              if (record.status === 2) {
                message.error('该会话已被关闭！')
                return
              }
              const res = await replySession(record.id)
              console.log('res', res)
              if (!res.data) {
                message.error('当前会话正在被别人处理！')
                return
              }
            }}
          >
            回复
          </a>
        }
      />
    ],
  }
}


export default () => {
  const action = useAction()
  return useMemo<ProColumns<TableListItem>[]>(() => ([
    {
      title: '昵称/姓名',
      dataIndex: 'user',
      render(dom, item) {
        return <UserInfoCard id={item.user?.id}>
          <Button type='link'>
            {item.user?.nickname}
          </Button>
        </UserInfoCard>
      },
    },
    {
      title: '处理者',
      dataIndex: 'adminUser',
      render(dom, item) {
        return item.adminUser?.nickname
      },
    },
    {
      title: '当前状态',
      dataIndex: 'status',
      hideInForm: true,
      valueEnum: {
        0: {
          text: '等待回复',
          status: 'Success',
        },
        1: {
          text: '回复中',
          status: 'Success',
        },
        2: {
          text: '关闭',
          status: 'Error',
        },
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      sorter: (a, b) => Date.parse(a.createTime) - Date.parse(b.createTime),
      sortOrder: 'descend',
    },
    action
  ]), [])
}
