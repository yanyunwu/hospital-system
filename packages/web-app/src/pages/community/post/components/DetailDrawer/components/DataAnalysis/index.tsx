import { Card, Select, Space } from 'antd'
import WordCloud from '@/components/WordCloud'
import { useRequest } from 'ahooks'
import { GetPostCuts } from '@/pages/community/post/service'
import { useGlobalContext } from '@/templates/CommonTemplate'
import { TableListItem } from '../../../../type'
import { useState } from 'react'

export default function DataAnalysis() {

  const [multiple, setMultiple ] = useState(10)
  const { currentRow } = useGlobalContext<TableListItem>()
  const { data } = useRequest(() => GetPostCuts(currentRow.id), {
    refreshDeps: [currentRow.id]
  })

  return (
    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
      <Card
        title="词云分析"
        extra={
          <Space>
            <span>缩放比例:</span>
            <Select
              value={multiple}
              style={{ width: 120 }}
              onChange={setMultiple}
              options={[
                { value: 1, label: '1' },
                { value: 5, label: '5' },
                { value: 10, label: '10' },
                { value: 15, label: '15'},
                { value: 20, label: '20'},
              ]}
            />
          </Space>
        }
      >
        {data && <WordCloud words={data} weightFactor={multiple} />}
      </Card>
      <Card title="图表分析">

      </Card>
    </Space>
  )
}
