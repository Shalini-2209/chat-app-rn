import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat, Bubble, Send } from "react-native-gifted-chat";
import { bgColor, cherryRed } from "../default/colors";
import firebase from "../storage/firebase";
import { Text } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

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

export function PrivateChats({ route, navigation: { goBack } }) {
  const [messages, setMessages] = useState([]);
  const params = route.params;
  const [cur, setCur] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      const db = firebase.database();
      const ref = await db.ref("rooms").child(params.chatId).get();
      setCur(await AsyncStorage.getItem("user"));

      ref.forEach((data) => {
        const info = data.val();
        setMessages((prev) => [...prev, info]);
      });
    };

    fetchMessages();
  }, []);

  const pushData = async (msg) => {
    const db = firebase.database().ref("rooms").child(params.chatId);

    db.push({
      _id: await AsyncStorage.getItem("user"),
      text: msg,
      createdAt: Date.now(),
      user: {
        _id: params.contact,
        //name: getUser(),
        avatar: "https://placeimg.com/140/140/any",
      },
    });
  };

  const onSend = useCallback((messages = []) => {
    pushData(messages[0].text);

    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  console.log(cur);

  return (
    <>
      <Text onPress={() => goBack()}>Back</Text>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderSend={renderSend}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: cur,
        }}
      />
    </>
  );
}
