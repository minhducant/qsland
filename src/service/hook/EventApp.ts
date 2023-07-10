import { useEffect } from 'react'
import { EventRegister } from 'react-native-event-listeners'
import { arrayData } from '@utils/format';
import { extraParams } from '@api/config';
export const EventApp = {
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
export const useEventApp = (event: event, callBack: any) => {
  useEffect(() => {
    EventRegister.addEventListener(event, data => {
      if (typeof callBack == 'function') {
        callBack(data)
      }
    })
    return () => {
      EventRegister.removeEventListener(event)
    }
  }, [])
}
export const useEventUrl = (event: event, params: any, callBack: any) => {
  useEffect(() => {
    EventRegister.addEventListener(event + extraParams(params), data => {
      if (typeof callBack == 'function') {
        callBack(data)
      }
    })
    return () => {
      EventRegister.removeEventListener(event + extraParams(params))
    }
  }, [])
}
export enum EVENT_APP {

}
