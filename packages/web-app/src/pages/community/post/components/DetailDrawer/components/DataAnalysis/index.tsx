import { Card, Space } from 'antd'
import WordCloud from '@/components/WordCloud'


export default function DataAnalysis() {
  return (
    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
      <Card title="词云分析">
        <WordCloud />
      </Card>
      <Card title="图表分析">

      </Card>
    </Space>
  )
}
