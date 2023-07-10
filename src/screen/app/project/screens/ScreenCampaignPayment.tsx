import React from 'react'
import { Block, Touch } from '@mylib'
import ScreenApp from '@components/layout/ScreenApp'
import { AppLang } from '@assets/langs'
import { Log } from '@utils/Log'
import CampaignPayment from '@screen/app/ManageCustomer/tabs/CampaignPayment'

export default function ScreenCampaignPayment({ route }: any) {
    const { total, body } = route.params
    Log.d('1aa', { total, body })
    return (
        <ScreenApp back title={AppLang('thong_tin_thanh_toan')}>
            <Block flex1 bgW>
                <CampaignPayment {...{ total, body }} />
            </Block>
        </ScreenApp>
    )
} 