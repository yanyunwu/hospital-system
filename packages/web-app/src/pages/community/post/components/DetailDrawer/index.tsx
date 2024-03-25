import React, {  cloneElement } from 'react'
import { Button, Drawer, Flex, Popconfirm, Space, Tabs} from 'antd'
import { useBoolean } from 'ahooks'
import type { TabsProps } from 'antd'
import CommentDetail from './components/CommentDetail'
import { TableListItem } from '../../type'
import { useGlobalContext } from '@/templates/CommonTemplate'
import { handleRemove } from '../../service'
import DataAnalysis from './components/DataAnalysis'
import BaseInfo from './components/BaseInfo'

export interface DetailDrawerProps {
  onTrigger?(): void
  trigger?: React.ReactElement
}

const DetailDrawer: React.FC<DetailDrawerProps> = (props) => {
  const [show, showAction] = useBoolean()
  const { currentRow, event$ } = useGlobalContext<TableListItem>()

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: '基本信息',
      children: <BaseInfo />,
    },
    {
      key: '2',
      label: '评论详情',
      children: currentRow && <CommentDetail record={currentRow} />,
    },
    {
      key: '3',
      label: '数据分析',
      children: <DataAnalysis />
    },
  ]

  return (
    <>
      {props.trigger && cloneElement(props.trigger, {
        onClick() {
          props.trigger?.props.onClick?.()
          showAction.setTrue()
        }
      })}
      <Drawer
        title='查看帖子的基本信息'
        open={show}
        onClose={showAction.setFalse}
        width='800px'
        bodyStyle={{paddingTop: 0}}
        destroyOnClose
        extra={(
          <Popconfirm
            title="确定要进行操作吗？"
            onConfirm={async () => {
              if (currentRow && (await handleRemove(currentRow))) {
                event$.emit('reloadAndRest')
              }
            }}
            okText="确定"
            cancelText="取消"
          >
            <Button type='primary' danger >
              删除
            </Button>
          </Popconfirm>
        )}
        footer={(
          <Flex justify='flex-end'>
            <Space>
              <Button onClick={showAction.setFalse}>
                关闭弹窗
              </Button>
            </Space>
          </Flex>
        )}
      >
        <Tabs defaultActiveKey="1" items={items} />
      </Drawer>
    </>
  )
}

export default DetailDrawer
