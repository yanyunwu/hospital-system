import React from 'react'
import {
  DrawerForm,
  ProFormCheckbox,
  ProFormDatePicker,
  ProFormRadio,
  ProFormText
} from '@ant-design/pro-form'
import { useRequest } from 'ahooks';
import { TableListItem } from '../type';
import { useGlobalContext } from '@/templates/CommonTemplate';
import { handleRemove, handleUpdate } from '../service';
import { role } from '@/pages/access/role/service';
import { Button, Popconfirm } from 'antd';

export interface DetailDrawerProps {
  onTrigger?(): void
}

const DetailDrawer: React.FC<DetailDrawerProps> = (props) => {
  const { currentRow, setCurrentRow, event$ } = useGlobalContext<TableListItem>()
  const { data } = useRequest(role);
  const checkboxValues = (data?.data || []).map((item) => ({
    label: item.name,
    value: item.id,
  }));

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
                await handleRemove([currentRow]);
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
      initialValues={{...currentRow, roles: currentRow?.roles?.split(',').map(i => parseInt(i))}}
      onFinish={async (values) => {
        // @ts-ignore
        values.roles = values.roles?.join(',')
        const success = await handleUpdate(values, currentRow);

        if (success) {
          setCurrentRow(undefined);
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
        width="md"
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
      <ProFormCheckbox.Group
        width="md"
        name="roles"
        layout="horizontal"
        label="配置角色"
        options={checkboxValues}
      />
    </DrawerForm>
  )
}

export default DetailDrawer
