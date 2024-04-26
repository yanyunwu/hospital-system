import { Bar, BarConfig } from '@ant-design/charts'
import ChatContainer from '../ChatContainer'
import { useRequest } from 'ahooks'
import { getTopUserPosts } from '@/services/hospital-app'


const data = [
  {
    labelName: '蓝领',
    value: 110,
  },
  {
    labelName: '白领',
    value: 220,
  },
  {
    labelName: '制造业蓝领',
    value: 330,
  },
  {
    labelName: '退休人员',
    value: 440,
  },
]

const DemoBar = () => {



  const {data: reqData, loading} = useRequest(getTopUserPosts)

  const data = reqData?.data || {}

  const config: BarConfig = {
    data,
    xField: 'labelName',
    yField: 'value',
    paddingRight: 80,
    style: {
      maxWidth: 25,
    },
    markBackground: {
      label: {
        text: ({ originData }) => {
          return `${(originData.value / 1000) * 100}% | ${originData.value}`
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
