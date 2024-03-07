import { useMemo, useRef } from 'react'
import useColumns from './useColumns'
import { get } from './request'
import { TableListItem } from '../type'
import { ActionRefType, CommonTemplateProps } from '@/templates/CommonTemplate'
import { handleRemove } from '../service'

export const useConfig = () => {
  const actionRef = useRef<ActionRefType>()
  const columns = useColumns()
  return useMemo<CommonTemplateProps<TableListItem>>(() => ({
    ref: actionRef,
    rowKey: 'key',
    request: get,
    columns: columns,
    onMultipleMove: async (items) => {
      await handleRemove(items)
    }
  }), [])
}
