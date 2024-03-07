import React from 'react'
import { Modal } from 'antd'
import { ProFormText, StepsForm, ProFormCheckbox } from '@ant-design/pro-form'
import type { TableListItem } from '../data'

export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
} & Partial<TableListItem>;

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalVisible: boolean;
  values: Partial<TableListItem>;
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  return (
    (<StepsForm
      stepsProps={{
        size: 'small',
      }}
      stepsFormRender={(dom, submitter) => {
        return (
          (<Modal
            width={640}
            bodyStyle={{
              padding: '32px 40px 48px',
            }}
            destroyOnClose
            title="角色配置"
            open={props.updateModalVisible}
            footer={submitter}
            onCancel={() => {
              props.onCancel()
            }}
          >
            {dom}
          </Modal>)
        )
      }}
      onFinish={props.onSubmit}
    >
      <StepsForm.StepForm
        initialValues={{
          name: props.values.name,
          identification: props.values.identification,
        }}
        title="基本信息"
      >
        <ProFormText
          label="标识符"
          rules={[
            {
              required: true,
              message: '标识符必填项',
            },
          ]}
          width="md"
          name="identification"
        />
        <ProFormText
          label="菜单名称"
          rules={[
            {
              required: true,
              message: '菜单名称必填项',
            },
          ]}
          width="md"
          name="name"
        />
        <ProFormText
          label="菜单路径"
          rules={[
            {
              required: true,
              message: '菜单路径必填项',
            },
          ]}
          width="md"
          name="path"
        />
        <ProFormSwitch label="状态" width="md" name="status" />
      </StepsForm.StepForm>
      <StepsForm.StepForm
        initialValues={{
          target: '0',
          template: '0',
        }}
        title="配置角色权限"
      >
        <ProFormCheckbox.Group
          name="auths"
          layout="horizontal"
          label="选择相应权限"
          options={['农业', '制造业', '互联网']}
        />
      </StepsForm.StepForm>
    </StepsForm>)
  )
}

export default UpdateForm
