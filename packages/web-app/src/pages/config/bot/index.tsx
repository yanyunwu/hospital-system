import { currentUser, getModels, getSysConfig, setCurrentUser, setSysConfig } from '@/services/hospital-app'
import ProForm, { ProFormDatePicker, ProFormRadio, ProFormText, ProFormDigit, ProFormTextArea, ProFormSelect } from '@ant-design/pro-form'
import { Card, message } from 'antd'
import { omitBy } from 'lodash'
import { useRequest } from 'ahooks'
import { useMemo } from 'react'

export default function () {

  const { data: reqData } = useRequest(getModels)

  const options = useMemo(() => {

    if (!reqData?.data) {
      return []
    }

    return reqData.data.map((item: any)=> ({
      label: item.id,
      value: item.id
    }))

  }, [reqData?.data])

  console.log('reqData', reqData)

  return (
    <Card title="chatgpt大模型设置">
      <ProForm
        onFinish={async (values: any) => {
          console.log('values', values)
          const res = await setSysConfig('bot', values)
          console.log('values', values, res)
          message.success('信息保存成功!')
        }}
        params={{}}
        request={async () => {
          const { data } = await getSysConfig('bot')
          return data || {}
        }}
      >
        <ProFormDigit
          width="md"
          name="botID"
          label="机器人账号id"
          tooltip="机器上也是一个用户账号，用于设置回复的账号"
          placeholder="机器上也是一个用户账号，用于设置回复的账号"
          required
        />

        <ProFormSelect
          showSearch
          name="model"
          label="大模型选择"
          width="md"
          options={options}
          required
          placeholder='请选择一个模型'
          tooltip="不要乱动哦，不同的模型收费是不一样的"
        />

        <ProFormDigit
          width="md"
          name="temperature"
          label="采样温度"
          tooltip="使用什么采样温度，介于 0 和 2 之间。较高的值（如 0.8）将使输出更加随机，而较低的值（如 0.2）将使输出更加集中和确定。"
          placeholder="请输入0-2数字"
          required
        />

        <ProFormDigit
          width="md"
          name="maxTokens"
          label="每次最大回复字数"
          tooltip="每次回复的字数越多，扣费越多"
          placeholder="请输入数字"
          required
        />

        <ProFormTextArea
          width="lg"
          name="zSetting"
          label="心理健康咨询机器人设定"
          placeholder="请输入设定集"
          required
          fieldProps={{
            autoSize: {
              minRows: 10
            }
          }}
        />

        <ProFormTextArea
          width="lg"
          name="openingRemarks"
          label="心理健康咨询机器人开场白"
          placeholder="请输入开场白"
          required
          fieldProps={{
            autoSize: {
              minRows: 10
            }
          }}
        />

        <ProFormTextArea
          width="lg"
          name="hSetting"
          label="心理健康社区回复机器人设定"
          placeholder="请输入设定集"
          required
          fieldProps={{
            autoSize: {
              minRows: 10
            }
          }}
        />
      </ProForm>
    </Card>
  )
}
