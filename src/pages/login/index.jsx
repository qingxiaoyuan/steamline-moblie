import { useState } from 'react'
import Taro from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { AtInput, AtButton, AtToast } from 'taro-ui'
import './index.css'

export default function Index() {
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const app = Taro.getApp()

  const handleLogin = () => {
    setIsLoading(true);
    Taro.request({
      url: 'http://123.60.52.7:4000/user/login',
      method: 'POST',
      data: {
        userName,
        password,
      },
      success: function (res) {
        setIsLoading(false);
        if (res?.data?.code === 200) {
          app.userInfo = res?.data?.data;
          Taro.redirectTo({
            url: '/pages/home/index',
          })
        }
      },
      fail: function () {
        setIsLoading(false);
      }
    })
  };
  return (
    <View className='login-page'>
      <View className='logo-container'>
        <Image
          src='http://123.60.52.7:9999/resource/streamline-logo.png'
          alt='logo'
          style={{ width: 40, height: 40 }}
        />
        <Text>STREAMLINE</Text>
      </View>
      <View className='login-card'>
        <AtInput
          className='login-input'
          title='账号'
          type='text'
          border={false}
          placeholder='请输入账号'
          value={userName}
          onChange={(value) => setUserName(value)}
        />
        <AtInput
          className='login-input'
          title='密码'
          type='password'
          border={false}
          placeholder='请输入密码'
          value={password}
          onChange={(value) => setPassword(value)}
        />
        <AtButton type='primary' onClick={handleLogin}>登陆</AtButton>
      </View>
      <AtToast isOpened={isLoading} text='登陆中' status='loading' duration={0} ></AtToast>
    </View>
  )
}
