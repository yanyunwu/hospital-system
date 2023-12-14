
import { Button, message, Input, Drawer, Popconfirm, Modal } from 'antd';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import type { FormValueType } from './components/ChatList';
import { get, add, set, del } from './service';
import type { TableListItem, TableListPagination } from './data';
import ChatList from './components/ChatList';
import { Socket, io } from 'socket.io-client'


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

  const [waitText, setWaitText] = useState('')
  const [messageList, setMessageList] = useState([
    {
      type: 'self',
      text: "hello"
    },
    {
      type: 'other',
      text: "hello"
    }
  ])
  /** 国际化配置 */

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '昵称/姓名',
      dataIndex: 'user',
      render(dom, item) {
        return item.user?.nickname
      }
    },
    {
      title: '当前状态',
      dataIndex: 'status',
      hideInForm: true,
      valueEnum: {
        0: {
          text: '等待回复',
          status: 'Success',
        },
        1: {
          text: '回复中',
          status: 'Success',
        },
        2: {
          text: '关闭',
          status: 'Error',
        },
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      sorter:  (a, b) => Date.parse(a.createTime) - Date.parse(b.createTime),
      sortOrder: 'descend'
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
          回复
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
          <a>关闭</a>
        </Popconfirm>,
      ],
    },
  ];
  const [socket, setSocket] = useState<Socket | null>(null)

  const handleSendMessage = () => {
    if (!waitText) {
      return 
    }

    socket?.send({
      text: waitText,
      openId: currentRow?.user.openId,
      sessionId: currentRow?.id
    })

    setMessageList([
      ...messageList,
        {
          type: 'self',             
          text: waitText
        }
    ])

    setWaitText('')
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    const socket = io("ws://localhost:3000", {
      query: {token},
      transports: [ 'websocket', 'polling' ],
      timeout: 5000,
    })

    setSocket(socket)

    socket.on('connect', () => {
      console.log('连接上了')
    })
    return () => {
      socket?.close()
    }
  }, [])

  useEffect(() => {
    socket?.on('message', (message) => {
      if (message.sessionId !== currentRow?.id){
        return 
      }

      setMessageList([
        ...messageList,
          {
            type: 'other',
            text: message.text
          }
      ])
    })
    return () => {
      socket?.removeListener('message')
    }
  }, [socket, messageList])

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
      <Modal 
        title="对话框" 
        open={updateModalVisible} 
        onCancel={() => handleUpdateModalVisible(false)} 
        cancelText="关闭弹窗"
        okText="发送"
        width="80%"
        onOk={handleSendMessage}
      >
        <ChatList 
          waitText={waitText}  
          onChangeText={(text: string) => setWaitText(text)}
          messageList={messageList}
          onSend={handleSendMessage}
          ></ChatList>
      </Modal>
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
