import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { useBoolean } from 'ahooks'
import { Upload, Image, Popover, Button } from 'antd'
import { useRef, useState } from 'react'

const __UPLOAD_FILE_URL__ = `${__BASE_URL__}/api/file/upload`


export interface FileUploadProps {
  value?: string
  onChange?(value: string): void
}

export default function FileUpload({value, onChange}: FileUploadProps) {

  const [loading, setLoading] = useState(!value)
  const [openFileDialogOnClick, openFileDialogOnClickAction] = useBoolean(false)

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
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

  return (
    <Upload<{ data: string }>
      openFileDialogOnClick={openFileDialogOnClick}
      showUploadList={false}
      action={__UPLOAD_FILE_URL__}
      listType='picture-circle'
      onChange={({file}) => {
        if (file.status === 'uploading') {
          setLoading(true)
          return
        }
        if (file.status === 'done') {
          setLoading(false)
        }
        if (file.response) {
          const url = file.response.data
          onChange?.(url)
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
