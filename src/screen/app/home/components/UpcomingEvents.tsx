import * as React from 'react';
import moment from 'moment';
import FastImage from 'react-native-fast-image';
import {StyleSheet, ScrollView, Dimensions} from 'react-native';

import {AppColor} from '@lib/utils';
import {AppLang} from '@assets/langs';
import {Block, TextApp, Touch, IconApp} from '@lib/components';

const WIDTH = Dimensions.get('screen').width;

const UpcomingEvents = (props: any, ref: any) => {
  const scrollRef = React.useRef<ScrollView>(null);
  const [currentPage, setCurrentPage] = React.useState(0);

  const goToNextPage = () => {
    let nextPage = currentPage + 1;
    if (nextPage >= dataNhap.length) {
      nextPage = 0;
    }
    scrollRef.current?.scrollTo({x: nextPage * (WIDTH - 20), animated: true});
    setCurrentPage(nextPage);
  };

  const goToPreviousPage = () => {
    let previousPage = currentPage - 1;
    if (previousPage < 0) {
      previousPage = dataNhap.length - 1;
    }
    scrollRef.current?.scrollTo({
      x: previousPage * (WIDTH - 20),
      animated: true,
    });
    setCurrentPage(previousPage);
  };

  const onScrollEnd = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const pageIndex = Math.round(offsetX / (WIDTH - 20));
    setCurrentPage(pageIndex);
  };

  const renderEventItem = (item: any, index: number) => (
    <Touch key={index} w={WIDTH - 20}>
      <FastImage
        source={{uri: item.link}}
        style={styles.image}
        resizeMode={FastImage.resizeMode.cover}
      />
      <Block row marT10 alignCenter>
        <Block flex6>
          <TextApp bold>{item.tieu_de}</TextApp>
        </Block>
        <Block flex4 row alignCenter>
          <IconApp
            name="clock"
            size={24}
            type="EvilIcons"
            style={{marginRight: 2}}
          />
          <TextApp color="red" bold>
            {item.trang_thai}
          </TextApp>
        </Block>
      </Block>
      <TextApp>{`Số người tham gia: ${item.so_nguoi_tham_gia} người`}</TextApp>
    </Touch>
  );

  return (
    <Block padH10 padT={5} marT10 _background="white">
      <Block row alignCenter justifyContent="space-between">
        <TextApp bold size={16}>
          {AppLang('su_kien_sap_dien_ra')}
        </TextApp>
        <Touch>
          <TextApp color={AppColor.primary}>{AppLang('xem_tat_ca')}</TextApp>
        </Touch>
      </Block>
      <ScrollView
        horizontal
        pagingEnabled
        ref={scrollRef}
        scrollEnabled={true}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScrollEnd}
        contentContainerStyle={{marginVertical: 10}}>
        {dataNhap.map(renderEventItem)}
      </ScrollView>
      <Block
        row
        justifyContent="space-between"
        w={WIDTH}
        style={{position: 'absolute', zIndex: 1, top: 100}}>
        <Touch
          onPress={goToPreviousPage}
          _background={'#D3D3D3AB'}
          pad5
          marL={20}
          borderR20>
          <IconApp
            name="chevron-small-left"
            size={24}
            color={AppColor.white}
            type="Entypo"
          />
        </Touch>
        <Touch
          onPress={goToNextPage}
          _background={'#D3D3D3AB'}
          pad5
          marR={20}
          borderR20>
          <IconApp
            name="chevron-small-right"
            size={24}
            color={AppColor.white}
            type="Entypo"
          />
        </Touch>
      </Block>
    </Block>
  );
};

export default React.forwardRef(UpcomingEvents);

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
});

export const dataNhap = [
  {
    link: 'https://qsland.vn/Data/Sites/1/News/2668/qsland-ngay-hoi-tuyen-dung-hutech.jpg',
    so_nguoi_tham_gia: 10,
    trang_thai: 'Đã hoàn thành',
    tieu_de: 'Qs Land - Tặng Quà Quốc Tế Thiếu Nhi Cho Con CBNV',
  },
  {
    link: 'https://scontent-hkg4-1.xx.fbcdn.net/v/t39.30808-6/354039094_746973774098563_5498369953868184668_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=mAhR0iOL7N8AX_zSzu4&_nc_ht=scontent-hkg4-1.xx&oh=00_AfCxxi37I06uooapVyfpSMRQ8xmnFLWPTbFD--QXX9QDhQ&oe=649EC4F8',
    so_nguoi_tham_gia: 10,
    trang_thai: 'Đã hoàn thành',
    tieu_de: 'Qs Land - Tặng Quà Quốc Tế Thiếu Nhi Cho Con CBNV',
  },
  {
    link: 'https://scontent-hkg4-1.xx.fbcdn.net/v/t39.30808-6/353835203_6277592192321456_799837368874476204_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=aIyh3YZlB-IAX9tqLWH&_nc_ht=scontent-hkg4-1.xx&oh=00_AfCHSfqOfBoRyY0h2T6c-RbKcFzJN4J_NshUoku72d1u9Q&oe=649D84DE',
    so_nguoi_tham_gia: 10,
    trang_thai: 'Đã hoàn thành',
    tieu_de: 'Qs Land - Tặng Quà Quốc Tế Thiếu Nhi Cho Con CBNV',
  },
  {
    link: 'https://scontent-hkg4-1.xx.fbcdn.net/v/t39.30808-6/347247717_791349772513348_3434110514416814757_n.jpg?stp=cp6_dst-jpg&_nc_cat=106&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=ME90U7ej8McAX9OI5R4&_nc_ht=scontent-hkg4-1.xx&oh=00_AfAFl1XDD0Svwi8XiNCX8XXEuq35auH7YybPKlwBSHTcqA&oe=649EAF87',
    so_nguoi_tham_gia: 10,
    trang_thai: 'Đã hoàn thành',
    tieu_de: 'Qs Land - Tặng Quà Quốc Tế Thiếu Nhi Cho Con CBNV',
  },
  {
    link: 'https://scontent-hkg4-1.xx.fbcdn.net/v/t39.30808-6/351160216_3422916354626182_1089396909861530798_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=w8vz9aVm-v4AX_Yl7k8&_nc_ht=scontent-hkg4-1.xx&oh=00_AfC0OFi4eO7zXsq5v_xewunllSL97oa8u2qEUfNWd8c3Gg&oe=649DAD3D',
    so_nguoi_tham_gia: 10,
    trang_thai: 'Đã hoàn thành',
    tieu_de: 'Qs Land - Tặng Quà Quốc Tế Thiếu Nhi Cho Con CBNV',
  },
];
