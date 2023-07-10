
import { Text, StyleSheet, View } from 'react-native'
import React, { Component, createContext } from 'react'
interface Props {
    as: string
}
// const ThemeContext = createContext(null);
export default class ListRadio extends React.Component<Props, { color: string }> {
    static propTypes = {}
    static defaultProps = {}

    constructor(props: Props) {
        super(props);
        this.state = { color: 'red' }
    }
    // static contextType?: React.Context<any> | undefined = ThemeContext
    // inputRef = React.createRef();
    componentDidCatch(error, info) { console.log("componentDidCatch") }
    componentDidMount() { console.log("componentDidMount") }
    componentDidUpdate(prevProps, prevState, snapshot) { console.log("componentDidUpdate") }
    // componentWillMount() { console.log("componentWillMount") }
    // componentWillReceiveProps(nextProps) { console.log("componentWillReceiveProps") }
    // componentWillUpdate(nextProps, nextState) { console.log("componentWillUpdate") }
    componentWillUnmount() { console.log("componentWillUnmount") }
    forceUpdate(callback) { console.log("forceUpdate") }
    // getChildContext() { console.log("getChildContext") }
    // getSnapshotBeforeUpdate(prevProps, prevState) { console.log("getSnapshotBeforeUpdate") }

    // setState(nextState, callback) { console.log("setState") }
    shouldComponentUpdate(nextProps, nextState, nextContext) { console.log("shouldComponentUpdate") }
    UNSAFE_componentWillMount() { console.log("UNSAFE_componentWillMount") }
    UNSAFE_componentWillReceiveProps(nextProps, nextContext) { console.log("UNSAFE_componentWillReceiveProps") }
    UNSAFE_componentWillUpdate(nextProps, nextState) { console.log("UNSAFE_componentWillUpdate") }
    // static childContextTypes
    // static contextTypes
    // static contextType
    // static defaultProps
    // static propTypes
    // static getDerivedStateFromError(error) { console.log("getDerivedStateFromError") }
    // static getDerivedStateFromProps(props, state) { console.log("getDerivedStateFromProps") }
    render() {
        // const theme = this.context
        return (
            <View>
                <Text>ListRadio</Text>
            </View>
        )
    }
}
// ListRadio.defaultProps = {}
// ListRadio.displayName

const styles = StyleSheet.create({})
//Component
//context
//props
//refs
//state
//constructor(props)
//componentDidCatch(error, info)
//componentDidMount()
//componentDidUpdate(prevProps, prevState, snapshot?)
//componentWillMount()
//componentWillReceiveProps(nextProps)
//componentWillUpdate(nextProps, nextState)
//componentWillUnmount()
//forceUpdate(callback?)
//getChildContext()
//getSnapshotBeforeUpdate(prevProps, prevState)
//render()
//setState(nextState, callback?)
//shouldComponentUpdate(nextProps, nextState, nextContext)
//UNSAFE_componentWillMount()
//UNSAFE_componentWillReceiveProps(nextProps, nextContext)
//UNSAFE_componentWillUpdate(nextProps, nextState)
//static childContextTypes
//static contextTypes
//static contextType
//static defaultProps
//static propTypes
//static getDerivedStateFromError(error)
//static getDerivedStateFromProps(props, state)