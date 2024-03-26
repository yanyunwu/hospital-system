import { PlusOutlined } from '@ant-design/icons'
import { Button, message, Input, Drawer, Popconfirm } from 'antd'
import React, { useState, useRef } from 'react'
import { PageContainer, FooterToolbar } from '@ant-design/pro-components'
import type { ProColumns, ActionType } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import { ModalForm, ProFormText, ProFormSwitch } from '@ant-design/pro-form'
import type { ProDescriptionsItemProps } from '@ant-design/pro-components'
import {ProDescriptions} from '@ant-design/pro-components'
import type { FormValueType } from './components/UpdateForm'
import { role, addRole, setRole, delRole } from './service'
import type { TableListItem, TableListPagination } from './data'
/**
 * 添加节点
 *
 * @param fields
 */

const handleAdd = async (fields: TableListItem) => {
  const hide = message.loading('正在添加')

  try {
    await addRole({ ...fields })
    hide()
    message.success('添加成功')
    return true
  } catch (error) {
    hide()
    message.error('添加失败请重试！')
    return false
  }
}
/**
 * 更新节点
 *
 * @param fields
 */

const handleUpdate = async (fields: FormValueType, currentRow?: TableListItem) => {
  const hide = message.loading('正在配置')

  try {
    await setRole({
      ...currentRow,
      ...fields,
    })
    hide()
    message.success('配置成功')
    return true
  } catch (error) {
    hide()
    message.error('配置失败请重试！')
    return false
  }
}
/**
 * 删除节点
 *
 * @param selectedRows
 */

const handleRemove = async (selectedRows: TableListItem[]) => {
  const hide = message.loading('正在删除')
  if (!selectedRows) return true

  try {
    await delRole({
      ids: selectedRows.map((row) => row.id),
    })
    hide()
    message.success('删除成功，即将刷新')
    return true
  } catch (error) {
    hide()
    message.error('删除失败，请重试')
    return false
  }
}

const TableList: React.FC = () => {
  /** 新建窗口的弹窗 */
  const [createModalVisible, handleModalVisible] = useState<boolean>(false)
  /** 分布更新窗口的弹窗 */

  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false)
  const [showDetail, setShowDetail] = useState<boolean>(false)
  const actionRef = useRef<ActionType>()
  const [currentRow, setCurrentRow] = useState<TableListItem>()
  const [selectedRowsState, setSelectedRows] = useState<TableListItem[]>([])
  /** 国际化配置 */

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '标识符',
      dataIndex: 'identification',
      valueType: 'text',
    },
    {
      title: '菜单名称',
      dataIndex: 'name',
      valueType: 'text',
    },
    {
      title: '菜单路径',
      dataIndex: 'path',
      valueType: 'text',
    },
    {
      title: '当前状态',
      dataIndex: 'status',
      hideInForm: true,
      valueEnum: {
        true: {
          text: '开启',
          status: 'Success',
        },
        false: {
          text: '禁用',
          status: 'Error',
        },
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      renderFormItem: (item, { defaultRender, ...rest }, form) => {
        const status = form.getFieldValue('status')

        if (`${status}` === '0') {
          return false
        }

        if (`${status}` === '3') {
          return <Input {...rest} placeholder="请输入异常原因！" />
        }

        return defaultRender(item)
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
            handleUpdateModalVisible(true)
            setCurrentRow(record)
          }}
        >
          配置
        </a>,
        <Popconfirm
          key="subscribeAlert"
          title="确定要进行删除操作吗？"
          onConfirm={async () => {
            await handleRemove([record])
            setSelectedRows([])
            actionRef.current?.reloadAndRest?.()
          }}
          okText="确定"
          cancelText="取消"
        >
          <a>删除</a>
        </Popconfirm>,
      ],
    },
  ]

  return (
    (<PageContainer>
      <ProTable<TableListItem, TableListPagination>
        headerTitle="菜单列表"
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalVisible(true)
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={role}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows)
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
              await handleRemove(selectedRowsState)
              setSelectedRows([])
              actionRef.current?.reloadAndRest?.()
            }}
            okText="确定"
            cancelText="取消"
          >
            <Button>批量删除</Button>
          </Popconfirm>
        </FooterToolbar>
      )}
      <ModalForm
        title="新建菜单"
        width="400px"
        visible={createModalVisible}
        initialValues={{ status: true }}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          const success = await handleAdd(value as TableListItem)
          if (success) {
            handleModalVisible(false)
            if (actionRef.current) {
              actionRef.current.reload()
            }
          }
        }}
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
      </ModalForm>
      <ModalForm
        title="修改菜单"
        width="400px"
        initialValues={{ ...currentRow }}
        visible={updateModalVisible}
        onVisibleChange={handleUpdateModalVisible}
        onFinish={async (value) => {
          const success = await handleUpdate(value, currentRow)

          if (success) {
            handleUpdateModalVisible(false)
            setCurrentRow(undefined)

            if (actionRef.current) {
              actionRef.current.reload()
            }
          }
        }}
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
      </ModalForm>
      <Drawer
        width={600}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined)
          setShowDetail(false)
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
  )
}

export default TableList
