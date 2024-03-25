import { Image, Card, Space } from 'antd'
import { useGlobalContext } from '@/templates/CommonTemplate'
import { TableListItem } from '../../../../type'

export default function BaseInfo() {
  const { currentRow } = useGlobalContext<TableListItem>()
  return (
    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
      <Card title='帖子内容'>
        {currentRow?.content}
      </Card>
      <Card title='附带图片'>
        <Image.PreviewGroup>
          {currentRow?.picture?.map((item) => {
            return <Image key={item} width="33%" src={item} />
          })}
        </Image.PreviewGroup>
      </Card>
    </Space>
  )
}
