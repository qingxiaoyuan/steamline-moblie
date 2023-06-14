
import { Component } from 'react'
import 'taro-ui/dist/style/index.scss'
import './app.css'


class App extends Component {
  
  taroGlobalData = {
    userInfo: undefined,
  }

  render() {
    return this.props.children;
  }
}

export default App
