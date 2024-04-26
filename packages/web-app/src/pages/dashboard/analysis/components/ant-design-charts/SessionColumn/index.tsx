import { Column } from '@ant-design/charts'
import ChatContainer from '../ChatContainer'
import { useRequest } from 'ahooks'
import { getSessionAdd } from '@/services/hospital-app'


const DemoColumn = () => {

  const {data: reqData, loading} = useRequest(getSessionAdd)

  const data = reqData?.data || {}


  const config = {
    data: data,
    xField: 'date',
    yField: 'value',
    label: {
      text: (d) => `${d.value}个`,
      textBaseline: 'bottom',
    },
    // axis: {
    //   y: {
    //     labelFormatter: '.0%',
    //   },
    // },
    style: {
      // 圆角样式
      radiusTopLeft: 10,
      radiusTopRight: 10,
    },
  }
  return (
    <ChatContainer title='会话产生增量图' loading={loading}>
      <Column {...config} />
    </ChatContainer>
  )
}

export default DemoColumn
