import * as React from 'react'
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field'
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextProps,
  TouchableOpacity,
  View,
} from 'react-native'
import { goBack, navigate } from '@navigation'
import { getStorage, setStorage } from '@lib/storage'
import { AuthApi } from '@api/qsland'
import { ToastAppError } from '@components/Toast'
import { AppColor } from '@assets/colors'
import { ButtonLogin, LayoutAuth, TitleAuth } from '../components'
import { AppLang } from '@assets/langs'
import { TextApp } from '@components'
import { LoadingApp } from '@components/loading'

const CELL_COUNT = 6

export default function ScreenVerify({ route }: any) {
  const email = route.params.email
  const [value, setValue] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [isSubmit, setIsSubmit] = React.useState(true)
  const [enableMask, setEnableMask] = React.useState(true)
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT })
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  })
  React.useEffect(() => {
    if (value.length === CELL_COUNT) {
      onSendOtp()
    }
  }, [value])

  const onSendOtp = async () => {
    if (value.trim() == '') return ToastAppError('Vui lòng nhập mã')
    const token = await getStorage('token-forgot')
    const code = value
    const data = await AuthApi.sendOtp({ token, email, code })
    setValue('')
    const res = data.getResponse()
    if (res.status) {
      return navigate('screen_reset_pass', { email })
    }
    data.check()
  }

  const onPressForgot = async () => {
    setLoading(true)
    LoadingApp.show()
    const res = (await AuthApi.forgot({ email })).check()
    LoadingApp.hide()
    setLoading(false)
    if (res && res?.token) {
      setStorage('token-forgot', res?.token)
      setIsSubmit(true)
    }
  }

  const renderCell = ({ index, symbol, isFocused }: any) => {
    let textChild = null
    if (symbol) {
      textChild = enableMask ? '•' : symbol
    } else if (isFocused) {
      textChild = <Cursor />
    }
    return (
      <View key={index} style={{
        width: 45,
        height: 45,
        borderBottomWidth: 2,
        borderBottomColor: '#000',
        marginHorizontal: 3,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Text
          style={[style.cell, isFocused && style.focusCell]}
          onLayout={getCellOnLayoutHandler(index)}>
          {textChild}
        </Text>
      </View>
    )
  }

  return (
    <LayoutAuth>
      <ScrollView
        keyboardDismissMode='on-drag'
        keyboardShouldPersistTaps='always'
        contentContainerStyle={{
          backgroundColor: '#fff',
          paddingHorizontal: 10,
          flex: 1,
        }}>
        <TitleAuth title={AppLang('nhap_ma_otp')} back />
        <TextApp style={{ textAlign: 'center', marginTop: 10 }}>
          {'Mã xác minh được gửi qua tin nhắn Email đến'}
        </TextApp>
        <TextApp style={{ textAlign: 'center', marginTop: 10, color: AppColor('primary') }}>
          {email}
        </TextApp>
        <View style={style.fieldRow}>
          <CodeField
            ref={ref}
            {...props}
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            keyboardType='number-pad'
            textContentType='oneTimeCode'
            renderCell={renderCell}
            blurOnSubmit={true}
            editable={isSubmit}
            autoFocus={true}
          />
        </View>
        <View style={{ alignItems: 'center' }}>
          {isSubmit && <Time init={120} onEnd={() => setIsSubmit(false)} />}
          <Text>
            {!isSubmit && !loading && (
              <TouchableOpacity onPress={onPressForgot}>
                <Text style={{ color: AppColor('primary') }}>{'Gửi lại'}</Text>
              </TouchableOpacity>
            )}
          </Text>
        </View>
        <ButtonLogin disabled={value.length < CELL_COUNT} onPress={onSendOtp} refreshing={loading} title={'Tiếp Theo'} />
      </ScrollView>
    </LayoutAuth>
  )
}

const Time = ({
  init = 120,
  style,
  onEnd,
}: {
  init: number
  style?: TextProps['style']
  onEnd?: () => void
}) => {
  const count = React.useRef(init)
  const render = React.useState(false)[1]
  const cache = React.useRef<any>(null)
  React.useEffect(() => {
    cache.current = setInterval(() => {
      if (count.current > 0) {
        count.current--
        render(p => !p)
      } else {
        clear()
        count.current = 0
        onEnd && onEnd()
      }
    }, 1000)
    return () => {
      clear()
    }
  }, [])
  const clear = () => clearInterval(cache.current)
  return (
    <TextApp style={[{}, style]}>
      Mã xác minh còn hiệu lực trong vòng {count.current} giây nữa.
    </TextApp>
  )
}

const style = StyleSheet.create({
  container: {
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textBold: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 25,
    marginLeft: 56,
  },
  hr: {
    position: 'relative',
    bottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  containerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Platform.OS === 'ios' ? 10 : 0,
  },
  input: {
    marginLeft: 10,
    marginVertical: 10,
    fontSize: 16,
    flex: 1,
  },
  btn: {
    minHeight: 50,
    borderRadius: 5,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    paddingVertical: 12,
  },
  textBtn: {
    color: 'white',
    fontSize: 20,
  },
  underlineStyleBase: {
    width: 45,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 2,
    borderColor: '#000',
    color: 'black',
    fontSize: 20,
  },
  underlineStyleHighLighted: {
    borderColor: '#000',
    color: 'black',
    fontSize: 20,
  },
  otpBox: {
    width: 45,
    height: 45,
    borderColor: '#000',
    borderBottomWidth: 2,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpText: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
  },
  otpContainer: {
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 30,
  },
  root: { padding: 20, minHeight: 300 },
  title: { textAlign: 'center', fontSize: 30 },
  fieldRow: {
    marginVertical: 20,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  cell: {
    width: 45,
    height: 45,
    fontSize: 30,
    textAlign: 'center',
    color: AppColor('primary')
  },
  toggle: {
    width: 55,
    height: 55,
    lineHeight: 55,
    fontSize: 24,
    textAlign: 'center',

  },
  focusCell: {
    borderColor: '#000',
  },
})
