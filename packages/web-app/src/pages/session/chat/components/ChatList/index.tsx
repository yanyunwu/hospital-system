import React, { useEffect, useRef } from 'react';
import { Input, Avatar, Popover } from 'antd';
import { useBoolean, useUpdateEffect } from 'ahooks';
import emojiData from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { SmileOutlined, UserOutlined } from '@ant-design/icons';
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

  const [show, showAction] = useBoolean()

  const dom = useRef<HTMLDivElement>()
  useUpdateEffect(() => {
    if (dom.current) {
      dom.current.scrollTop = dom.current?.scrollHeight
      dom.current.style.scrollBehavior = 'smooth'
    }
  }, [props.messageList])

  function renderMessage(item: any) {
    if (item.speakUserType === 1) {
      return (
        <div className="chat_message_item chat_message_self">
          <Avatar size="large" style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
          <div style={{flex: 1, overflow:'hidden'}}>
            <div>{item.speakUserName}</div>
            <div style={{display: 'flex'}}>
              <p className="chat_message_text">
                {item.content}
              </p>
            </div>
          </div>
        </div>
      )
    } else if (item.speakUserType === 0) {
      return (
        <div className="chat_message_item chat_message_other">
          <Avatar size="large" style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
          <div>
            <div>{item.speakUserName}</div>
            <div style={{display: 'flex'}}>
              <p className="chat_message_text">
                {item.content}
              </p>
            </div>
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
      <div className='chat_send_tool'>
        <Popover
          arrow={false}
          overlayInnerStyle={{padding: 0}}
          open={show}
          content={
            <Picker
              data={emojiData}
              onEmojiSelect={(_: any) => {
                props.onChangeText(props.waitText + _.native)
                showAction.setFalse()
              }}
            />
          }
          trigger='click'
          onOpenChange={showAction.toggle}
        >
          <SmileOutlined style={{fontSize: '20px'}} />
        </Popover>
      </div>
			<Input.TextArea
        disabled={props.disabled}
        value={props.waitText}
        onChange={(t) => props.onChangeText(t.target.value)}
        style={{height: 160, resize: 'none'}}
        placeholder='回车键(Enter)也可以回复！'
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
