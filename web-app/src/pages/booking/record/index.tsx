import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Input, Drawer, Popconfirm } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormRadio, ProFormDatePicker } from '@ant-design/pro-form';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import type { FormValueType } from './components/UpdateForm';
import { get, add, set, del } from './service';
import type { TableListItem, TableListPagination } from './data';
/**
 * 添加节点
 *
 * @param fields
 */

const handleAdd = async (fields: TableListItem) => {
  const hide = message.loading('正在添加');

  try {
    await add({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};
/**
 * 更新节点
 *
 * @param fields
 */

const handleUpdate = async (fields: FormValueType, currentRow?: TableListItem) => {
  const hide = message.loading('正在配置');

  try {
    await set({
      ...currentRow,
      ...fields,
    });
    hide();
    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};
/**
 * 删除节点
 *
 * @param selectedRows
 */

const handleRemove = async (selectedRows: TableListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;

  try {
    await del({
      ids: selectedRows.map((row) => row.id),
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const TableList: React.FC = () => {
  /** 新建窗口的弹窗 */
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  /** 分布更新窗口的弹窗 */

  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<TableListItem>();
  const [selectedRowsState, setSelectedRows] = useState<TableListItem[]>([]);
  /** 国际化配置 */

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '预约名',
      dataIndex: 'bookingDate',
      render(dom, item) {
        return item.bookingDate.booking.title;
      },
    },
    {
      title: '预约日期',
      dataIndex: 'bookingDate',
      render(dom, item) {
        return item.bookingDate.date;
      },
    },
    {
      title: '姓名/昵称',
      dataIndex: 'user',
      render(dom, item) {
        return item.user.nickname;
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      renderFormItem: (item, { defaultRender, ...rest }, form) => {
        const status = form.getFieldValue('status');

        if (`${status}` === '0') {
          return false;
        }

        if (`${status}` === '3') {
          return <Input {...rest} placeholder="请输入异常原因！" />;
        }

        return defaultRender(item);
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            handleUpdateModalVisible(true);
            setCurrentRow(record);
          }}
        >
          配置
        </a>,
        <Popconfirm
          key="subscribeAlert"
          title="确定要进行删除操作吗？"
          onConfirm={async () => {
            await handleRemove([record]);
            setSelectedRows([]);
            actionRef.current?.reloadAndRest?.();
          }}
          okText="确定"
          cancelText="取消"
        >
          <a>删除</a>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<TableListItem, TableListPagination>
        headerTitle="用户信息管理"
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        request={get}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择{' '}
              <a
                style={{
                  fontWeight: 600,
                }}
              >
                {selectedRowsState.length}
              </a>{' '}
              项 &nbsp;&nbsp;
            </div>
          }
        >
          <Popconfirm
            title="确定要进行删除操作吗？"
            onConfirm={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
            okText="确定"
            cancelText="取消"
          >
            <Button>批量删除</Button>
          </Popconfirm>
        </FooterToolbar>
      )}
      <ModalForm
        title="新建用户"
        width="400px"
        visible={createModalVisible}
        initialValues={{ sex: 2 }}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          const success = await handleAdd(value as TableListItem);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
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
        <ProFormText label="学号" width="md" name="stuId" />
      </ModalForm>
      <ModalForm
        title="修改信息"
        width="400px"
        initialValues={{ ...currentRow }}
        visible={updateModalVisible}
        onVisibleChange={handleUpdateModalVisible}
        onFinish={async (value) => {
          const success = await handleUpdate(value, currentRow);

          if (success) {
            handleUpdateModalVisible(false);
            setCurrentRow(undefined);

            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
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
        <ProFormText label="学号" width="md" name="stuId" />
      </ModalForm>
      <Drawer
        width={600}
        visible={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.name && (
          <ProDescriptions<TableListItem>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns as ProDescriptionsItemProps<TableListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
