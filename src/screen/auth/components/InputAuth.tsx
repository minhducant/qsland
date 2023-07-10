import { IconC } from '@mylib/UIKit'
import React, { useState, useRef, useImperativeHandle, forwardRef } from 'react'
import {
  TextInput,
  TextInputProps,
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native'
import { HandleLogin } from '../screens/handle'

interface PropsInput extends TextInputProps {
  iconName: string
  children?: any
  forgot?: boolean
  pass?: boolean
  secureInitial?: boolean
}
const InputAuth = forwardRef(
  ({ children, forgot, secureInitial, pass, ...props }: PropsInput, ref: any) => {
    useImperativeHandle(ref, () => ({
      getValue: () => x,
      focus: () => z.current?.focus(),
    }))
    const [x, y] = useState('')
    const [showPassword, setH] = useState(secureInitial)
    const z = useRef<TextInput>(null)
    return (
      <View style={styles.containerInput}>
        <IconC
          name={props.iconName}
          size={22}
          color={'gray'}
          alignSelf='auto'
        />
        <TextInput
          ref={z}
          style={styles.input}
          value={x}
          onChangeText={y}
          secureTextEntry={showPassword}
          placeholderTextColor='gray'
          {...props}
        />
        {forgot && (
          <>
            <TouchableOpacity
              style={{
                borderRightWidth: 1,
                marginRight: 6,
                paddingRight: 4,
                borderColor: '#4C5264',
              }}
              onPress={() => setH(p => !p)}>
              {/* <Image
                source={!showPassword ? ASSETS.eyeOpen : ASSETS.eyeClose}
                style={styles.showPasswordImage}
              /> */}
            </TouchableOpacity>
            <TouchableOpacity onPress={HandleLogin.forgot}>
              <Text style={{ color: 'blue', fontSize: 16 }}> Quên?</Text>
            </TouchableOpacity>
          </>
        )}
        {pass && (
          <>
            <TouchableOpacity
              style={{ marginRight: 6, paddingRight: 4, borderColor: '#4C5264' }}
              onPress={() => setH(p => !p)}>
              {/* <Image
                source={!showPassword ? ASSETS.eyeOpen : ASSETS.eyeClose}
                style={styles.showPasswordImage}
              /> */}
            </TouchableOpacity>
          </>
        )}
      </View>
    )
  },
)
export default InputAuth

const styles = StyleSheet.create({
  containerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    borderWidth: 1,
    marginVertical: 5,
    borderRadius: 5,
    padding: 5,
    borderColor: '#ababab',
  },
  input: {
    marginLeft: 10,
    fontSize: 16,
    flex: 1,
    height: 40,
    color: 'black',
  },
  showPasswordImage: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 5,
    top: 2,
  },
})
