import * as React from 'react'
import { StackActions } from '@react-navigation/native'
import { NameScreenApp } from '@screen/app'
import { NameScreenAuth } from '@screen/auth'
import { NameScreenBottom } from '@screen/app/dashboard/container/BottomHome'
import { DrawerRef } from '@mylib/UIKit'
export const isReadyRef = React.createRef()
export const navigationRef = React.createRef<any>()
export function navigate(name: SCREEN_NAME, params = {}) {
  navigationRef.current.navigate(name, params)
}
export function goBack() {
  navigationRef.current.goBack()
}
export function replace(name: any, params = {}) {
  navigationRef.current.dispatch(StackActions.replace(name, params))
}
export function popToTop() {
  navigationRef.current.dispatch(StackActions.popToTop())
}
export function getCurrentRoute() {
  return navigationRef.current?.getCurrentRoute()
}
export const drawerRef = React.createRef<DrawerRef>()
export function openDrawer() { drawerRef.current?.openDrawer() }
export function closeDrawer() { drawerRef.current?.closeDrawer() }

export const navigation = navigationRef.current
export type SCREEN_NAME = NameScreenApp | NameScreenAuth | NameScreenBottom
export * from '@react-navigation/native'