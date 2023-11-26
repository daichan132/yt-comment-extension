// useIframeLoader.js
import { useRef } from 'react';
import { useYLCBgColorChange } from '../YTDLiveChatSetting/useYLCBgColorChange';
import { useYLCFontColorChange } from '../YTDLiveChatSetting/useYLCFontColorChange';
import { useShallow } from 'zustand/react/shallow';
import { useYLCFontFamilyChange } from '../YTDLiveChatSetting/useYLCFontFamilyChange';
import { useYLCFontSizeChange } from '../YTDLiveChatSetting/useYLCFontSizeChange';
import { useYTDLiveChatNoLsStore, useYTDLiveChatStore } from '../../../../../stores';
import { useMount, useUnmount, useUpdateEffect } from 'react-use';
import { useYLCSpaceChange } from '../YTDLiveChatSetting/useYLCSpaceChange';
import { useYLCUserNameDisplayChange } from '../YTDLiveChatSetting/useYLCUserNameDisplayChange';

export const useIframeLoader = () => {
  const ref = useRef<HTMLIFrameElement>(null);
  const { alwaysOnDisplay, chatOnlyDisplay } = useYTDLiveChatStore(
    useShallow((state) => ({
      alwaysOnDisplay: state.alwaysOnDisplay,
      chatOnlyDisplay: state.chatOnlyDisplay,
    })),
  );
  const { isDisplay, setIsDisplay, setIsIframeLoaded, setClip } = useYTDLiveChatNoLsStore(
    useShallow((state) => ({
      isDisplay: state.isDisplay,
      setIsDisplay: state.setIsDisplay,
      setIsIframeLoaded: state.setIsIframeLoaded,
      setClip: state.setClip,
    })),
  );
  const { changeColor: changBgColor } = useYLCBgColorChange();
  const { changeColor: changFontColor } = useYLCFontColorChange();
  const { changeFontFamily } = useYLCFontFamilyChange();
  const { changeFontSize } = useYLCFontSizeChange();
  const { changeSpace } = useYLCSpaceChange();
  const { changeDisplay: changeUserNameDisplay } = useYLCUserNameDisplayChange();
  useMount(() => {
    if (!ref.current) return;
    ref.current.onload = async () => {
      const body = ref.current?.contentDocument?.body;
      if (body) {
        const { fontSize, fontFamily, bgColor, fontColor, userNameDisplay, space } =
          useYTDLiveChatStore.getState();
        body.classList.add('custom-yt-app-live-chat-extension');
        body.classList.add('always-on-display');
        body.classList.add('display');
        const header = (body.querySelector('yt-live-chat-header-renderer')?.clientHeight || 0) - 8;
        const input =
          (body.querySelector('yt-live-chat-message-input-renderer')?.clientHeight ||
            body.querySelector('yt-live-chat-restricted-participation-renderer')?.clientHeight ||
            0) - 4;
        if (header && input) setClip({ header, input });
        changBgColor(bgColor);
        changFontColor(fontColor);
        changeUserNameDisplay(userNameDisplay);
        changeFontFamily(fontFamily);
        changeFontSize(fontSize);
        changeSpace(space);
        setIsIframeLoaded(true);
        setIsDisplay(true);
      }
    };
  });
  useUpdateEffect(() => {
    const body = ref.current?.contentDocument?.body;
    if (!body) return;

    if (isDisplay) {
      body.classList.add('display');
    } else {
      body.classList.remove('display');
    }

    if (alwaysOnDisplay && chatOnlyDisplay) {
      body.classList.add('always-on-display');
    } else {
      body.classList.remove('always-on-display');
    }
  }, [alwaysOnDisplay, isDisplay, chatOnlyDisplay]);
  useUnmount(() => {
    setIsIframeLoaded(false);
  });

  return { ref };
};