import { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import {
  Chat,
  Channel,
  VirtualizedMessageList,
  ChannelHeader,
  ChannelList,
  MessageInput,
  Window,
  Thread,
  MessageSimple
} from "stream-chat-react";

import "stream-chat-react/dist/css/index.css";
import "./styles.css";

const API_KEY = "t442dfkucxcj";

// Setup two users, so that we can simulate send/receive messages using two urls:.
// https://m3j4h.csb.app/
// https://m3j4h.csb.app/?alt

const USER_ID1 = "ricky";
const USER_TOKEN1 =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoicmlja3kifQ.I1ekamSR9TGO3TIi-I07zg8noKmr_AnFLbBR9auM7Fc";
const USER_ID2 = "julian";
const USER_TOKEN2 =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoianVsaWFuIn0.Tb2rdur-P3HOh1-hiug4R0Nk_8LGZZ8zkCXNOfAnE94";

const chatClient = StreamChat.getInstance(API_KEY);

const alt = window.location.search === "?alt";
const userId = alt ? USER_ID2 : USER_ID1;
const userToken = alt ? USER_TOKEN2 : USER_TOKEN1;

document.title = `${userId} - Stream test`;

chatClient.connectUser(
  {
    id: userId,
    name: userId,
    image: `https://getstream.io/random_png/?id=${userId}&name=${userId}`
  },
  userToken
);

const channel = chatClient.channel("messaging", "hallway", {
  members: [USER_ID1, USER_ID2]
});
channel.watch();

/**
 * Set defaultItemHeight to the pixel height of your one-liner message.
 * This speeds up rendering and minimizes reflows.
 *
 * If you're using a custom message, ensure that reactions don't change the height of the item.
 * This improves the end-user experience and performance, as the chat "bounses" less.
 *
 * The `increaseViewportBy` decreases the rerenders for the message sender,
 * and eliminates short "blinks" when new messages appear.
 *
 * stickToBottomScrollBehavior can be either 'smooth' or 'auto'
 * smooth may have hard time catching up with many incoming messages. Use 'auto' for busy chats.
 */
const App = () => (
  <Chat client={chatClient}>
    <ChannelList />
    <Channel>
      <Window>
        <ChannelHeader />
        <VirtualizedMessageList
          disableDateSeparator={true}
          stickToBottomScrollBehavior="auto"
          message={MessageSimple}
          defaultItemHeight={60}
          additionalVirtuosoProps={{
            increaseViewportBy: { top: 0, bottom: 200 },
            itemSize: (el) => el.getBoundingClientRect().height
          }}
        />
        <MessageInput focus />
      </Window>
      <Thread />
    </Channel>
  </Chat>
);

export default App;
