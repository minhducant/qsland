import React from 'react'
import { Block, Touch } from '@mylib'
import ScreenApp from '@components/layout/ScreenApp'
import { AppLang } from '@assets/langs'
import { Log } from '@utils/Log'
import BillAddPayment from '@screen/app/ManageCustomer/tabs/BillAddPayment'

export default function ScreenBillAddPayment({ route }: any) {
    const { id } = route.params
    Log.d('id', { id })
    return (
        <ScreenApp back title={AppLang('them_yeu_cau_thanh_toan') + (__DEV__ ? `${id}` : '')}>
            <Block flex1 bgW>
                <BillAddPayment {...{ id }} />
            </Block>
        </ScreenApp>
    )
} 