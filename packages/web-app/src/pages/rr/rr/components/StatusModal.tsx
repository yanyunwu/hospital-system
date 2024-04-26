import React from 'react'
import ProForm, {
  DrawerForm,
  ModalForm,
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

export interface StatusModalProps {
  onTrigger?(): void
}


const StatusModal: React.FC<StatusModalProps> = (props) => {
  const { currentRow, setCurrentRow, event$ } = useGlobalContext<TableListItem>()

  return (
    <ModalForm<TableListItem>
      title="审批"
      width="600px"
      initialValues={{ status: currentRow?.status }}
      trigger={
        <a
          onClick={props.onTrigger}
        >
          审批
        </a>
      }
      modalProps={{
        destroyOnClose: true,
      }}
      onFinish={async (value) => {
        const success = await handleUpdate(value, currentRow)

        if (success) {
          setCurrentRow(undefined)
          event$.emit('reload')
          return true
        }

        return false
      }}
    >
      {/* 状态 0已提交/审核中 1审核成功 2审核失败 3已完成报销/已到款 */}
      <ProFormRadio.Group
        name="status"
        layout="horizontal"
        label="设置当前预约记录的状态"
        options={[
          {
            value: 0,
            label: '已提交/审核中',
          },
          {
            value: 1,
            label: '审核成功',
          },
          {
            value: 2,
            label: '审核失败',
          },
          {
            value: 3,
            label: '已完成报销/已到款',
          },
        ]}
      />
    </ModalForm>
  )
}

export default StatusModal
