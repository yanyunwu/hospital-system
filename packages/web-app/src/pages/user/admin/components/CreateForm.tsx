import React from 'react';
import { Button } from 'antd';
import { ModalForm, ProFormDatePicker, ProFormRadio, ProFormText } from '@ant-design/pro-components';
import { PlusOutlined } from '@ant-design/icons';
import { handleAdd } from '../service';
import { TableListItem } from '../type';
import { useGlobalContext } from '@/templates/CommonTemplate';


const CreateForm: React.FC = () => {
  const { event$ } = useGlobalContext<TableListItem>()
  return (
    <ModalForm<TableListItem>
      title="新建"
      modalProps={{
        destroyOnClose: true
      }}
      trigger={
        <Button type="primary">
          <PlusOutlined style={{color: "white"}} />
          新建
        </Button>
      }
      initialValues={{ sex: 2 }}
      onFinish={async (value) => {
        const success = await handleAdd(value)
        if (success) {
          event$.emit('reload')
          return true
        }
        return false
      }}
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
    </ModalForm>
  );
};

export default CreateForm;
