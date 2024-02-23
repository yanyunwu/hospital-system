import React, { useEffect, useRef, useState, cloneElement } from 'react'
import { useBoolean, useRequest } from 'ahooks';
import { TableListItem } from '../type';
import { useGlobalContext } from '@/templates/CommonTemplate';
import { Button, Drawer, Flex, Popconfirm, Space, message } from 'antd';
import ChatList from './ChatList';
import { Socket, io } from 'socket.io-client';
import { getSessionMessageList, setSessionStatus } from '@/services/hospital-app';

export interface DetailDrawerProps {
  onTrigger?(): void
  trigger?: React.ReactElement
}

const DetailDrawer: React.FC<DetailDrawerProps> = (props) => {
  const { currentRow, event$ } = useGlobalContext<TableListItem>()
  const [show, showAction] = useBoolean()
  const [waitText, setWaitText] = useState('');
  const [messageList, setMessageList] = useState([]);
  const { data } = useRequest(() => {
    if (currentRow?.id) {
      return getSessionMessageList(currentRow.id)
    } else {
      return {
        data: []
      }
    }
  }, {
    refreshDeps: [currentRow?.id]
  })
  const socketRef = useRef<Socket>()

  useEffect(() => {
    const token = localStorage.getItem('token');
    const socket = io(__SOCKET_BASE_URL__, {
      query: { token },
      transports: ['websocket', 'polling'],
      timeout: 5000,
    });
    socketRef.current = socket
    socket.on('connect', () => {
      console.log('连接上了');
    });
    socket.on('error', () => {
      message.error('服务器连接失败, 请重试！')
    })
    return () => {
      socket?.close();
    };
  }, []);

  useEffect(() => {
    socketRef.current?.on('message', (message) => {
      if (message.liveChat.id !== currentRow?.id) {
        return;
      }
      setMessageList([
        // @ts-ignore
        ...messageList,
        // @ts-ignore
        message,
      ]);
    });
    socketRef.current?.on('message_ok', (message) => {
      console.log('message_ok', message, currentRow);
      if (message.liveChat.id !== currentRow?.id) {
        return;
      }

      setMessageList([
        // @ts-ignore
        ...messageList,
        // @ts-ignore
        message,
      ]);
    });
    return () => {
      socketRef.current?.removeAllListeners()
    };
  }, [socketRef.current, messageList, currentRow?.id]);

  const handleSendMessage = () => {
    if (!waitText) {
      return;
    }

    socketRef.current?.send({
      text: waitText,
      openId: currentRow?.user.openId,
      sessionId: currentRow?.id,
    });

    setWaitText('');
  };

  return (
    <>
      {props.trigger && cloneElement(props.trigger, {
        onClick() {
          props.trigger?.props.onClick()
          showAction.setTrue()
        }
      })}
      <Drawer
        title={`与${currentRow?.user.nickname}的对话`}
        open={show}
        onClose={showAction.setFalse}
        width='800px'
        extra={(
          <Popconfirm
            title="确定要进行操作吗？"
            onConfirm={async () => {
              if (currentRow?.status === 1) {
                await setSessionStatus(currentRow.id, 2);
                showAction.setFalse()
                event$.emit('reloadAndRest')
              } else if (currentRow?.status === 2) {
                showAction.setFalse()
                await setSessionStatus(currentRow.id, 1);
                event$.emit('reloadAndRest')
              } else {
                message.info('该会话还未被回复！');
              }
            }}
            okText="确定"
            cancelText="取消"
          >
            <Button type='primary' danger={currentRow?.status === 1}>
              {currentRow?.status === 2 ? '开启会话' : '关闭会话'}
            </Button>
          </Popconfirm>
        )}
        footer={(
          <Flex justify='flex-end'>
            <Space>
              <Button onClick={showAction.setFalse}>
                关闭弹窗
              </Button>
              <Button type='primary' onClick={handleSendMessage}>
                回复
              </Button>
            </Space>
          </Flex>
        )}
      >
        <ChatList
          disabled={currentRow?.status === 2}
          waitText={waitText}
          onChangeText={(text: string) => setWaitText(text)}
          messageList={[...(data?.data || []), ...messageList]}
          onSend={handleSendMessage}
        />
      </Drawer>
    </>
  )
}

export default DetailDrawer
