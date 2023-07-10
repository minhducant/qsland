import { Log } from "@utils";
import { isString } from "underscore";

export const _styleChar = (input: string) => {
    if (!isString(input)) return {}
    const specialChars = /[!@$^&*()_+\=\[\]{}':"\\|,<>\/?]/;
    let test = input.match(specialChars)
    if (test) {
        Log.e('Có ký tự đặc biệt trong chuỗi.')
        return false
    }
    let cuts = input.split(';')
    // Log.d('cuts', cuts)
    let style: { [key: string]: any } = {}
    for (let prop of cuts) {
        let before_i: any = null
        let after_i: any = null
        let arr_prop = prop.split('')
        let slice_dot = prop.split('.')//.
        arr_prop.forEach((i, j) => {
            if (i === '.' && before_i == null && after_i == null) {
                if (arr_prop[j + 1] !== "" && arr_prop[j - 1] !== "") {
                    before_i = arr_prop[j - 1]
                    after_i = arr_prop[j + 1]
                }
            }
        })
        // co '.'
        if (before_i && after_i) {
            if (!isNaN(Number(before_i)) && !isNaN(Number(after_i))) {
                const { text, number } = sliceTextAndNumber(prop)
                if (text)
                    style[text] = !isNaN(number) ? number : slice_dot.slice(1)
            }
            if (isNaN(Number(before_i)) && !isNaN(Number(after_i))) {
                if (slice_dot.length = 2) style[slice_dot[0]] = !isNaN(Number(slice_dot[1])) ? Number(slice_dot[1]) : slice_dot[1]
            }
            if (isNaN(Number(before_i)) && isNaN(Number(after_i))) {
                if (slice_dot.length = 2) style[slice_dot[0]] = slice_dot.slice(1).toString()
            }
        } else {
            const { text, number } = sliceTextAndNumber(prop)
            if (text && number) {
                style[text] = number

            }
            else {
                // Log.e('sadasd', { text, number, prop })
                if ((isString(prop) && !prop.match(specialChars)) && prop !== '')
                    style[prop] = true
            }
        }

        //co .// truoc va sau
        //-truocs sau deu la so =>>23.23/////sadasdasd21321.2132132asdsadsad
        //-truocs chu sau so==>dsadsad.334324||dsadsad.3d

        //-truoc +sau la chu ==>adadadadadadad.color33243||adadada.sdsd||adsadadada.#32948732
        //k co .
        //---khong co so: adsadadadada:true
        //borderRadius:1000,//chua ho tro borderCircle
        //co so pading213213,adadadadad321323


        // const [key2, value2] = prop.split(/(\d+)/);

        // Log.d('key2, value2', { key2, value2 })
        // if (key && value) {
        //   style[key] = isNaN(parseFloat(value)) ? value : parseFloat(value);
        // }

    }
    // Log.d1('style', style)
    return style;

}
export function sliceTextAndNumber(input: string) {
    let text = "";
    let number = "";
    let mid: number | boolean = false
    for (let i = 0; i < input.length; i++) {
        const currentChar = input[i];
        if (!isNaN(parseInt(currentChar)) && mid == false) {
            mid = i
        }
    }
    if (mid) {
        text = input.slice(0, mid)
        number = input.slice(mid)
    }
    // Log.d('mid', { mid, text, number })
    return {
        text: mid ? text : null,
        number: mid ? Number(number) : null,
    };
}
export function replaceAll(str = '', search = '', replacement = '') {
    return str.replace(new RegExp(search, 'g'), replacement);//[g] ~~ search global

}