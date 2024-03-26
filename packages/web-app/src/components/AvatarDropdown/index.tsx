import React, { useCallback } from 'react'
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Menu, MenuProps, Spin } from 'antd'
import { history, useModel } from '@umijs/max'
import { stringify } from 'querystring'
import HeaderDropdown from '../HeaderDropdown'
import styles from './index.less'
import type { MenuInfo } from 'rc-menu/lib/interface'
import qs from 'query-string'

export type GlobalHeaderRightProps = {
  menu?: boolean;
};

/**
 * 退出登录，并且将当前的 url 保存
 */
const loginOut = async () => {
  // await outLogin();
  localStorage.clear()
  const { search, pathname } = history.location
  const query = qs.parse(search)
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

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = () => {
  const { initialState, setInitialState } = useModel('@@initialState')
  const onMenuClick = useCallback(
    (event: MenuInfo) => {
      const { key } = event
      if (key === 'logout') {
        setInitialState((s) => ({ ...s, currentUser: undefined }))
        loginOut()
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
      <span className='flex items-center'>
        <Avatar size="small" src={currentUser.avatar} alt="avatar" />
        <span className='px-2'>{currentUser.name}</span>
      </span>
    </HeaderDropdown>
  )
}

export default AvatarDropdown
