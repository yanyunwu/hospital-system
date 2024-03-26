import { currentUser, setCurrentUser } from '@/services/hospital-app'
import ProForm, { ProFormDatePicker, ProFormRadio, ProFormText } from '@ant-design/pro-form'
import { Card, message } from 'antd'
import { AdminUser } from './type'
import FileUpload from '@/components/FileUpload'
import { omitBy } from 'lodash'

export default function () {

  return (
    <Card title="个人中心">
      <ProForm<AdminUser>
        onFinish={async (values) => {
          const res = await setCurrentUser(omitBy(values, (v) => v == null))
          console.log('values', values, res)
          message.success('信息保存成功!')
        }}
        params={{}}
        request={async () => {
          const { data } = await currentUser()
          return data as AdminUser
        }}
      >
        <ProForm.Item name='avatar'>
          <FileUpload />
        </ProForm.Item>
        <ProFormText
          width="md"
          name="username"
          label="用户名"
          tooltip="最长为 24 位"
          placeholder="请输入用户名"
          required
        />
        <ProFormText
          width="md"
          name="nickname"
          label="昵称"
          placeholder="请输入昵称"
          required
        />

        <ProFormRadio.Group
          name="sex"
          label="性别"
          width="md"
          options={[
            {
              label: '男',
              value: 0,
            },
            {
              label: '女',
              value: 1,
            },
            {
              label: '未知',
              value: 2,
            },
          ]}
        />
        <ProFormDatePicker
          label="出生年月"
          width="md"
          name="birthday"
          required
        />
      </ProForm>
    </Card>
  )
}
