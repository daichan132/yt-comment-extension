import React from 'react';
import styles from '../../styles/YTDLiveChatSetting/YTDLiveChatSetting.module.scss';
import { RiCloseLine, RiFontColor, RiFontFamily, RiHeartLine } from 'react-icons/ri';
import classNames from 'classnames';
import { BgColorPicker } from './BgColorPicker';
import { BlurSlider } from './BlurSlider';
import { FontColorPicker } from './FontColorPicker';
import { AlwaysOnDisplaySwitch } from './AlwaysOnDisplaySwitch';
import { IoColorFillOutline, IoTimerOutline } from 'react-icons/io5';
import { MdBlurOn } from 'react-icons/md';
import { FontFamilyInput } from './FontFamilyInput';
import { IconType } from 'react-icons';
import { ReactionButtonDisplaySwitch } from './ReactionButtonDisplaySwitch';

interface itemType {
  icon: IconType;
  title: string;
  data: React.ReactNode;
}

const items: itemType[] = [
  {
    icon: IoTimerOutline,
    title: 'Always on Display',
    data: <AlwaysOnDisplaySwitch />,
  },
  {
    icon: IoColorFillOutline,
    title: 'Background Color',
    data: <BgColorPicker />,
  },
  {
    icon: RiFontColor,
    title: 'Font Color',
    data: <FontColorPicker />,
  },
  {
    icon: RiFontFamily,
    title: 'Font Family',
    data: <FontFamilyInput />,
  },
  {
    icon: MdBlurOn,
    title: 'Blur',
    data: <BlurSlider />,
  },
  {
    icon: RiHeartLine,
    title: 'Reaction Button',
    data: <ReactionButtonDisplaySwitch />,
  },
];

interface YTDLiveChatSettingType {
  closeModal?: () => void;
}
export const YTDLiveChatSetting = ({ closeModal }: YTDLiveChatSettingType) => {
  return (
    <div className={styles['settings']}>
      <div className={styles['header']}>
        <div className={styles['menu']}>
          <div className={classNames(styles['menu-item'])}>Settings</div>
        </div>
        <RiCloseLine
          className={styles['close-button']}
          onClick={() => closeModal && closeModal()}
          size={20}
        />
      </div>
      <div className={styles['content']}>
        {items.map((item) => {
          return (
            <React.Fragment key={item.title}>
              <div className={styles['content-item']}>
                <div className={styles['title-with-icon']}>
                  {<item.icon size={20} />}
                  <div>{item.title}</div>
                </div>
                {item.data}
              </div>
              <hr />
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
