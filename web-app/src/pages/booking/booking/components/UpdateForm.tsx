import React, { useRef, useState } from 'react';
import { Button, Input, Modal, Popconfirm, message } from 'antd';
import {
  ProFormText,
  StepsForm,
  ProFormCheckbox,
  ProFormTextArea,
  ProFormSwitch,
  ModalForm,
  ProFormDatePicker,
  ProFormDigit,
} from '@ant-design/pro-form';
import type { DateTableListItem, TableListItem, TableListPagination } from '../data';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { PlusOutlined } from '@ant-design/icons';
import { add2, get2, del2, set2 } from '../service';

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

const handleAdd = async (fields: DateTableListItem) => {
  const hide = message.loading('正在添加');

  try {
    await add2({ ...fields });
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

const handleUpdate = async (fields: FormValueType, currentRow?: DateTableListItem) => {
  const hide = message.loading('正在配置');

  try {
    await set2({
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

const handleRemove = async (selectedRows: DateTableListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;

  try {
    await del2({
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

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  /** 新建窗口的弹窗 */
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  /** 分布更新窗口的弹窗 */

  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<DateTableListItem>();
  const [selectedRowsState, setSelectedRows] = useState<DateTableListItem[]>([]);
  const columns: ProColumns<DateTableListItem>[] = [
    {
      title: '预约日期',
      dataIndex: 'date',
      valueType: 'date',
    },
    {
      title: '最大预约数',
      dataIndex: 'count',
      valueType: 'text',
    },
    {
      title: '已经预约数',
      dataIndex: 'bookingDateRecords',
      render(dom, item) {
        return item.bookingDateRecords?.length || 0;
      },
    },
    {
      title: '剩余预约数',
      dataIndex: 'bookingDateRecords2',
      render(dom, item) {
        return item.count - (item.bookingDateRecords?.length || 0);
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
            setCurrentRow(record);
            handleUpdateModalVisible(true);
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
    <StepsForm
      stepsProps={{
        size: 'small',
      }}
      stepsFormRender={(dom, submitter) => {
        return (
          <Modal
            width="80%"
            destroyOnClose
            title="预约配置"
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
        initialValues={{
          title: props.values.title,
          intro: props.values.intro,
          status: props.values.status,
        }}
        title="基本信息"
      >
        <ProFormText
          label="预约名称"
          rules={[
            {
              required: true,
              message: '必填项',
            },
          ]}
          width="md"
          name="title"
        />

        <ProFormTextArea
          label="预约介绍"
          rules={[
            {
              required: true,
              message: '必填项',
            },
          ]}
          width="md"
          name="intro"
        />
        <ProFormSwitch
          label="是否开启预约"
          rules={[
            {
              required: true,
              message: '必填项',
            },
          ]}
          width="md"
          name="status"
        />
      </StepsForm.StepForm>
      <StepsForm.StepForm title="配置预约日期">
        <ProTable<DateTableListItem, TableListPagination>
          headerTitle="预约日期管理"
          actionRef={actionRef}
          rowKey="key"
          search={false}
          toolBarRender={() => [
            <Button
              type="primary"
              key="primary"
              onClick={() => {
                handleModalVisible(true);
              }}
            >
              <PlusOutlined /> 新建
            </Button>,
          ]}
          request={(params, opts) => get2({ ...params, bookingId: props.values.id }, opts)}
          columns={columns}
        />
        <ModalForm
          title="新建预约日期"
          width="600px"
          visible={createModalVisible}
          onVisibleChange={handleModalVisible}
          onFinish={async (value) => {
            const success = await handleAdd({
              ...value,
              bookingId: props.values.id,
            } as unknown as DateTableListItem);
            if (success) {
              handleModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
        >
          <ProFormDatePicker
            label="预约日期"
            rules={[
              {
                required: true,
                message: '必填项',
              },
            ]}
            width="md"
            name="date"
          />

          <ProFormDigit
            label="最大预约数"
            rules={[
              {
                required: true,
                message: '必填项',
              },
            ]}
            width="md"
            name="count"
          />
        </ModalForm>

        <ModalForm
          title="修改预约日期"
          width="600px"
          visible={updateModalVisible}
          modalProps={{
            destroyOnClose: true,
          }}
          initialValues={currentRow}
          onVisibleChange={(value) => {
            handleUpdateModalVisible(value);
            if (!value) {
              setCurrentRow(undefined);
            }
          }}
          onFinish={async (value) => {
            const success = await handleUpdate(value, currentRow);
            if (success) {
              handleUpdateModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
        >
          <ProFormDatePicker
            label="预约日期"
            rules={[
              {
                required: true,
                message: '必填项',
              },
            ]}
            width="md"
            name="date"
          />

          <ProFormDigit
            label="最大预约数"
            rules={[
              {
                required: true,
                message: '必填项',
              },
            ]}
            width="md"
            name="count"
          />
        </ModalForm>
      </StepsForm.StepForm>
    </StepsForm>
  );
};

export default UpdateForm;
