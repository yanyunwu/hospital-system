
import { Line } from '@ant-design/charts'
import ChatContainer from '../ChatContainer'

const DemoLine = () => {
  const config = {
    data: {
      type: 'fetch',
      value: 'https://gw.alipayobjects.com/os/bmw-prod/55424a73-7cb8-4f79-b60d-3ab627ac5698.json',
    },
    xField: (d) => new Date(d.year),
    yField: 'value',
    sizeField: 'value',
    shapeField: 'trail',
    legend: { size: false },
    colorField: 'category',
  }
  return (
    <ChatContainer title='社区发帖增量图'>
      <Line {...config} />
    </ChatContainer>
  )
}


export default DemoLine
