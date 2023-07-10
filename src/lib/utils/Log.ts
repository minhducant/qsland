import { format as prettyFormat } from 'pretty-format'
//npm i pretty-format
const br_d = `🔵`
const br_g = `🟢`
const br_e = `🔴`
const br_y = `🟡`
// const __DEV__ = false
export const log = (msg: any, ...rest: any) => {
  if (__DEV__) return console.log(Color.FgCyan, br_d + msg, ...rest)
}
export class Log {
  static e(msg: any, ...rest: any) {
    if (__DEV__) return console.log(Color.FgRed, br_e + msg, ...rest)
  }
  static d(msg: any, ...rest: any) {
    if (__DEV__) return console.log(Color.FgCyan, br_d + msg, ...rest)
  }
  static g(msg: any, ...rest: any) {
    if (__DEV__) return console.log(Color.FgGreen, br_g + msg, ...rest)
  }
  static y(msg: any, ...rest: any) {
    if (__DEV__) return console.log(Color.FgYellow, br_y + msg, ...rest)
  }

  static m(msg: any, ...rest: any) {
    if (__DEV__) return console.log(Color.BgCyan, msg, ...rest)
  }
  static e1(key: any, msg: any) {
    if (__DEV__)
      return console.log(
        Color.FgRed,
        br_e + `${key}`,
        prettyFormat(msg, {
          printBasicPrototype: false,
        }),
      )
  }
  static d1(key: any, msg: any) {
    if (__DEV__)
      return console.log(
        Color.FgCyan,
        br_d + `${key}`,
        prettyFormat(msg, {
          printBasicPrototype: false,
        }),
      )
  }
  static g1(key: any, msg: any) {
    if (__DEV__)
      return console.log(
        Color.FgGreen,
        br_g + `${key}`,
        prettyFormat(msg, {
          printBasicPrototype: false,
        }),
      )
  }
  static warn(msg: any, ...rest: any) {
    if (__DEV__) return console.warn(msg, ...rest)
  }


  static err(msg: any, err: any) {
    if (__DEV__)
      return console.log(Color.FgRed, { message: msg, error: err }.toString())
  }
}

const Color = {
  Reset: '\x1b[0m', ///#000000
  Bright: '\x1b[1m',
  Dim: '\x1b[2m',
  Underscore: '\x1b[4m',
  Blink: '\x1b[5m',
  Reverse: '\x1b[7m',
  Hidden: '\x1b[8m',

  FgBlack: '\x1b[30m',
  FgRed: '\x1b[31m', //##CC0000
  FgGreen: '\x1b[32m',
  FgYellow: '\x1b[33m',
  FgBlue: '\x1b[34m', //#3465A4
  FgMagenta: '\x1b[35m',
  FgCyan: '\x1b[36m',
  FgWhite: '\x1b[37m',

  BgBlack: '\x1b[40m',
  BgRed: '\x1b[41m',
  BgGreen: '\x1b[42m',
  BgYellow: '\x1b[43m',
  BgBlue: '\x1b[44m',
  BgMagenta: '\x1b[45m',
  BgCyan: '\x1b[46m',
  BgWhite: '\x1b[47m',
}
