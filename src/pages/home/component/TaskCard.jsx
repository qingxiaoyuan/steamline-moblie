import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import './index.css'

export const TaskCard = ({ data }) => {
  const handleClick = () => {
    Taro.navigateTo({
      url: 'pages/detail/index?taskId=' + data?.taskId + '&processInstanceId=' + data?.processInstanceId,
    })
  };
  return (
    <View className='task-card' onClick={handleClick}>
      <View className='at-row'>
        <View className='at-col at-col-4'>任务内容</View>
        <View className='at-col' style={{ color: '#7c7b7b' }}>{data?.taskName ?? ''}</View>
      </View>
      <View className='at-row'>
        <View className='at-col at-col-4'>创建时间</View>
        <View className='at-col' style={{ color: '#7c7b7b' }}>{data?.createTime ?? ''}</View>
      </View>
      <View className='at-row'>
        <View className='at-col at-col-4'>处理人</View>
        <View className='at-col' style={{ color: '#7c7b7b' }}>{data?.assignee ?? ''}</View>
      </View>
    </View>
  )
}