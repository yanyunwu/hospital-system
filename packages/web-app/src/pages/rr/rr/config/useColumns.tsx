import { useMemo } from 'react'
import { ProColumns, ProColumnType } from '@ant-design/pro-components'
import { useGlobalContext } from '@/templates/CommonTemplate'
import { TableListItem } from '../type'
import DetailDrawer from '../components/DetailDrawer'
import StatusModal from '../components/StatusModal'

const useAction = (): ProColumnType<TableListItem> => {
  const { setCurrentRow } = useGlobalContext<TableListItem>()
  return {
    title: '操作',
    dataIndex: 'option',
    valueType: 'option',
    render: (_, record) => [
      <DetailDrawer key='DetailDrawer' onTrigger={() => {
        setCurrentRow(record)
      }} />,

      <StatusModal key='StatusModal' onTrigger={() => {
        setCurrentRow(record)
      }} />
    ],
  }
}


export default () => {
  const action = useAction()
  return useMemo<ProColumns<TableListItem>[]>(() => ([
    {
      title: '申请用户',
      dataIndex: 'username',
      render(dom, item) {
        return item.user.nickname
      }
    },
    {
      title: '姓名',
      dataIndex: 'name',
      valueType: 'text',
    },
    {
      title: '学号',
      dataIndex: 'stuId',
      valueType: 'text',
    },
    {
      title: '性别',
      dataIndex: 'sex',
      valueEnum: {
        0: {
          text: '男'
        },
        1: {
          text: '女'
        },
      }
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      valueType: 'text',
    },
    // 0已提交/审核中 1审核成功 2审核失败 3已完成报销/已到款
    {
      title: '当前状态',
      dataIndex: 'status',
      valueEnum: {
        0: {
          text: '已提交/审核中',
          key: '0',
        },
        1: {
          text: '审核成功',
          key: '1',
        },
        2: {
          text: '审核失败',
          key: '2',
        },
        3: {
          text: '已完成报销/已到款',
          key: '3',
        },
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
    },
    action
  ]), [])
}
