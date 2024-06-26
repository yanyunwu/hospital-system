import { Card, Select, Space } from 'antd'
import WordCloud from '@/components/WordCloud'
import { useRequest } from 'ahooks'
import { GetPostCuts } from '@/pages/community/post/service'
import { useGlobalContext } from '@/templates/CommonTemplate'
import { TableListItem } from '../../../../type'
import { useState } from 'react'
import { RedoOutlined } from '@ant-design/icons'
import { Column } from '@ant-design/charts'


const DemoColumn = (props:any) => {

  const data = (props.data).slice(0, 10).sort((a, b) => a.value > b.value ? -1 : 1)

  const config = {
    data: data,
    xField: 'text',
    yField: 'value',
    label: {
      text: (d) => `出现${d.value}次`,
      textBaseline: 'bottom',
    },
    style: {
      // 圆角样式
      radiusTopLeft: 10,
      radiusTopRight: 10,
    },
  }
  return (
    <Column {...config} />
  )
}

export default function DataAnalysis() {

  const [multiple, setMultiple ] = useState(10)
  const { currentRow } = useGlobalContext<TableListItem>()
  const { data, refresh, loading } = useRequest(() => GetPostCuts(currentRow.id), {
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
            <span>
              <RedoOutlined onClick={refresh} />
            </span>
          </Space>
        }
      >
        {data && <WordCloud words={data} weightFactor={multiple} />}
      </Card>
      <Card title="图表分析">
        {!loading && <DemoColumn data={data} />}
      </Card>
    </Space>
  )
}
