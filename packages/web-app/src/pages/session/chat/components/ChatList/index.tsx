import React, { useEffect, useRef } from 'react';
import { Input, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import type { TableListItem } from '../../type';
import './ChatList.less'

export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
} & Partial<TableListItem>;

export type ChatListProps = {
  waitText: string;
  onChangeText: (text: string) => void
  messageList: any[]
  onSend: () => void

  onCancel?: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit?: (values: FormValueType) => Promise<void>;
  updateModalVisible?: boolean;
  values?: Partial<TableListItem>;
  disabled?: boolean
};

const ChatList: React.FC<ChatListProps> = (props) => {

  const dom = useRef<HTMLDivElement>()
  useEffect(() => {
    if (dom.current) {
      dom.current.scrollTop = dom.current?.scrollHeight
      dom.current.style.scrollBehavior = 'smooth '
    }
  }, [props.messageList])

  function renderMessage(item: any) {
    if (item.speakUserType === 1) {
      return (
        <div className="chat_message_item chat_message_self">
           <Avatar size="large" style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
          <div>
            <div>{item.speakUserName}</div>
            <div className="chat_message_text"><span>{item.content}</span></div>
          </div>
        </div>
      )
    } else if (item.speakUserType === 0) {
      return (
        <div className="chat_message_item chat_message_other">
           <Avatar size="large" style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
          <div>
            <div>{item.speakUserName}</div>
            <div className="chat_message_text"><span>{item.content}</span></div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="message_system">
          <div>
            {item.content}
          </div>
        </div>
      )
    }
  }


  return (
    <div className="container">
		<div className="chat_message_list">
      {/* @ts-ignore */}
			<div ref={dom} className="scroll-view" style={{height: '100%'}} >
				<div className="official-content">
          {
            props.messageList.map(item => <React.Fragment key={item.id}>{renderMessage(item)}</React.Fragment>)
          }
				</div>
			</div>
		</div>

		<div className="chat_send" >
			<Input.TextArea
        disabled={props.disabled}
        value={props.waitText}
        onChange={(t) => props.onChangeText(t.target.value)}
        style={{height: '100%', resize: 'none'}}
        placeholder='回车键(Enter)也可以恢复！'
        onKeyDown={(e) => {
          if (e.key.toLowerCase() === 'enter') {
            props.onSend()
          }
        }}
      />
		</div>
	</div>
  )
};

export default ChatList;
