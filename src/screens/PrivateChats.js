import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat, Bubble, Send } from "react-native-gifted-chat";
import { bgColor, cherryRed } from "../default/colors";

const renderBubble = (props) => {
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        right: { borderTopRightRadius: 15, backgroundColor: cherryRed },
        left: { borderTopLeftRadius: 15, backgroundColor: bgColor },
      }}
      containerToPreviousStyle={{
        right: { borderTopRightRadius: 15 },
        left: { borderTopLeftRadius: 15 },
      }}
      containerToNextStyle={{
        right: { borderTopRightRadius: 15 },
        left: { borderTopLeftRadius: 15 },
      }}
      containerStyle={{
        right: { borderTopRightRadius: 15 },
        left: { borderTopLeftRadius: 15 },
      }}
    />
  );
};

function renderSend(props) {
  return <Send {...props} textStyle={{ color: "#990012" }} label={"Send"} />;
}
export function PrivateChats() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  return (
    <GiftedChat
      messages={messages}
      renderBubble={renderBubble}
      renderSend={renderSend}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
  );
}
