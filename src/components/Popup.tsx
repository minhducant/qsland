import React, { Component, PureComponent } from 'react'
import { isEmpty } from 'underscore';
import {
    ModalBaseProps,
    Dimensions,
    Modal,
    StyleSheet,
    TouchableOpacity,
    View,
    ViewProps,
    Text,
    ActivityIndicator,
    TextStyle
} from 'react-native'
export type LoadingProp = {

    styleLoading?: ViewProps['style']
    styleContainer?: ViewProps['style']
    propsModal?: ModalBaseProps
}
export type LoadingRef = null | {
    open: (buttons: buttons, e: boolean) => void
    close: () => void
    _setProgress: (e: any) => any
}
type data = {
    title: string,
    note?: string,
    buttons: Array<{ title?: string, color?: string, onPress?: () => void, bold?: TextStyle['fontWeight'] }>
}


export class PopupApp extends PureComponent<LoadingProp> {
    static _ref: LoadingRef = null
    state: {
        visible: boolean,
        hidden: boolean,
        data: data

    }
    constructor(props: any) {
        super(props)
        this.state = {
            visible: false,
            hidden: false,
            data: {
                title: "title",
                note: 'note',
                buttons: [
                    {
                        title: 'cancel',
                        color: 'blue',
                        bold: "300",
                        onPress: () => { }
                    },
                    {
                        title: 'ok',
                        color: 'red',
                        bold: "600",
                        onPress: () => { }
                    }
                ]
            }
        }
    }
    static setRef(ref: any) {
        PopupApp._ref = ref
    }
    static show(data: data, hidden = false) {

        if (PopupApp._ref) {
            PopupApp._ref.open(data, hidden)
        }
    }
    static hide() {
        if (PopupApp._ref) PopupApp._ref.close()
    }
    open(data: data, hidden = false) {
        if (data) this.setState(prev => ({ ...prev, visible: true, hidden, data }))
    }
    close() {
        this.setState(prev => ({ ...prev, visible: false, }))
    }
    onPressOut() {
        if (this.state.hidden) {
            this.close()
        }
    }
    render() {
        return (
            <Modal
                visible={this.state.visible}
                transparent
                style={{ zIndex: 999999 }}
                {...this.props.propsModal}
            >
                <TouchableOpacity
                    onPress={() => this.onPressOut()}
                    activeOpacity={1}
                    style={[styles.container, this.props.styleContainer]}>
                    <View style={[styles.loading, this.props.styleLoading]}>
                        <View style={{ padding: 10, alignItems: 'center' }}>
                            <Text style={[styles.title]}>{this.state.data?.title}</Text>
                            <Text style={[styles.text]}>{this.state.data?.note}</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            position: 'absolute',
                            height: 50,
                            borderTopWidth: 1,
                            borderTopColor: 'gray',
                            bottom: 0,
                            left: 0,
                            right: 0,

                        }}>
                            {Array.isArray(this.state.data?.buttons) &&
                                this.state.data.buttons.map((item, index) =>
                                    <TouchableOpacity
                                        onPress={() => {
                                            typeof item?.onPress === 'function' && item.onPress()
                                            PopupApp.hide()
                                        }}
                                        key={index}
                                        style={{
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flex: 1,
                                            borderRightWidth: index + 1 == this.state.data.buttons.length ? 0 : 1,
                                            borderRightColor: 'gray',
                                        }}>
                                        <Text style={[styles.title, { color: item.color, fontWeight: item.bold }]}>{item?.title}</Text>
                                    </TouchableOpacity>
                                )}
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>
        )
    }
}
export default function TabViewer() {
    return (<PopupApp ref={ref => PopupApp.setRef(ref)} />)
}
/**
 * 
 * 
 * 
 * 
 * 
 * 
 */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000A1',
    },
    loading: {
        width: Dimensions.get('screen').width * 0.75,
        height: Dimensions.get('screen').width * 0.4,
        backgroundColor: '#fff',
        // justifyContent: 'center',
        // alignItems: 'center',
        borderRadius: 16,
        shadowColor: '#000',
        elevation: 3,
        shadowOffset: {
            width: 3,
            height: 5,
        },
        shadowOpacity: 0.1,
    },
    title: {
        fontSize: 25,
        color: '#4481EB',
        textAlign: 'center'
    },
    text: {
        fontSize: 16,
        textAlign: 'center'
    }
})
