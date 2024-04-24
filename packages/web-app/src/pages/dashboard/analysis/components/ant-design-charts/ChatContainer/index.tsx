import React from 'react'
import { Card, Spin } from 'antd'
import styles from './styles.less'
import { LoadingOutlined } from '@ant-design/icons'

export interface ChatContainerProps {
  loading?: boolean,
  title?: string
}

export default function({ title, children, loading = false }: React.PropsWithChildren<ChatContainerProps>) {
  return (
    <Card
      title={title}
    >
      {loading
        ? <div className={styles.loading}><Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} /></div>
        : children
      }
    </Card>
  )
}
