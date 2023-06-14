import { useState } from 'react'
import Taro, { useReady } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTabBar, AtNavBar } from 'taro-ui'
import MyInfo from './MyInfo'
import TodoList from './TodoList'
import HistoryList from './HistoryList'
import './index.css'

export default function Home() {
  const [currentPage, setCurrentPage] = useState(0)
  const app = Taro.getApp()
  const env = Taro.getEnv()
  useReady(() => {
    if (!app?.userInfo) {
      Taro.redirectTo({
        url: '/pages/login/index',
      })
    }
  });
  return (
    <View className='home-page'>
      {env === Taro.ENV_TYPE.WEB &&
        (<AtNavBar>主页</AtNavBar>)
      }
      <View className='home-main' style={{ flex: 1, height: 0, overflow: 'auto' }}>
        {currentPage === 0 && <TodoList />}
        {currentPage === 1 && <HistoryList />}
        {currentPage === 2 && <MyInfo />}
      </View>
      <AtTabBar
        current={currentPage}
        tabList={[
          { title: '代办任务', iconType: 'bullet-list' },
          { title: '已办任务', iconType: 'clock' },
          { title: '我的', iconType: 'user' }
        ]}
        onClick={(index) => setCurrentPage(index)}
      />
    </View>
  )
}
