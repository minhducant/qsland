import { Log } from '@utils/Log';
import XHRInterceptor from 'react-native/Libraries/Network/XHRInterceptor';

XHRInterceptor.setOpenCallback((...e: any) => Log.d('setOpenCallback', e[0], e[1], e[2], e[3]));//ok
XHRInterceptor.setSendCallback((...e: any) => Log.d('setSendCallback', e));
// XHRInterceptor.setHeaderReceivedCallback((...e: any) => Log.d1('setHeaderReceivedCallback', e));
XHRInterceptor.setResponseCallback((status: any, timeout: any, response: any, url: any, e, f) =>
  Log.d('setResponseCallback', {
    status,
    timeout,
    response: JSON.parse(response),
    url,
    e,
    f: f?.responseHeaders,
    // g: f
  }));
/** */
XHRInterceptor.setRequestHeaderCallback((a, b, c) => {//ok
  Log.d('=>>>>', {
    [a]: b,
  })
  Log.d('setRequestHeaderCallback3', Object.keys(c))
  Log.d('setRequestHeaderCallback3', c)

});

// XHRInterceptor.isInterceptorEnabled((...e: any) => Log.d1('isInterceptorEnabled', e));
XHRInterceptor.enableInterception()



////////
////////
////////
////////
////////
////////
////////