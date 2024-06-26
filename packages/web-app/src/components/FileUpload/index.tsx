import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { useBoolean } from 'ahooks'
import { Upload, Image, Popover, Button } from 'antd'
import { useRef, useState } from 'react'

const __UPLOAD_FILE_URL__ = `${__FILE_BASE_URL__}/api/file/upload`


export interface FileUploadProps {
  value?: string
  onChange?(value: string): void
}

export default function FileUpload({value, onChange}: FileUploadProps) {

  const [loading, setLoading] = useState(false)
  const [openFileDialogOnClick, openFileDialogOnClickAction] = useBoolean(!value)

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>点击上传</div>
    </button>
  )

  const reUpload = (
    <Button onClick={(e) => {
      openFileDialogOnClickAction.toggle()
      if (openFileDialogOnClick) {
        e.stopPropagation()
      }
    }}>
      {openFileDialogOnClick ? '进入预览模式' : '重新上传' }
    </Button>
  )

  const divRef = useRef<HTMLDivElement>()
  const access_token = localStorage.getItem('token')
  return (
    <Upload<{ data: { url: string} }>
      openFileDialogOnClick={openFileDialogOnClick}
      showUploadList={false}
      action={__UPLOAD_FILE_URL__}
      listType='picture-circle'
      headers={{
        authorization: `Bearer ${access_token}`
      }}
      onChange={({file}) => {
        if (file.status === 'uploading') {
          setLoading(true)
          return
        }
        if (file.status === 'done') {
          setLoading(false)
        }
        if (file.response) {
          const url = file.response.data.url
          onChange?.(`${__FILE_BASE_URL__}${url}`)
        }
      }}
    >
      <div ref={divRef} className='w-full h-full overflow-hidden flex justify-center items-center rounded-full'>
        <Popover content={reUpload} placement='right' title='操作'>
          {value
            ? <Image
              width='100%'
              src={value}
              alt='avatar'
              preview={!openFileDialogOnClick}
            />
            : uploadButton}
        </Popover>
      </div>
    </Upload>
  )
}
