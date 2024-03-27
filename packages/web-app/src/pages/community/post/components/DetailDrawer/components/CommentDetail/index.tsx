import SimpleDataCard from '@/components/SimpleDataCard'
import { TableListItem } from '../../../../type'
import Comment from '../Comment'
import dayjs from 'dayjs'
import { Card, Col, Empty, Row, Space } from 'antd'
import { useRequest } from 'ahooks'
import { getCommunityReplies } from '@/services/hospital-app/api'
import { PageLoading } from '@ant-design/pro-components'

interface CommentDetailProps {
  record: TableListItem
}

export default function CommentDetail({record}: CommentDetailProps) {

  const { data: requestData } = useRequest(() => getCommunityReplies(record.id), {
    refreshDeps: []
  })

  if (!requestData) {
    return <PageLoading />
  }

  const replies = requestData.data as TableListItem['replies']

  return (
    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
      <Row gutter={10}>
        <Col span={12}>
          <SimpleDataCard title='访问量' count={record.views} />
        </Col>
        <Col span={12}>
          <SimpleDataCard title='评论数' count={replies.length} />
        </Col>
      </Row>
      <Card title="评论列表">
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          {
            replies.length
              ? replies.map((item, index) => {
                return (
                  <div key={index}>
                    <Comment
                      avatarUrl={item.user.avatar}
                      name={item.user.nickname}
                      time={dayjs(item.createTime).format('YYYY-MM-DD HH:mm:ss')}
                      content={item.content}
                    />
                  </div>
                )
              })
              : <Empty className='mt-8' description="暂无评论数据" />
          }
        </Space>
      </Card>
    </Space>
  )
}
