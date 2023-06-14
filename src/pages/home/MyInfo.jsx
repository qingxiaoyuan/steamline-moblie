import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { AtButton, AtList, AtListItem } from "taro-ui";


export default function MyInfo() {
  const app = Taro.getApp()
  const handleLogout = () => {
    app.userInfo = undefined;
    Taro.redirectTo({
      url: '/pages/login/index',
    })
  };
  return (
    <View className='my-info'>
      <View style={{ borderRadius: '8px', overflow: 'hidden', marginBottom: 10 }}>
        <AtList>
          <AtListItem title='用户ID' extraText={app?.userInfo?.userId ?? ''} />
          <AtListItem title='用户名' extraText={app?.userInfo?.userName ?? ''} />
          <AtListItem title='昵称' extraText={app?.userInfo?.nickName ?? ''} />
          <AtListItem title='用户状态' extraText={app?.userInfo?.locked ? '是' : '否'} />
        </AtList>
      </View>
      <AtButton type='primary' onClick={handleLogout} style={{ marginTop: '10px' }} >退出登录</AtButton>
    </View>
  )
}