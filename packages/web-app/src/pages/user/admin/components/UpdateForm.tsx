import React from 'react';
import { Modal } from 'antd';
import { ProFormText, StepsForm, ProFormCheckbox, ProFormDatePicker, ProFormRadio } from '@ant-design/pro-form';
import type { TableListItem } from '../data';
import { useRequest } from 'ahooks';
import { role } from '@/pages/access/role/service';

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
  }));

  return (
    <StepsForm
      stepsProps={{
        size: 'small',
      }}
      stepsFormRender={(dom, submitter) => {
        return (
          <Modal
            width={640}
            bodyStyle={{
              padding: '32px 40px 48px',
            }}
            destroyOnClose
            title="基本信息配置"
            visible={props.updateModalVisible}
            footer={submitter}
            onCancel={() => {
              props.onCancel();
            }}
          >
            {dom}
          </Modal>
        );
      }}
      onFinish={props.onSubmit}
    >
      <StepsForm.StepForm
        initialValues={{...props.values}}
        title="基本信息"
      >
         <ProFormText
          label="用户名"
          rules={[
            {
              required: true,
              message: '必填项',
            },
          ]}
          width="md"
          name="username"
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
            {
              label: '未知',
              value: 2,
            },
          ]}
        />
        <ProFormDatePicker
              label="出生年月"
              rules={[
                {
                  required: true,
                  message: '必填项',
                },
              ]}
              width="md"
              name="birthday"
            />

        <ProFormText
          label="姓名/昵称"
          rules={[
            {
              required: true,
              message: '必填项',
            },
          ]}
          width="md"
          name="nickname"
        />
        <ProFormText
          label="医生编号"
          width="md"
          name="doctorId"
        />
      </StepsForm.StepForm>
      <StepsForm.StepForm
        initialValues={{
          roles: props.values.roles?.split(',').map((item) => parseInt(item)),
        }}
        title="配置用户角色"
      >
        <ProFormCheckbox.Group
          name="roles"
          layout="horizontal"
          label="配置角色"
          options={checkboxValues}
        />
      </StepsForm.StepForm>
    </StepsForm>
  );
};

export default UpdateForm;
