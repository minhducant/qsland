import * as React from 'react';
import moment from 'moment';
import { ScrollView, Image, RefreshControl } from 'react-native';

import { useListCampaignCustomer } from '@service/hook';
import { goBack } from '@navigation';
import { useDetailDenyCustomer } from '@service/hook';
import ScreenApp from '@components/layout/ScreenApp';
import { CustomerApi } from '@api/qsland/index';
import { LoadingApp, TextApp, ToastAppError, ToastAppSuccess } from '@components';
import { ValidateObject } from '@lib/utils/ValidateOb/object';
import InputImages from '../components/FormCustomer/InputImage';
import { InputRows } from '../components/FormCustomer/InputText';
import { useListAdDenyDone, useListAdDenyWait, useListDeny } from '@service/store';
import ButtonApp from '@components/ButtonApp';
import { AppLang } from '@assets/langs';
import { STATUS_ADMIN_DENY } from '@screen/app/DenyAdmin/components/api';
import { arrayData } from '@utils/format';
import { AppColor } from '@assets/colors';
import { AppDate } from '@utils/date';
import { Log } from '@utils';
import { Block } from '@mylib/UIKit';
import { isEmpty } from 'underscore';
import { getLink, ListImage, ListImageViewer } from '@lib/components/image';

export default function ScreenDenyDetail({ route }: any) {
  const { id } = route.params;
  const { data, onRefresh, loading, } = useDetailDenyCustomer(id);
  const chien_dich = useListCampaignCustomer().dataKey
  const Status = Object.values(STATUS_ADMIN_DENY).find(({ id }) => id == data?.status)
  const dataInfo = {
    khach_hang: data?.full_name,
    nhan_vien: data?.name_sale,
    du_an: data?.name_category,
    chien_dich: chien_dich[data?.campaign_id]?.name,
    thu_hoi: AppDate.format3(data?.created_at),
    giai_trinh: AppDate.format3(data?.time_send_explanation),
    ngay_duyet: AppDate.format3(data?.updated_at),
  }
  const customerInformation = [
    { label: AppLang('khach_hang'), content: dataInfo.khach_hang },
    { label: AppLang('nhan_vien'), content: dataInfo.nhan_vien },
    { label: AppLang('thu_hoi'), content: dataInfo?.thu_hoi, },
    { label: AppLang('giai_trinh'), content: dataInfo.giai_trinh },
    { label: AppLang('chien_dich'), content: dataInfo.chien_dich },
    { label: AppLang('du_an'), content: dataInfo.du_an },
  ];

  const formRef = React.useRef<any>({
    reason: {},
    desc: {},
    image: {},
  });
  const { onRefreshCount: onRefreshCount1, onRefresh: onRefresh1 } = useListAdDenyWait();
  const { onRefreshCount: onRefreshCount2, onRefresh: onRefresh2 } = useListAdDenyDone();

  const onSend = async () => {
    try {
      const body = {
        reason: formRef.current['reason']?.getValue(),
        desc: formRef.current['desc']?.getValue(),
        image: formRef.current['image']?.getValue('file'),
        id: id,
      };
      let check = ValidateObject(body, {
        reason: ['empty', 'Vui lòng nhập lý do'],
        image: ['emptyArray', 'Vui lòng thêm ảnh xác minh'],
        desc: ['empty', 'Vui lòng nhập nội dung giải trình chi tiết'],
      });
      if (!check) return;
      LoadingApp.show();
      const res = await CustomerApi.sendExplanation(body);
      LoadingApp.hide();
      if (res?.status) {
        onRefreshCount1()
        onRefreshCount2()
        onRefresh1()
        onRefresh2()
        onRefreshListDeny()
        ToastAppSuccess('Gửi giải trình thành công');
        goBack();
      } else {
        ToastAppError(res.mess);
      }
    } catch (error) {
      // Log.d1('submit3', error);
    }
  };

  const { onRefresh: onRefreshListDeny, } = useListDeny();
  const oncancelExplanation = async () => {
    let res: any = null;
    res = await CustomerApi.cancelExplanation({ id: id });
    if (res?.status) {
      goBack();
      onRefreshListDeny()
    } else {
      ToastAppError(res?.mess);
    }
  };
  return (
    <ScreenApp back title={AppLang('chi_tiet_giai_trinh')}>
      <Block flex1>
        <ScrollView refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }>
          <Block>
            {customerInformation.map((props, k) => (
              <RowLabel key={k} {...props} />
            ))}
          </Block>
          <Block h={10} bg="#ddd" />
          {data.status !== STATUS_ADMIN_DENY.vi_pham.id &&
            <Block pad10>
              <TextApp size18 UPPER bold  >{AppLang('thong_tin_giai_trinh')}</TextApp>
              <TextApp style={{ marginTop: 10 }} >{AppLang('mo_ta_giai_trinh')}</TextApp>
              <Form data={data} title={Status?.label} color={Status?.color} />
            </Block>
          }

          {data.status === STATUS_ADMIN_DENY.vi_pham.id &&
            <Block pad={10}>
              <TextApp bold >{AppLang('giai_trinh_vi_pham')}</TextApp>
              <InputRows
                title={AppLang('ly_do').concat('(*):')}
                placeholder='Nhập'
                ref={(ref: any) => (formRef.current['reason'] = ref)}
              />
              <InputRows
                title={AppLang('noi_dung_giai_trinh').concat('(*):')}
                placeholder='Nhập'
                ref={(ref: any) => (formRef.current['desc'] = ref)}
              />
              <InputImages
                title={AppLang('them_anh_xac_minh_cua_khach').concat('(*):')}
                ref={(ref: any) => (formRef.current['image'] = ref)}
              />
            </Block>
          }
          <Block pad={10} row styleBox={{ justifyContent: 'flex-end' }}>
            {data.status == STATUS_ADMIN_DENY.vi_pham.id &&
              <>
                <ButtonApp title={AppLang('bo_qua')} onPress={goBack} background={AppColor('txt_gray')} />
                <Block w={30} />
                <ButtonApp title={AppLang('gui_giai_trinh')} onPress={onSend} background={AppColor('primary')} />
              </>
            }
            {data.status == STATUS_ADMIN_DENY.cho_duyet.id &&
              <>
                <ButtonApp background={AppColor('txt_origin')} title={AppLang('yeu_cau_huy')} onPress={oncancelExplanation} />
              </>
            }
          </Block>
        </ScrollView>
      </Block>
    </ScreenApp>
  );
}
const RowLabel = ({ label, content }: any) => (
  <Block hidden={isEmpty(content)} row pad={10} centerH>
    <Block flex1>
      <TextApp>{label}{':'}</TextApp>
    </Block>
    <Block flex={2} borderBW={1} borderC="#ddd">
      <TextApp style={{ fontWeight: '400' }} color={AppColor('primary')}>
        {content}
      </TextApp>
    </Block>
  </Block>
);
const Form = ({ data, title, color }: any) => {
  const refViewer = React.useRef<any>(null)
  return (
    <Block borderW={1} minH={200} borderR={16} pad={10} marT={10} borderC="gray">
      <TextApp center bold color={color} size={16} >{title}</TextApp>
      <Block>
        <Block borderBW={0.5} borderC="#ddd" padT={10}>
          <TextApp bold>{AppLang('ly_do')}:</TextApp>
          <TextApp style={{ padding: 10 }}>{data.reason}</TextApp>
        </Block>
        <Block borderBW={0.5} borderC="#ddd" padT={10}>
          <TextApp bold>{AppLang('noi_dung_giai_trinh')} :</TextApp>
          <TextApp style={{ padding: 10 }}>{data.desc}</TextApp>
        </Block>
        <TextApp bold style={{ paddingVertical: 10 }}>
          {AppLang('anh_xac_minh')} :
        </TextApp>
        <ListImage
          hiddenCamera
          hiddenClose
          data={arrayData(data?.images).map(uri => ({ uri }))}
          onPressItem={({ index }) => refViewer.current.openIndex(index)}
          styleScrollView={{ paddingTop: 10 }}
          styleContainer={{ marginRight: 15, overflow: 'visible' }}
          styleImage={{ borderRadius: 5, borderWidth: 1, borderColor: '#ddd', overflow: 'hidden' }}

        />
        <ListImageViewer data={arrayData(data?.images).map(uri => ({ uri }))} ref={refViewer} />
      </Block>
    </Block>
  )
};
