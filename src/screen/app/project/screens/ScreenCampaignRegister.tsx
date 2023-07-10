import React from 'react'
import { Block, Touch } from '@mylib'
import ScreenApp from '@components/layout/ScreenApp'
import { AppLang } from '@assets/langs'
import CampaignAddCustomer from '@screen/app/ManageCustomer/tabs/CampaignAddCustomer'
import { Log } from '@utils/Log'

export default function ScreenCampaignRegister({ route }: any) {
    const { campaign_sale, building, category, total } = route.params
    Log.d('1aa', { campaign_sale, building, category })
    return (
        <ScreenApp back title={AppLang('dang_ky_dat_cho')}>
            <Block flex1 bgW>
                <CampaignAddCustomer {...{ campaign_sale, building, category, total }} />
            </Block>
        </ScreenApp>
    )
} 