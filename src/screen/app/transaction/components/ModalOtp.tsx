import { StyleSheet, Text, View } from 'react-native'
import React, { useRef } from 'react'
import { Block, ModalRef, TextInputRef } from '@mylib/UIKit'
import { screen_width, TextApp } from '@components/index'
import ButtonApp from '@components/ButtonApp'
import { AppLang } from '@assets/langs';
const width = screen_width * 0.8
const height = width * 0.65
const ModalOtp = React.forwardRef<any, any>(({ onSelected, onRemove }, ref) => {
    React.useImperativeHandle(ref, () => ({ ...modalRef.current }))
    const modalRef = useRef<any>()
    return (
        <ModalRef ref={modalRef} mid>
            <Block w={width} h={height} white borderR10 pad20>
                <TextApp lang='nhap_ma_otp' center bold size20 />
                <TextApp lang='nhap_ma_otp' center />
                <TextInputRef
                    placeholder='Nhập mã OTP'
                    containerStyle={{ marginTop: 10, borderWidth: 1, borderColor: '#ddd' }}
                    keyboardType="number-pad" />
                <Block row centerBetween positionA bottom0 left0 right0 pad20>
                    <ButtonApp title={AppLang('bo_qua')} style={{ flex: 1 }} background="#eee" color='#000' />
                    <Block w={10} />
                    <ButtonApp title={AppLang('xac_nhan')} style={{ flex: 1 }} />
                </Block>
            </Block>
        </ModalRef>
    )
})
export default ModalOtp
const styles = StyleSheet.create({})