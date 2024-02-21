import { useEventEmitter } from 'ahooks';
import CommonTemplate, {
  CommonTemplateProvider,
  useGlobalContext
} from '@/templates/CommonTemplate'
import { useConfig } from './config';
import type { TableListItem } from './type';

const Page = () => {
  const {
    event$
  } = useGlobalContext<TableListItem>()
  const config = useConfig()
  const actionRef = config.ref!

  event$.useSubscription((param: string) => {
    actionRef.current?.[param]?.()
  })

  return (
    <CommonTemplate<TableListItem>
      {...config}
    />
  );
};

export default () => {
  const event$ = useEventEmitter()
  return (
    <CommonTemplateProvider value={{event$}}>
      <Page />
    </CommonTemplateProvider>
  )
}
