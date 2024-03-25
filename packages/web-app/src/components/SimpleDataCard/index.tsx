import { Card } from 'antd'

interface SimpleDataCardProps {
  title?: string
  count?: number
}


export default function SimpleDataCard(props: SimpleDataCardProps) {
  return (
    <Card>
      <div>{props.title}</div>
      <div className=' text-5xl'>{props.count}</div>
    </Card>
  )
}
