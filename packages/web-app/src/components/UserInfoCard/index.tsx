import React, { useEffect, useState } from 'react'
import { CloseCircleOutlined } from '@ant-design/icons'
import { Avatar, Button, Card, Popover, Space } from 'antd'
import { useRequest } from 'ahooks'
import ProForm, { ProFormField, ProFormRadio } from '@ant-design/pro-form'
import styles from './index.less'
import { getUserInfo } from '@/services/hospital-app/api'
import { TableListItem } from '@/pages/user/user/data'

interface AdminUserInfoCardProps {
  children?: React.ReactElement
  id?: number
}

export default function UserInfoCard(props: AdminUserInfoCardProps) {
  const [open, setOpen] = useState(false)
  const { data: reqData, loading, run } = useRequest<{data: TableListItem}>(() => getUserInfo(props.id), {refreshDeps: [props.id]})
  const hide = () => {
    setOpen(false)
  }

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
  }

  useEffect(() => {
    if (open) {
      run()
    }
  }, [open])

  return  (
    <Popover
      content={
        <div style={{margin: '-12px'}}>
          <Card
            loading={loading}
            style={{ width: 250 }}
            cover={
              <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              />
            }
            actions={[
              <Button onClick={hide} type='link' icon={<CloseCircleOutlined key="ellipsis" />} key='close'>关闭</Button>,
            ]}
          >
            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
              <Card.Meta
                avatar={<Avatar size='large' src={reqData?.data.avatar} />}
                title={reqData?.data.name || '该用户未设置姓名'}
                description={reqData?.data.description || '该用户还没有签名~~~'}
              />
              <ProForm
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 14 }}
                colon={false}
                layout='horizontal'
                readonly
                labelAlign='left'
                initialValues={{ ...reqData?.data, _type: '前台用户'}}
                submitter={false}
              >
                <div className={styles.column}>
                  <ProFormField name='username' label='用户名' />
                  <ProFormField name='nickname' label='昵称' />
                  <ProFormField name='stuId' label='学号' />
                  <ProFormRadio.Group
                    name="sex"
                    label="性别"
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
                  <ProFormField name='birthday' label='出生年月' />
                  <ProFormField name='_type' label='人员类型' />
                </div>
              </ProForm>
            </Space>
          </Card>
        </div>
      }
      trigger="click"
      open={open}
      onOpenChange={handleOpenChange}
    >
      {props.children}
    </Popover>
  )
}
