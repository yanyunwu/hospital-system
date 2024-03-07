import { GithubOutlined } from '@ant-design/icons'
import { DefaultFooter } from '@ant-design/pro-layout'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()
  return (
    <DefaultFooter
      copyright={`${currentYear} 华中农业大学公共管理学院信管`}
      links={[
        {
          key: 'HZAU',
          title: 'HZAU',
          href: 'https://www.hzau.edu.cn/',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://www.hzau.edu.cn/',
          blankTarget: true,
        },
      ]}
    />
  )
}

export default Footer
