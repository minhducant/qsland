import { useRef, useState } from 'react'

export { default as PagerView } from 'react-native-pager-view'
export const usePagerView = () => {
  const [selectedPage, setSelectedPage] = useState(0)
  const refPagerView = useRef<any>()

  const onPageSelected = (event: any) => {
    let index = event?.nativeEvent?.position
    setSelectedPage(index)
  }
  const handleClickTab = (value: any) => {
    refPagerView.current.setPage(value)
  }
  const switchTab = (index: number) => {
    typeof refPagerView.current.setPageWithoutAnimation == 'function' && refPagerView.current.setPageWithoutAnimation(index)
  }
  const setRef = (ref: any) => (refPagerView.current = ref)
  return {
    selectedPage,
    onPageSelected,
    handleClickTab,
    setRef,
    switchTab
  }
}
