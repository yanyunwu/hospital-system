import { Bar } from '@ant-design/charts'
import ChatContainer from '../ChatContainer'

const data = [
  { year: '1951 年', value: 38 },
  { year: '1952 年', value: 52 },
  { year: '1956 年', value: 61 },
  { year: '1957 年', value: 145 },
  { year: '1958 年', value: 48 },
]

const DemoBar = () => {
  const config = {
    data,
    xField: 'year',
    yField: 'value',
    shapeField: 'hollow',
    colorField: 'year',
    legend: {
      color: { size: 72, autoWrap: true, maxRows: 3, cols: 6 },
    },
  }
  return (
    <ChatContainer title='内容贴评论量排名'>
      <Bar {...config} />
    </ChatContainer>
  )
}


export default DemoBar
