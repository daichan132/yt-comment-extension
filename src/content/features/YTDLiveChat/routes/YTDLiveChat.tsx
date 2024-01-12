import { useRef } from 'react';

import { CSSTransition } from 'react-transition-group';
import { useShallow } from 'zustand/react/shallow';

import { useYTDLiveChatNoLsStore } from '../../../../stores';
import { Draggable } from '../components/Draggable/Draggable';
import { DisplayEffect } from '../components/EffectComponent/DisplayEffect';
import { WindowResizeEffect } from '../components/EffectComponent/WindowResizeEffect';
import { YTDLiveChatIframe } from '../components/YTDLiveChatIframe/YTDLiveChatIframe';
import { YTDLiveChatSetting } from '../components/YTDLiveChatSetting/YTDLiveChatSetting';
import { useIsShow } from '../hooks/useIsShow';
import fade from '../styles/Fade.module.scss';

interface YTDLiveChatType {
  videoID: string;
}
export const YTDLiveChat = ({ videoID }: YTDLiveChatType) => {
  const { isFullscreen, isShow, liveChatReplaySrc } = useIsShow(videoID);
  const nodeRef = useRef(null);
  const { setIsHover } = useYTDLiveChatNoLsStore(
    useShallow((state) => ({ setIsHover: state.setIsHover })),
  );
  return (
    isFullscreen && (
      <>
        <CSSTransition nodeRef={nodeRef} in={isShow} timeout={500} classNames={fade} unmountOnExit>
          <div
            ref={nodeRef}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            <DisplayEffect />
            <WindowResizeEffect />
            <Draggable>
              <YTDLiveChatIframe
                src={liveChatReplaySrc ? liveChatReplaySrc : `/live_chat?v=${videoID}`}
              />
            </Draggable>
          </div>
        </CSSTransition>
        <YTDLiveChatSetting />
      </>
    )
  );
};
