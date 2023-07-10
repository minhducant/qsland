import { extraParams } from '@api/qsland'
import { arrayData } from '@utils/format'
import { useEffect } from 'react'
import { EventRegister } from 'react-native-event-listeners'
export const AppListener = {
  emitUrl: (event: event, params: any, data?: any) => {
    EventRegister.emit(event + extraParams(params), data)
  },
  emit: (event: event, data?: any) => {
    EventRegister.emit(event, data)
  },
  emitList: (events: any[],) => {
    arrayData(events).forEach(name => {
      if (name) EventRegister.emit(name)
    })
  },
  on: (event: event, callBack: any) => {
    EventRegister.addEventListener(event, data => {
      console.log('event: ' + event)
      if (typeof callBack == 'function') {
        callBack(data)
      }
    })
  },
  remover: (event: any) => {
    if (event) EventRegister.removeEventListener(event)
  },
}
export type event = string
export const useListener = (event: event, callBack: any) => {
  useEffect(() => {
    EventRegister.addEventListener(event, data => {
      console.log('addEventListener: ' + event)
      if (typeof callBack == 'function') {
        callBack(data)
      }
    })
    return () => {
      console.log('removeEventListener: ', event)
      EventRegister.removeEventListener(event)
    }
  }, [])
}
export const useListenerUrl = (event: event, params: any, callBack: any) => {
  useEffect(() => {
    console.log('addEventListener: ', event + extraParams(params))
    EventRegister.addEventListener(event + extraParams(params), data => {
      if (typeof callBack == 'function') {
        callBack(data)
      }
    })
    return () => {
      console.log('removeEventListener: ', event + extraParams(params))
      EventRegister.removeEventListener(event + extraParams(params))
    }
  }, [])
}
export enum EVENT_APP {


}
