import React, { useCallback } from 'react'
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Drawer, Menu, MenuProps, Spin } from 'antd'
import { history, useModel } from 'umi'
import { stringify } from 'querystring'
import HeaderDropdown from '../HeaderDropdown'
import styles from './index.less'
// import { outLogin } from '@/services/ant-design-pro/api';
import type { MenuInfo } from 'rc-menu/lib/interface'
import { useBoolean } from 'ahooks'
import AccountCenter from '@/pages/account/center'

export type GlobalHeaderRightProps = {
  menu?: boolean;
};

/**
 * 退出登录，并且将当前的 url 保存
 */
const loginOut = async () => {
  // await outLogin();
  localStorage.clear()
  const { query = {}, search, pathname } = history.location
  const { redirect } = query
  // Note: There may be security issues, please note
  if (window.location.pathname !== '/user/login' && !redirect) {
    history.replace({
      pathname: '/user/login',
      search: stringify({
        redirect: pathname + search,
      }),
    })
  }
}

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu }) => {
  const { initialState, setInitialState } = useModel('@@initialState')
  const [isOpen, open] = useBoolean()

  const onMenuClick = useCallback(
    (event: MenuInfo) => {
      const { key } = event
      if (key === 'logout') {
        setInitialState((s) => ({ ...s, currentUser: undefined }))
        loginOut()
        return
      }

      if (key === 'center') {
        open.setTrue()
        return
      }

      history.push(`/account/${key}`)
    },
    [setInitialState],
  )

  const loading = (
    <span className={`${styles.action} ${styles.account}`}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  )

  if (!initialState) {
    return loading
  }

  const { currentUser } = initialState

  if (!currentUser || !currentUser.name) {
    return loading
  }

  const menuItems: MenuProps['items'] = [
    {
      key: 'center',
      label: '个人中心',
      icon: <UserOutlined />
    },
    {
      key: 'settings',
      label: '个人设置',
      icon:   <SettingOutlined />
    },
    {
      key: 'logout',
      label: '退出登录',
      icon: <LogoutOutlined />
    }
  ]

  const menuHeaderDropdown = (
    <Menu selectedKeys={[]} onClick={onMenuClick} items={menuItems} />
  )
  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar size="small" className={styles.avatar} src={currentUser.avatar} alt="avatar" />
        <span className={`${styles.name} anticon`}>{currentUser.name}</span>
        <Drawer open={isOpen} width='80%'>
          <AccountCenter />
        </Drawer>
      </span>
    </HeaderDropdown>
  )
}

export default AvatarDropdown
