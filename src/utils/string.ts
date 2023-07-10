export const replaceVariable = (key: string, values: string[] = []) => {
    let res = key
    while (res.indexOf('$') != -1) {
        let start = res.indexOf('$')
        let end = -1
        let arr_string = Array.from(res)
        for (let i = start + 1; i < arr_string.length; i++) {
            if (end == -1) {
                if (res[i] == ' ') end = i - 1
                else if (i == res.length - 1) end = i
            }
        }
        res = spliceSplit(res, start, end - start + 1, values.length > 0 ? values[0] : '??')
        values.shift()
    }
    return res
}
export function spliceSplit(str: string, index: number, count: number, add: string) {
    let ar = str.split('');
    ar.splice(index, count, add);
    return ar.join('');
}
export function splitVariable(text: string, key = "$") {
    let res = text
    let res_new = []
    if (res.indexOf(key) != -1) {
        let arr_string = Array.from(text)
        let start = 0
        let end = -1
        for (let i = 0; i < arr_string.length; i++) {
            if (arr_string[i] == key) {
                end = i
            }
            if (i == arr_string.length - 1) end = i + 1
            if (start != -1 && end != -1) {
                res_new.push(arr_string.slice(start, end).join(''))
                start = -1
                end = -1
            }
            if (start == -1 && end == -1) {
                if (arr_string[i] == ' ') {
                    start = i
                }
            }
        }
        return res_new
    }
    return [res]
}