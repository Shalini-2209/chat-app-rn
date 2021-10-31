import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat, Bubble, Send } from "react-native-gifted-chat";
import { bgColor, cherryRed } from "../default/colors";
import firebase from "../storage/firebase";

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

export function PrivateChats({ route }) {
  const [messages, setMessages] = useState([]);
  const params = route.params;

  useEffect(() => {
    const fetchMessages = async () => {
      const db = firebase.database();
      const ref = await db.ref("rooms").child(params.chatId).get();

      // ref.once("value").then((snapshot) => {
      //   console.log(snapshot.val());
      //   setMessages((prev) => [...prev, snapshot.val()]);
      // });

      ref.forEach((data) => {
        const info = data.val();
        console.log(info);
        setMessages((prev) => [...prev, data.val()]);
      });
    };

    fetchMessages();
  }, []);

  const pushData = async (msg) => {
    const db = firebase.database().ref(`rooms/${params.chatId}/${msg._id}`);
    db.set(msg);

    // db.push({
    //   _id: await AsyncStorage.getItem("user"),
    //   text: msg,
    //   createdAt: Date.now(),
    //   user: {
    //     _id: params.contact,
    //     //name: getUser(),
    //     avatar: "https://placeimg.com/140/140/any",
    //   },
    // });
  };

  const onSend = useCallback((messages = []) => {
    messages[0].createdAt = Date.now();
    pushData(messages[0]);

    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  return (
    <>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderSend={renderSend}
        onSend={(messages) => onSend(messages)}
        alwaysShowSend
        user={{
          _id: params.contact,
          name: params.contact,
        }}
      />
    </>
  );
}
