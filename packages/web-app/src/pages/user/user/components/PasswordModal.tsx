import React from 'react'
import ProForm, {
  DrawerForm,
  ModalForm,
  ProFormCheckbox,
  ProFormDatePicker,
  ProFormDateTimePicker,
  ProFormRadio,
  ProFormText,
} from '@ant-design/pro-form'
import { TableListItem } from '../data'
import {  set } from '../service'
import { message } from 'antd'

export interface PasswordModalProps {
  onTrigger?(): void
  currentRow: TableListItem
  refresh?: () => void
}


const PasswordModal: React.FC<PasswordModalProps> = (props) => {
  const {currentRow, refresh} = props
  return (
    <ModalForm<TableListItem>
      title="重置密码"
      width="600px"

      trigger={
        <a
          onClick={props.onTrigger}
        >
          重置密码
        </a>
      }
      modalProps={{
        destroyOnClose: true,
      }}
      onFinish={async (value) => {
        const success = await set({...value, id: currentRow.id}, currentRow)

        if (success) {
          message.success('修改成功')
          refresh?.()
          return true
        }

        return false
      }}
    >
      <ProFormText
        name="password"
        label="新密码"
      />
    </ModalForm>
  )
}

export default PasswordModal
