import { format as prettyFormat } from 'pretty-format'
//npm i pretty-format
const br_d = `🔵`
const br_g = `🟢`
const br_e = `🔴`
const br_y = `🟡`
// const __DEV__ = false
export class Log {
  static env = true
  constructor(env: boolean) {
    Log.env = env
  }
  static e(msg: any, ...rest: any) {
    if (Log.env) return console.log(Color.FgRed, br_e + msg, ...rest)
  }
  static d(msg: any, ...rest: any) {
    if (Log.env) return console.log(Color.FgCyan, br_d + msg, ...rest)
  }
  static g(msg: any, ...rest: any) {
    if (Log.env) return console.log(Color.FgGreen, br_g + msg, ...rest)
  }
  static y(msg: any, ...rest: any) {
    if (Log.env) return console.log(Color.FgYellow, br_y + msg, ...rest)
  }

  static m(msg: any, ...rest: any) {
    if (Log.env) return console.log(Color.BgCyan, msg, ...rest)
  }
  static e1(key: any, msg?: any) {
    if (Log.env)
      return console.log(
        Color.FgRed,
        br_e + `${key}`,
        prettyFormat(msg, {
          printBasicPrototype: false,
        }),
      )
  }
  static d1(key: any, msg?: any) {
    if (Log.env)
      return console.log(
        Color.FgCyan,
        br_d + `${key}`,
        prettyFormat(msg, {
          printBasicPrototype: false,
        }),
      )
  }
  static g1(key: any, msg?: any) {
    if (Log.env)
      return console.log(
        Color.FgGreen,
        br_g + `${key}`,
        prettyFormat(msg, {
          printBasicPrototype: false,
        }),
      )
  }
  static warn(msg: any, ...rest: any) {
    if (Log.env) return console.warn(msg, ...rest)
  }

  static o(type: typeLog, msg: any, ...rest: any) {
    if (Log.env) return console.log(Color[type], msg, ...rest)
    // console.log(Color.Reset, 'Reset', ...rest)
    // console.log(Color.Bright, 'Bright', ...rest)
    // console.log(Color.Dim, 'Dim', ...rest)
    // console.log(Color.Underscore, 'Underscore', ...rest)//gach chan
    // console.log(Color.Blink, 'Blink', ...rest)//nhap nhay
    // console.log(Color.Reverse, 'Reverse', ...rest)
    // console.log(Color.Hidden, 'Hidden', ...rest)
    /*==================================================== */
    // console.log(Color.FgBlack, 'FgBlack', ...rest)
    // console.log(Color.FgRed, 'FgRed', ...rest)//#000000
    // console.log(Color.FgGreen, 'FgGreen', ...rest)//##459806
    // console.log(Color.FgBlue, 'FgBlue', ...rest)//##3465A4
    // console.log(Color.FgYellow, 'FgYellow', ...rest)//##C4A000
    // console.log(Color.FgMagenta, 'FgMagenta', ...rest)//##75507B
    // console.log(Color.FgCyan, 'FgCyan', ...rest)//##06989A
    // console.log(Color.FgWhite, 'FgWhite', ...rest)//#ffffff
    /*==================================================== */
    // console.log(Color.BgBlack, 'BgBlack', ...rest)//#2E3436
    // console.log(Color.BgRed, 'BgRed', ...rest)//#CC0000
    // console.log(Color.BgGreen, 'BgGreen', ...rest)//#4E9A06
    // console.log(Color.BgYellow, 'BgYellow', ...rest)//#C4A000
    // console.log(Color.BgBlue, 'BgBlue', ...rest)//#3465A4
    // console.log(Color.BgMagenta, 'BgMagenta', ...rest)//#75507B
    // console.log(Color.BgCyan, 'BgCyan', ...rest)//#06989A
    // console.log(Color.BgWhite, 'BgWhite', ...rest)//#D3D7CF
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
type typeLog =
  | 'Reset'
  | 'Bright'
  | 'Dim'
  | 'Underscore'
  | 'Blink'
  | 'Reverse'
  | 'Hidden'
  | 'FgBlack'
  | 'FgRed'
  | 'FgGreen'
  | 'FgYellow'
  | 'FgBlue'
  | 'FgMagenta'
  | 'FgCyan'
  | 'FgWhite'
  | 'BgBlack'
  | 'BgRed'
  | 'BgGreen'
  | 'BgYellow'
  | 'BgBlue'
  | 'BgMagenta'
  | 'BgCyan'
  | 'BgWhite'

export const log = () => {
  if (__DEV__)
    [...Array(10).keys()].forEach(element => {
      console.log('')
    })
}
