import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useEffect, useState } from "react";
import { AtToast } from "taro-ui";
import { TaskCard } from './component/TaskCard'

export default function HistoryList() {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const app = Taro.getApp()
  useEffect(() => {
    setIsLoading(true);
    Taro.request({
      url: 'http://123.60.52.7:4000/workflow/getHistoryByUserId?userId=' + app?.userInfo?.userId ?? '',
      method: 'GET',
      header: {
        Authorization: app?.userInfo?.userId?.token ?? '',
      },
      success: function (res) {
        setIsLoading(false);
        if (res?.data?.code === 200) {
          setList(res?.data?.data);
        }
      },
      fail: function () {
        setIsLoading(false);
      }
    })
  }, [app?.userInfo?.userId])
  return (
    <View className='history-list'>
      {list?.map((item) => (
        <TaskCard key={item.taskId} data={item} />
      ))}
      <AtToast isOpened={isLoading} text='加载数据中' status='loading' duration={0} ></AtToast>
    </View>
  )
}