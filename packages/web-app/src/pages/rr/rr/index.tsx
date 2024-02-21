import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Input, Drawer, Popconfirm, Image } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormRadio, ProFormDatePicker, ProFormDateTimePicker } from '@ant-design/pro-form';
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
      title: '申请用户',
      dataIndex: 'username',
      render(dom, item) {
        return item.user.nickname
      }
    },
    {
      title: '姓名',
      dataIndex: 'name',
      valueType: 'text',
    },
    {
      title: '学号',
      dataIndex: 'stuId',
      valueType: 'text',
    },
    {
      title: '性别',
      dataIndex: 'sex',
      valueEnum: {
        0: {
          text: '男'
        },
        1: {
          text: '女'
        },
      }
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      valueType: 'text',
    },
    // 0已提交/审核中 1审核成功 2审核失败 3已完成报销/已到款
    {
      title: '当前状态',
      dataIndex: 'status',
      valueEnum: {
        0: {
          text: '已提交/审核中',
          key: '0',
        },
        1: {
          text: '审核成功',
          key: '1',
        },
        2: {
          text: '审核失败',
          key: '2',
        },
        3: {
          text: '已完成报销/已到款',
          key: '3',
        },
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
          详情
        </a>,
        <a onClick={() => {
          handleModalVisible(true);
          setCurrentRow(record);
        }}>审批</a>,
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
    (<PageContainer>
      <ProTable<TableListItem, TableListPagination>
        headerTitle="报销审核"
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
        title="详情"
        width="50%"
        disabled
        modalProps={{
          'destroyOnClose': true
        }}
        visible={updateModalVisible}
        initialValues={{...currentRow}}
        onVisibleChange={handleUpdateModalVisible}
        onFinish={async (value) => {
          const success = await handleAdd(value as TableListItem);
          if (success) {
            handleUpdateModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
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

        <ProFormText
          label="备注"
          width="md"
          name="remark"
        />
        <div style={{ margin: '10px 0' }}>附带图片：</div>
        <Image.PreviewGroup>
          {(currentRow?.picture as string[])?.map((item) => {
            return <Image key={item} width="33%" src={item} />;
          })}
        </Image.PreviewGroup>
      </ModalForm>
      <ModalForm
        title="审批"
        width="600px"
        initialValues={{ status: currentRow?.status }}
        modalProps={{
          destroyOnClose: true,
        }}
        // initialValues={{ status: currentRow?.status }}
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          const success = await handleUpdate(value, currentRow);

          if (success) {
            handleModalVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
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
      <Drawer
        width={600}
        open={showDetail}
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
    </PageContainer>)
  );
};

export default TableList;
