
import { Line, LineConfig } from '@ant-design/charts'
import ChatContainer from '../ChatContainer'
import { getCommunityAdd } from '@/services/hospital-app'
import { useRequest } from 'ahooks'

const DemoLine = () => {

  const {data: reqData, loading} = useRequest(getCommunityAdd)

  const config: LineConfig = {
    data: reqData?.data || [],
    xField: 'date',
    yField: 'value',
    sizeField: 'value',
    shapeField: 'trail',
    legend: { size: false },
  }
  return (
    <ChatContainer title='社区发帖增量图' loading={loading}>
      <Line {...config} />
    </ChatContainer>
  )
}


export default DemoLine
