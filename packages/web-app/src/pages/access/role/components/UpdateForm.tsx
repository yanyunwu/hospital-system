import React from 'react';
import { Modal } from 'antd';
import { ProFormText, StepsForm, ProFormCheckbox } from '@ant-design/pro-form';
import type { TableListItem } from '../data';
import { useRequest } from 'ahooks';
import { role } from '../../auth/service';

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
  const { data } = useRequest(role);
  const checkboxValues = (data?.data || []).map((item) => ({
    label: item.name,
    value: item.id,
    disabled: !item.status,
  }));

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
              props.onCancel();
            }}
          >
            {dom}
          </Modal>)
        );
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
          name="identification"
          label="标识符"
          width="md"
          rules={[
            {
              required: true,
              message: '请输入标识符！',
            },
          ]}
        />
        <ProFormText
          name="name"
          label="角色名称"
          width="md"
          rules={[
            {
              required: true,
              message: '请输入角色名称！',
            },
          ]}
        />
      </StepsForm.StepForm>
      <StepsForm.StepForm
        initialValues={{
          auths: props.values.auths?.split(',').map((item) => parseInt(item)),
        }}
        title="配置角色权限"
      >
        <ProFormCheckbox.Group
          name="auths"
          layout="horizontal"
          label="选择相应权限"
          options={checkboxValues}
        />
      </StepsForm.StepForm>
    </StepsForm>)
  );
};

export default UpdateForm;
