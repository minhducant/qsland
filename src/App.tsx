import React from 'react'
import { Provider } from 'react-redux'
import { Navigation } from './navigation'
import store from '@service/store'
import CodePush from 'react-native-code-push'
import { DropdownAlertCustom } from '@components'
import { DropdownNotify } from '@components/Toast/DropdownAlertCustom'
import { UpgradeJs, Upgrade } from '@components/Codepush'
import Popup from '@components/Popup'
/******** react-native-exception-handle ************************ */
import {
  setJSExceptionHandler,
  setNativeExceptionHandler,
} from 'react-native-exception-handler'
import { Alert } from 'react-native'
import { LoadingViewer } from '@components/loading'

const errorHandler = (e: Error, isFatal: boolean) => {
  if (isFatal) {
    Alert.alert('Error', `${isFatal ? 'Fatal:' : ''} ${e.name} ${e.message}`, [
      {
        text: 'Close',
      },
    ])
  } else {
  }
}
setJSExceptionHandler(errorHandler, true)

setNativeExceptionHandler(errorString => {
  console.log('setNativeExceptionHandler')
})
/******************************************** */
if (__DEV__) {
  import('../ReactotronConfig').then(() =>
    console.log(':::Reactotron Configured:::'),
  )
}
let CodePushOptions = {
  checkFrequency: CodePush.CheckFrequency.MANUAL,
}
function App() {
  return (
    <Provider store={store}>
      <Navigation />
      <LoadingViewer />
      <DropdownAlertCustom />
      <DropdownNotify />
      <Popup />
      <UpgradeJs ref={ref => Upgrade.setRef(ref)} />
    </Provider>
  )
}
export default CodePush(CodePushOptions)(App)
// export default App
