import { useMemo } from 'react'
import { ProColumns, ProColumnType } from '@ant-design/pro-table'
import { useGlobalContext } from '@/templates/CommonTemplate'
import { TableListItem } from '../type'
import DetailDrawer from '../components/DetailDrawer'

const useAction = (): ProColumnType<TableListItem> => {
  const { setCurrentRow } = useGlobalContext<TableListItem>()
  return  {
    title: '操作',
    dataIndex: 'option',
    valueType: 'option',
    render: (_, record) => [
      <DetailDrawer
        key="config"
        trigger={
          <a onClick={() => {
            setCurrentRow(record)
          }}>
        查看详情
          </a>}
      />
    ],
  }
}


export default () => {
  const action = useAction()
  return useMemo<ProColumns<TableListItem>[]>(() => ([
    {
      title: '发帖人',
      dataIndex: 'user',
      render(dom, item) {
        return <a>{item.user.nickname}</a>
      },
    },
    {
      title: '是否匿名',
      dataIndex: 'anonymous',
      render(dom, item) {
        return item.anonymous ? '匿名' : '不匿名'
      },
    },
    {
      title: '评论数',
      dataIndex: 'anonymous',
      render(dom, item) {
        return item.replies ? item.replies.length : 0
      },
    },
    {
      title: '浏览量',
      dataIndex: 'views',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
    },
    action
  ]), [])
}
