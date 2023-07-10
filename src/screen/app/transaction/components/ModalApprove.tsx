import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useRef } from 'react'
import { Block, ModalRef, TextInputRef } from '@mylib/UIKit'
import { screen_height, screen_width, TextApp } from '@components/index'
import ButtonApp from '@components/ButtonApp'
import { AppLang } from '@assets/langs';
import { AppImage } from '@assets/image'
const width = screen_width * 0.95
const height = screen_height * 0.65
const ModalApprove = React.forwardRef<any, any>(({ onSelected, onRemove }, ref) => {
    React.useImperativeHandle(ref, () => ({ ...modalRef.current }))
    const modalRef = useRef<any>()
    return (
        <ModalRef ref={modalRef} mid>
            <Block w={width} h={height} white borderR10 pad20 >
                <Image source={AppImage('background')} style={{ width: '100%', resizeMode: 'contain' }} />
                <TextApp lang='duyet_hop_dong_theo_quy_trinh_nhanh' center bold size20 toUpperCase primary />
                <TextApp lang='luu_y_duyet' center />
                <Block positionA pad20 style={{ bottom: 10, left: 0, right: 0 }}>
                    <TextApp lang='ban_co_chac_chan_duyet' center size18 bold />
                    <Block row centerBetween marT20 >
                        <ButtonApp height={45} title={AppLang('bo_qua')} style={{ flex: 1 }} background="#eee" color='#000' />
                        <Block w={10} />
                        <ButtonApp height={45} title={AppLang('xac_nhan')} style={{ flex: 1 }} />
                    </Block>
                </Block>
            </Block>
        </ModalRef>
    )
})
export default ModalApprove
const styles = StyleSheet.create({})