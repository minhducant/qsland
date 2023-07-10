export const ActionApp = {
    thong_ke: 0,
    crm: 0,
    du_an: 0,
}
export const onPressTest = (key: keyof typeof ActionApp) => {
    ActionApp[key]++
    console.log('ActionApp', ActionApp)
}