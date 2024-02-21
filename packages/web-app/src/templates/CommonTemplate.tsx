import React, {
  useRef,
  useState,
  useImperativeHandle,
  ForwardedRef,
  MutableRefObject,
  createContext,
  useContext
} from "react";
import { Button, Popconfirm } from "antd";
import { PageContainer, FooterToolbar } from "@ant-design/pro-layout"
import ProTable, { ProTableProps } from "@ant-design/pro-table"
import type { ActionType } from '@ant-design/pro-table';

type TableListPagination = {
  total: number;
  pageSize: number;
  current: number;
}

type TableProps<T> = ProTableProps<T, TableListPagination>

export interface CommonTemplateProps<T> {
  /* table props */
  request?: TableProps<T>['request']
  columns?: TableProps<T>['columns']
  rowKey: string
  toolBarRender?: TableProps<T>['toolBarRender']

  /* 自定义 */
  onMultipleMove?(selectedRowsState: T[]): void | Promise<void>
  ref?: MutableRefObject<ActionRefType | undefined>
}

export interface ActionRefType {
  tableActionType?: ActionType
  reload?: ActionType['reload']
  reloadAndRest: ActionType['reloadAndRest']
  custom?: Record<string, any>
}

export interface CommonTemplateContextValue<T = any> {
  currentRow?: T
  setCurrentRow: React.Dispatch<React.SetStateAction<T | undefined>>
}

const CommonTemplateContext = createContext<CommonTemplateContextValue>(null!)

export const useGlobalContext = function<T = any, C = Record<string, any>>() {
  return (useContext(CommonTemplateContext) as CommonTemplateContextValue<T> & C)
}

function CommonTemplate<T extends Record<string, any>>(props: CommonTemplateProps<T>, ref: ForwardedRef<ActionRefType>) {
  const {
    request,
    columns,
    rowKey,
    toolBarRender,
    onMultipleMove,
  } = props

  const [currentRow, setCurrentRow] = useState<T>();
  const actionRef = useRef<ActionType>();

  useImperativeHandle(ref, () => ({
    tableActionType: actionRef.current,
    reload: actionRef.current?.reload,
    reloadAndRest: actionRef.current?.reloadAndRest,
    currentRow,
    setCurrentRow,
  }), [
    actionRef.current,
    currentRow,
  ])

  const [selectedRowsState, setSelectedRows] = useState<T[]>([]);

  return (
    <PageContainer>
      <ProTable<T, TableListPagination>
        actionRef={actionRef}
        request={request}
        columns={columns}
        rowKey={rowKey}
        toolBarRender={toolBarRender}
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
            title="确定要进行批量删除操作吗？"
            onConfirm={async () => {
              await onMultipleMove?.(selectedRowsState)
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
    </PageContainer>
  )
}

interface CommonTemplateProviderProps {
  value?: Record<string, any>
}

export function CommonTemplateProvider<T extends Record<string, any>>({children, value}: React.PropsWithChildren<CommonTemplateProviderProps>) {
  const [currentRow, setCurrentRow] = useState<CommonTemplateContextValue<T>>()
  return (
    <CommonTemplateContext.Provider value={{ currentRow, setCurrentRow, ...value}}>
      {children}
    </CommonTemplateContext.Provider>
  )
}

export default React.forwardRef(CommonTemplate) as typeof CommonTemplate
