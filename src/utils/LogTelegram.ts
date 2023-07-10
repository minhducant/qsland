import moment from 'moment';
import { Log } from './LogColor'
import { format as prettyFormat } from 'pretty-format'

const DOMAIN = 'https://api.telegram.org'
const TOKEN = `5600393482:AAG96NVPEwvElbgxO6D7H9S-ICw3rZqjdMw`
const ROOM_ID = '-897851268'
export const LogTelegram = async (data: any) => {
  fetch(
    `${DOMAIN}/bot${TOKEN}/sendMessage?chat_id=${ROOM_ID}&text=${prettyFormat({
      data: data,
      create_at: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
    }, {
      printBasicPrototype: false,
    })
    }`,
    { method: 'GET' },
  )
    .then(response => response.text())
    // .then(result =>{console.log('error', result)})
    .catch(error => Log.d1('LogTelegram', error))
}
