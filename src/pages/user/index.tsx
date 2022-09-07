import Taro, { Component, Config, getUserInfo } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'

export default class Index extends Component {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '个人中心'
  }

  // 登录
  getLogin () {
    Taro.login({
      success: loginres => {
        if (loginres.code) {
          Taro.getUserInfo({
            success: user => {
              Taro.request({
                url: 'http://127.0.0.1:8080/wxLogin', //仅为示例，并非真实的接口地址
                method: "GET",
                data: {
                  code: loginres.code,
                  encryptedData: user.encryptedData,
                  iv: user.iv
                },
                success: function (res) {
                  console.log(res.data)
                }
              })              

            }
          })
        }

      }
    })
  }

  getUserInfo () {
    Taro.getUserInfo({
      success: function(res) {
        console.log("res",res)
      }
    })
  }

  render () {
    return (
      <View className='user-info'>
        <View className='login-btn' onClick={this.getLogin}>登录</View>
        <View className='login-btn' onClick={this.getUserInfo}>获取用户信息</View>
      </View>
    )
  }
}
