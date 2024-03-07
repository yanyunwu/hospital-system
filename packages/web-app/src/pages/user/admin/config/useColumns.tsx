import { useMemo } from 'react'
import { ProColumns, ProColumnType } from '@ant-design/pro-table'
import { useGlobalContext } from '@/templates/CommonTemplate'
import { TableListItem } from '../type'
import DetailDrawer from '../components/DetailDrawer'

const useAction = (): ProColumnType<TableListItem> => {
  const { setCurrentRow } = useGlobalContext<TableListItem>()
  return {
    title: '操作',
    dataIndex: 'option',
    valueType: 'option',
    render: (_, record) => [
      <DetailDrawer
        key='DetailDrawer'
        onTrigger={() => {
          setCurrentRow(record)
        }}
      />
    ],
  }
}


export default () => {
  const action = useAction()
  return useMemo<ProColumns<TableListItem>[]>(() => ([
    {
      title: '用户名',
      dataIndex: 'username',
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
        2: {
          text: '未知'
        }
      }
    },
    {
      title: '年龄',
      dataIndex: 'age',
      valueType: 'text',
    },
    {
      title: '姓名/昵称',
      dataIndex: 'nickname',
      valueType: 'text',
    },
    {
      title: '出生年月',
      dataIndex: 'birthday',
      valueType: 'text',
    },
    {
      title: '医生编号',
      dataIndex: 'doctorId',
      valueType: 'text',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime'
    },
    action
  ]), [])
}
