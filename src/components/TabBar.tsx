import React, { Component } from 'react'
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native'
import { isNumber, isString } from 'underscore'

type State = {
    value: number
}
interface Props {
    namePage1?: any
    namePage2?: any
    namePage3?: any
    setActive1: (value: number) => void
    namePageCustomerProfile?: any
    namePageInformation?: any
    value: number
    count1?: number
    count2?: number
    count3?: number
}
export default class TabBar extends Component<Props, State> {
    onChangeSetActive = (newSetActive: number) => {
        this.props.setActive1(newSetActive)
    }
    render() {
        const { value } = this.props
        return (
            <View style={styles.viewTabBar}>
                <ItemTab active={value === 1} onPress={() => this.onChangeSetActive(1)} title={this.props.namePage1} count={this.props.count1} />
                <ItemTab active={value === 2} onPress={() => this.onChangeSetActive(2)} title={this.props.namePage2} count={this.props.count2} />
                <ItemTab hidden={!isString(this.props.namePage3) || this.props.namePage3 == ""} active={value === 3} onPress={() => this.onChangeSetActive(3)} title={this.props.namePage3} count={this.props.count3} />
                <ItemTab hidden={!isString(this.props.namePageInformation) || this.props.namePageInformation == ""} active={value == 3} onPress={() => this.onChangeSetActive(3)} title={this.props.namePage3} count={this.props.count3} />
            </View>
        )
    }
}
const ItemTab = ({ title, count = 0, active, onPress, hidden }: any) => {
    if (hidden) return <></>
    const color = active ? "#4481EB" : '#4C5264'
    const bottomWidth = active ? 3 : 0
    return (
        <TouchableOpacity style={[styles.barActive, { borderBottomWidth: bottomWidth, borderColor: color }]} onPress={onPress}>
            <Text style={[styles.textBarActive, { color: color }]}>{`${title}`.toUpperCase()}</Text>
            {isNumber(count) && count !== 0 && <Text style={[styles.textBarActive, { color: color }]}>{` (${count})`}</Text>}

        </TouchableOpacity >
    )
}
const styles = StyleSheet.create({
    viewTabBar: {
        flexDirection: 'row',
        borderBottomColor: '#4C5264',
        height: 50,
        backgroundColor: 'white',
        borderBottomWidth: 0.5,
        borderColor: '#ddd'
    },
    barActive: {
        height: 50,
        flex: 1,
        borderBottomWidth: 3,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    textBarActive: {
        fontSize: 14,
        fontWeight: '500',
        marginRight: 5
    },
    icBar: {
        height: 20,
        width: 20,
        marginRight: 5,
    },
    box: {
        position: 'absolute',
        // top: 5,
        right: -8,
        // borderRadius: 100,
        // backgroundColor: AppColor('txt_badge_notify'),
        // paddingHorizontal: 2,
    },
})
// const fmBadge = (c: number) => {
//     if (isNumber(c)) {
//         if (c > 99) return '99+'
//         return c
//     }
// }
// {/* {count !== 0 && (
//                 <Badge
//                     size={18}
//                     style={[
//                         {
//                             color: '#fff',
//                             backgroundColor: AppColor('txt_red'),
//                             fontSize: 14,
//                             position: 'absolute',
//                             right: 5,
//                             top: '30%',
//                             // paddingLeft: 5
//                         },
//                     ]}>
//                     {fmBadge(count)}
//                 </Badge>)
//             } */}