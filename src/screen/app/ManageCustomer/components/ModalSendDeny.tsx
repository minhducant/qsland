import React, { useRef, useState } from 'react';
import { ScrollView, } from 'react-native';
import { BottomSheet } from '@components/Sheet';
import { useListAdDenyDone, useListAdDenyWait, useListDeny } from '@service/store';
import { Block, IconC, Touch } from '@mylib/UIKit';
import { CustomerApi } from '@api/qsland/index';
import { TextApp, ToastAppError, ToastAppSuccess, LoadingApp, screen_height, screen_width } from '@components';
import { ValidateObject } from '@lib/utils/ValidateOb/object';
import { InputRows } from './FormCustomer/InputText';
import InputImages from './FormCustomer/InputImage';
import { AppLang } from '@assets/langs';
import { AppColor } from '@assets/colors';
import ButtonApp from '@components/ButtonApp';
import { Log } from '@utils/Log';
import { BarIndicator } from 'react-native-indicators';




const ModalSendDeny = React.forwardRef<any, any>(({ item, onRefresh }, ref) => {
  React.useImperativeHandle(ref, () => ({ ...refRef.current }))
  const refRef = useRef<any>(null)
  const formRef = React.useRef<any>({});
  const ListAdDenyWait = useListAdDenyWait();
  const ListAdDenyDone = useListAdDenyDone();
  const ListDeny = useListDeny();
  const onSend = async () => {

    try {
      const body = {
        reason: formRef.current['reason']?.getValue(),
        desc: formRef.current['desc']?.getValue(),
        image: formRef.current['image']?.getValue('file'),
        id: item.id
      };
      let check = ValidateObject(body, {
        reason: ['empty', 'Vui lòng nhập lý do'],
        ...!__DEV__ && { image: ['emptyArray', 'Vui lòng thêm ảnh xác minh'] },
        desc: ['empty', 'Vui lòng nhập nội dung giải trình chi tiết'],
      });
      if (!check) return;
      // LoadingApp.show()
      // setLoading(true)
      const res: any = await CustomerApi.sendExplanation(body);
      // setLoading(false)
      Log.d('res', res)
      if (res?.status) {
        refRef.current?.close()
        ListAdDenyWait.onRefreshCount()
        ListAdDenyDone.onRefreshCount()
        ListAdDenyWait.onRefresh()
        ListAdDenyDone.onRefresh()
        ListDeny.onRefresh()
        ToastAppSuccess('Gửi giải trình thành công');
        onRefresh();

      } else {
        ToastAppError(res.mess);
      }
    } catch (error) { }
  };
  const [loading, setLoading] = useState(false)
  return (
    <BottomSheet options={{ background: '#00000033' }} ref={refRef} draggable={false} height={'80%'}
      forceInsetBot={{ bottom: 'always' }}
      outClose={!loading}
    >
      <Block w={screen_width} h={screen_height * 0.75}>

        <Block pad10 padV={15} borderBW={1} borderC="#ddd" mid>
          <TextApp size18 bold center>{AppLang('giai_trinh_vi_pham')}</TextApp>
          <IconC name="close-outline" style={{ position: 'absolute', right: 10 }} onPress={() => { refRef.current?.close() }} />
        </Block>
        <Block hidden={!loading} h={screen_height * 2} w={screen_width} background={'#00000033'} gradient="vertical" mid zIndex={999} positionA>
          <BarIndicator size={60} style={{ position: 'absolute', top: screen_height * 0.25 }} color={AppColor('primary')} />
        </Block>
        <ScrollView contentContainerStyle={{ padding: 10 }}>
          <InputRows
            title={AppLang('ly_do').concat('(*):')}
            placeholder={AppLang('nhap_ly_do')}
            ref={(ref: any) => (formRef.current['reason'] = ref)}
          />
          <InputRows
            title={AppLang('noi_dung_giai_trinh_chi_tiet').concat('(*):')}
            placeholder={AppLang('nhap_noi_dung')}
            ref={(ref: any) => (formRef.current['desc'] = ref)}
          />
          <InputImages
            title={AppLang('them_anh_xac_minh').concat('(*):')}
            ref={(ref: any) => (formRef.current['image'] = ref)}
          />
        </ScrollView>
        <Block row justifyContent='flex-end' padH20 marT10 >
          <ButtonApp disabled={loading} onPress={() => refRef.current?.close()} title={AppLang('bo_qua')} style={{ marginRight: 10, width: '30%' }} background={AppColor('bg_gray')} />
          <ButtonApp disabled={loading} onPress={onSend} title={AppLang('xac_nhan')} style={{ width: '30%' }} />
        </Block>
      </Block>
    </BottomSheet>
  );
})
export default ModalSendDeny
