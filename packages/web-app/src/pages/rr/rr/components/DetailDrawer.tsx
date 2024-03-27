import React from 'react'
import ProForm, {
  DrawerForm,
  ProFormCheckbox,
  ProFormDatePicker,
  ProFormDateTimePicker,
  ProFormRadio,
  ProFormText,
  ProFormTextArea
} from '@ant-design/pro-form'
import { useRequest } from 'ahooks'
import { TableListItem } from '../type'
import { useGlobalContext } from '@/templates/CommonTemplate'
import { handleRemove, handleUpdate } from '../service'
import { role } from '@/pages/access/role/service'
import { Button, Popconfirm,  Image } from 'antd'
import FileUpload from '@/components/FileUpload'

export interface DetailDrawerProps {
  onTrigger?(): void
}

const DetailDrawer: React.FC<DetailDrawerProps> = (props) => {
  const { currentRow, setCurrentRow, event$ } = useGlobalContext<TableListItem>()

  return (
    <DrawerForm<TableListItem>
      title="详情"
      autoFocusFirstInput
      trigger={
        <a
          onClick={props.onTrigger}
        >
          详情
        </a>
      }
      drawerProps={{
        destroyOnClose: true,
        extra: (
          <Popconfirm
            title='确定要删除该项吗？'
            onConfirm={async () => {
              if (currentRow) {
                await handleRemove([currentRow])
                event$.emit('reloadAndRest')
              }
            }}
          >
            <Button type='primary' danger>
              删除
            </Button>
          </Popconfirm>
        )
      }}
      initialValues={{...currentRow }}
      onFinish={async (values) => {
        // @ts-ignore
        values.roles = values.roles?.join(',')
        const success = await handleUpdate(values, currentRow)

        if (success) {
          setCurrentRow(undefined)
          event$.emit('reload')
          return true
        }

        return false
      }}
    >
      <ProFormText
        label="姓名"
        width="md"
        name="name"
      />
      <ProFormText
        label="学号"
        width="md"
        name="stuId"
      />
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
        ]}
      />
      <ProFormText
        label="手机号码"
        width="md"
        name="phone"
      />
      <ProFormDateTimePicker
        label="校外就诊时间"
        width="md"
        name="datetime"
      />

      <ProFormTextArea
        label="备注"
        width="md"
        name="remark"
      />
      <div style={{ margin: '10px 0' }}>附带图片：</div>
      <Image.PreviewGroup>
        {(currentRow?.picture as string[])?.map((item) => {
          return <Image key={item} width="33%" src={item} />
        })}
      </Image.PreviewGroup>
    </DrawerForm>
  )
}

export default DetailDrawer
