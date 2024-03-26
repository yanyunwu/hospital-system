import { ProLayoutProps } from '@ant-design/pro-components'
import AvatarDropdown from './components/AvatarDropdown'
import { Input, theme} from 'antd'
import { GithubFilled, InfoCircleFilled, QuestionCircleFilled, SearchOutlined } from '@ant-design/icons'

const SearchInput = () => {
  const { token } = theme.useToken()
  return (
    <div
      key="SearchOutlined"
      aria-hidden
      style={{
        display: 'flex',
        alignItems: 'center',
        marginInlineEnd: 24,
      }}
      onMouseDown={(e) => {
        e.stopPropagation()
        e.preventDefault()
      }}
    >
      <Input
        style={{
          borderRadius: 4,
          marginInlineEnd: 12,
          backgroundColor: token.colorBgTextHover,
        }}
        prefix={
          <SearchOutlined
            style={{
              color: token.colorTextLightSolid,
            }}
          />
        }
        placeholder="搜索"
        variant="borderless"
      />
    </div>
  )
}


export default {
  avatarProps: {
    render: () => {
      return (
        <AvatarDropdown />
      )
    },
  },
  actionsRender: (props) => {
    if (props.isMobile) return []
    if (typeof window === 'undefined') return []
    return [
      props.layout !== 'side' && document.body.clientWidth > 1400 ? (
        <SearchInput />
      ) : undefined,
      <InfoCircleFilled key="InfoCircleFilled" />,
      <QuestionCircleFilled key="QuestionCircleFilled" />,
      <GithubFilled key="GithubFilled" />,
    ]
  },
  menuFooterRender: (props) => {
    if (props?.collapsed) return undefined
    return (
      <div
        style={{
          textAlign: 'center',
          paddingBlockStart: 12,
        }}
      >
        <div>HZAU</div>
      </div>
    )
  }
} as ProLayoutProps
