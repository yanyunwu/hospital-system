import { Card } from 'antd'

interface SimpleDataCardProps {
  title?: string
  count?: number,
  suffix?: string
  subCount?: number
}


export default function SimpleDataCard(props: SimpleDataCardProps) {
  return (
    <Card>
      <div>{props.title}</div>
      <div className='text-4xl'>
        {props.count}
        {props.subCount != null && '/'}
        {props.subCount}
        <span className='text-2xl'>{props.suffix}</span></div>
    </Card>
  )
}
