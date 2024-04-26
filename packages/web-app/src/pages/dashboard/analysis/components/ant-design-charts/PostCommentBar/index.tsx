import { Bar } from '@ant-design/charts'
import ChatContainer from '../ChatContainer'
import { getTopUserPostReplys } from '@/services/hospital-app'
import { useRequest } from 'ahooks'




const DemoBar = () => {
  const {data: reqData, loading} = useRequest(getTopUserPostReplys)

  const data = reqData?.data || {}


  const config = {
    data,
    xField: 'nickname',
    yField: 'value',
    colorField: 'nickname',
    legend: {
      color: { size: 72, autoWrap: true, maxRows: 3, cols: 6 },
    },
  }
  return (
    <ChatContainer title='内容贴评论量排名' loading={loading}>
      <Bar {...config} />
    </ChatContainer>
  )
}


export default DemoBar
