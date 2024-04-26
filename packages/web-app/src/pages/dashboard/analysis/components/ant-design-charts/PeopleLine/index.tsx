
import { Line, LineConfig } from '@ant-design/charts'
import ChatContainer from '../ChatContainer'
import { getPeopleAdd } from '@/services/hospital-app'
import { useRequest } from 'ahooks'

const DemoLine = () => {

  const {data: reqData, loading} = useRequest(getPeopleAdd)

  const data = reqData?.data || {}

  const config: LineConfig = {
    data: data,
    xField: 'date',
    yField: 'value',
    sizeField: 'value',
    shapeField: 'trail',
    legend: { size: false },
    colorField: 'c',
  }
  return (
    <ChatContainer title='社区用户增量图' loading={loading}>
      <Line {...config} />
    </ChatContainer>
  )
}


export default DemoLine
