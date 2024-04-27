import { Bar, BarConfig } from '@ant-design/charts'
import ChatContainer from '../ChatContainer'
import { useRequest } from 'ahooks'
import { getTopUserPosts } from '@/services/hospital-app'


const DemoBar = () => {

  const {data: reqData, loading} = useRequest(getTopUserPosts)

  const data = reqData?.data || {}

  const config: BarConfig = {
    data,
    xField: 'nickname',
    yField: 'value',
    paddingRight: 80,
    style: {
      maxWidth: 25,
    },
    markBackground: {
      label: {
        text: ({ originData }) => {
          return `共发${originData.value}条`
        },
        position: 'right',
        dx: 80,
        style: {
          fill: '#aaa',
          fillOpacity: 1,
          fontSize: 14,
        },
      },
      style: {
        fill: '#eee',
      },
    },
    scale: {
      y: {
        domain: [0, 1000],
      },
    },
    axis: {
      x: {
        tick: false,
        title: false,
      },
      y: {
        grid: false,
        tick: false,
        label: false,
        title: false,
      },
    },
    interaction: {
      elementHighlightByColor: false,
    },
  }
  return (
    <ChatContainer title='用户发帖量排名' loading={loading}>
      <Bar {...config} />
    </ChatContainer>
  )
}



export default DemoBar
