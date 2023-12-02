// import { AddChatMessageCopyIcon } from './features/ChatMessageCopyIcon';
// import { useShallow } from 'zustand/react/shallow';
// import { useGlobalSettingStore } from '../stores';
import { EmojiFix } from './features/EmojiFix';
import { YTDLiveChat } from './features/YTDLiveChat';
import { useTabLocatoin } from './hooks/useTabLocatoin';

function extractYouTubeID(url: string) {
  const regex = /v=([^&]*)/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

const Content = () => {
  const { pathname, search } = useTabLocatoin();
  const videoId = extractYouTubeID(search);

  return (
    <>
      {/* If the pathname of each iframe is /live_chat */}
      {pathname === '/live_chat' ? (
        <>
          <EmojiFix />
          {/* <AddChatMessageCopyIcon /> */}
        </>
      ) : null}
      {/* If the pathname of the tab is watch */}
      {pathname === '/watch' && videoId ? <YTDLiveChat videoID={videoId} /> : null}
    </>
  );
};

export default Content;
