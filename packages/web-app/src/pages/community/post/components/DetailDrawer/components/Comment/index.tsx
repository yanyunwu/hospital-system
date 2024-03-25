import { UserOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'

export interface CommentProps {
  avatarUrl?: string
  name?: string
  time?: string
  content?: string
}

export default function Comment(props: CommentProps) {
  const renderTitle = () => {
    return (
      <div className='flex-1'>
        <span className='text-lg'>
          {props.name}
        </span>
        <span className='text-gray-500 pl-2 text-xs'>
          {props.time}
        </span>
      </div>
    )
  }

  return (
    <div>
      <div className='flex items-center h-[50px]'>
        <div className='w-[40px] h-[40px]'>
          <Avatar size='large' icon={<UserOutlined />}  />
        </div>
        <div className='flex flex-col pl-2 h-full'>
          {renderTitle()}
          <div className='flex-1'>

          </div>
        </div>
      </div>
      <div className='pl-[50px]'>
        {props.content}
      </div>
    </div>
  )
}
