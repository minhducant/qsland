import React from 'react'
import {StyleSheet, Text, View} from 'react-native'

export default class ItemBadge extends React.Component {
  state = {
    index: 0,
  }
  constructor (props) {
    super(props)
  }
  setValue = id => {
    this.setState({
      index: id,
    })
  }

  render () {
    return (
      <View style={[styles.viewBadge, this.props?.styleBadge]}>
        <Text style={[{fontSize: 12}, this.props?.styleTextBadge]}>
          {this.state.index + 1}/{this.props.quantity}
        </Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  viewBadge: {
    width: 30,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 2,
    right: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
})
