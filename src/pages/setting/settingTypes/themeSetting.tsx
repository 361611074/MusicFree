import React from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import rpx from '@/utils/rpx';
import ListItem from '@/components/listItem';
import {setConfig, useConfig} from '@/common/localConfigManager';
import DocumentPicker from 'react-native-document-picker';
import {Button, List, Switch} from 'react-native-paper';
import ThemeText from '@/components/themeText';
import {fontSizeConst, fontWeightConst} from '@/constants/uiConst';

interface IThemeSettingProps {}
export default function ThemeSetting(props: IThemeSettingProps) {
  const background = useConfig('setting.theme.background');
  const mode = useConfig('setting.theme.mode') ?? 'dark';
  return (
    <View style={style.wrapper}>
      <ThemeText style={style.header}>显示样式</ThemeText>
      <View style={style.sectionWrapper}>
        <List.Item
          title={<ThemeText>深色模式</ThemeText>}
          right={() => (
            <Switch
              value={mode === 'dark'}
              onValueChange={_ => {
                setConfig('setting.theme.mode', _ ? 'dark' : 'light');
              }}></Switch>
          )}></List.Item>
      </View>
      <ThemeText style={style.header}>背景设置</ThemeText>
      <View
        style={[
          style.sectionWrapper,
          {
            flexDirection: 'row',
          },
        ]}>
        <ImageCard
          source={require('@/assets/imgs/background.jpg')}
          onPress={() => {
            setConfig('setting.theme.background', undefined);
          }}></ImageCard>
        <ImageCard
          source={
            background
              ? {
                  uri: background,
                }
              : require('@/assets/imgs/add-image.png')
          }
          onPress={async () => {
            try {
              const result = await DocumentPicker.pickSingle({
                type: DocumentPicker.types.images,
              });
              setConfig('setting.theme.background', result.uri);
            } catch {}
          }}></ImageCard>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  wrapper: {
    width: rpx(750),
    padding: rpx(24),
  },
  header: {
    fontWeight: fontWeightConst.bold,
    fontSize: fontSizeConst.big,
    marginTop: rpx(36)
  },
  sectionWrapper: {
    marginTop: rpx(24),
  },
});

function ImageCard(props: {source: any; onPress: () => void}) {
  const {source, onPress} = props;
  return (
    <Pressable onPress={onPress} style={{marginRight: rpx(24)}}>
      <Image
        source={source}
        style={{
          width: rpx(226),
          height: rpx(339),
          borderRadius: rpx(24),
        }}></Image>
    </Pressable>
  );
}