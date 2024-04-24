import { Pie, PieConfig } from '@ant-design/charts'
import ChatContainer from '../ChatContainer'
import { useRequest } from 'ahooks'
import { getSexCount } from '@/services/hospital-app'


const SexPie = () => {

  const {data: reqData, loading} = useRequest(getSexCount)

  const config: PieConfig = {

    data: [
      { type: '男性', value: reqData?.data?.maleCount },
      { type: '女性', value: reqData?.data?.femaleCount },
      { type: '未知', value: reqData?.data?.genderlessCount },
      { type: '0'},
    ],
    angleField: 'value',
    colorField: 'type',
    paddingRight: 80,
    label: {
      text: 'value',
      style: {
        fontWeight: 'bold',
      },
    },
    legend: {
      color: {
        title: false,
        position: 'right',
        rowPadding: 5,
      },
    },
  }
  return (
    <ChatContainer title='性别比例' loading={loading}>
      <Pie {...config} />
    </ChatContainer>
  )
}

export default SexPie
