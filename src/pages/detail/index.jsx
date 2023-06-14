import { View } from "@tarojs/components";
import Taro, { useReady } from "@tarojs/taro";
import { useState } from "react";
import { AtButton, AtList, AtListItem, AtNavBar, AtTimeline, AtToast } from "taro-ui";
import "./index.css"

const statusMap = {
  '0': 'blue',
  '1': 'blue',
  '2': 'blue',
  '3': 'green',
  '4': 'red',
}

export default function Detail() {
  const app = Taro.getApp()
  const env = Taro.getEnv()
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({})
  const [timeLine, setTimeLine] = useState([]);

  useReady(() => {
    const parmas = Taro.getCurrentInstance().router.params;
    if (!app?.userInfo) {
      Taro.redirectTo({
        url: '/pages/login/index',
      })
    }
    setIsLoading(true);
    Taro.request({
      url: 'http://123.60.52.7:4000/workflow/getProcessInfo?instanceId=' + parmas?.processInstanceId ?? '',
      method: 'GET',
      header: {
        Authorization: app?.userInfo?.token ?? '',
      },
      success: function (res) {
        setIsLoading(false);
        if (res?.data?.code === 200) {
          setData(res?.data?.data);
          const line = res?.data?.data?.historyActivityList ?? [];
          setTimeLine(line?.map((item) => ({
            title: item?.activityName ?? '',
            content: [item?.opinion ?? '', item?.assignee ?? ''],
            color: statusMap?.[item?.activityType ?? '3']
          })))
        }
      },
      fail: function () {
        setIsLoading(false);
      }
    })
  })

  const hanleBack = () => {
    Taro.navigateBack()
  }

  const handleCompleteTask = () => {
    const parmas = Taro.getCurrentInstance().router.params;
    setIsLoading(true);
    Taro.request({
      url: 'http://123.60.52.7:4000/workflow/completeTask',
      method: 'POST',
      header: {
        Authorization: app?.userInfo?.token ?? '',
      },
      data: {
        taskId: parmas?.taskId || '',
        userId: app?.userInfo?.userId || '',
        opinion: '审批通过',
      },
      success: function (res) {
        setIsLoading(false);
        if (res?.data?.code === 200) {
          Taro.redirectTo({
            url: '/pages/home/index',
          })
        }
      },
      fail: function () {
        setIsLoading(false);
      }
    })
  }

  const handleRollback = () => {
    const parmas = Taro.getCurrentInstance().router.params;
    setIsLoading(true);
    Taro.request({
      url: 'http://123.60.52.7:4000/workflow/rollbackTask',
      method: 'POST',
      header: {
        Authorization: app?.userInfo?.token ?? '',
      },
      data: {
        instanceId: parmas?.processInstanceId ?? '',
      },
      success: function (res) {
        setIsLoading(false);
        if (res?.data?.code === 200) {
          Taro.redirectTo({
            url: '/pages/home/index',
          })
        }
      },
      fail: function () {
        setIsLoading(false);
      }
    })
  }

  const handleEndTask = () => {
    const parmas = Taro.getCurrentInstance().router.params;
    setIsLoading(true);
    Taro.request({
      url: 'http://123.60.52.7:4000/workflow/endTask',
      method: 'POST',
      header: {
        Authorization: app?.userInfo?.token ?? '',
      },
      data: {
        taskId: parmas?.taskId || '',
      },
      success: function (res) {
        setIsLoading(false);
        if (res?.data?.code === 200) {
          Taro.redirectTo({
            url: '/pages/home/index',
          })
        }
      },
      fail: function () {
        setIsLoading(false);
      }
    })
  }

  return (
    <View style={{ background: '#f4f4f4', height: '100vh', overflow: 'auto' }}>
      {env === Taro.ENV_TYPE.WEB &&
        (<AtNavBar leftIconType='chevron-left' onClickLeftIcon={hanleBack}>审批</AtNavBar>)
      }
      <AtToast isOpened={isLoading} text='加载数据中' status='loading' duration={0} ></AtToast>
      <View className='detail-task'>
        <View className='detail-card'>
          <AtList >
            <AtListItem title='请假单据ID' extraText={data?.businessForm?.leaveId ?? ''} />
            <AtListItem title='请假人' extraText={data?.businessForm?.initiator ?? ''} />
            <AtListItem title='单据日期' extraText={data?.businessForm?.leaveDate ?? ''} />
            <AtListItem title='开始时间' extraText={data?.businessForm?.leaveStart ?? ''} />
            <AtListItem title='结束时间' extraText={data?.businessForm?.leaveEnd ?? ''} />
            <AtListItem title='请假理由' extraText={data?.businessForm?.leaveReason ?? ''} />
          </AtList>
        </View>
        <View className='detail-card'>
          <AtTimeline
            customStyle={{ padding: '14px 14px' }}
            pending
            items={timeLine}
          />
        </View>
        <View className='detail-card' style={{ display: 'flex', padding: 14 }}>
          <AtButton type='primary' onClick={handleCompleteTask}>通过</AtButton>
          <AtButton type='primary' onClick={handleRollback}>驳回</AtButton>
          <AtButton type='primary' onClick={handleEndTask}>中止</AtButton>
        </View>
      </View>
    </View>
  )
}