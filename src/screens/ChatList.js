import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import {
  Container,
  Card,
  UserInfo,
  UserImgWrapper,
  UserImg,
  UserInfoText,
  UserName,
  MessageTime,
  MessageText,
  TextSection,
} from "../styles/MessageStyles";
import firebase from "../storage/firebase";
import AsyncStorage from "@react-native-community/async-storage";

const ChatList = ({ navigation }) => {
  const [chats, setChats] = useState([]);
  //   const [urls, setUrls] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      const currentUser = await AsyncStorage.getItem("user");
      const db = firebase.database();
      const chatRoomRef = db.ref("chats").child(currentUser);
      //   const userRef = db.ref("users").child(currentUser);

      //   userRef.once("value", (snapshot) => {
      //     snapshot.forEach((data) => {
      //       const info = data.val();
      //       setUrls((prev) => [...prev, info.img]);
      //     });
      //   });

      chatRoomRef.once("value", (snapshot) => {
        snapshot.forEach((data) => {
          const info = data.val();
          setChats((prev) => [...prev, info]);
        });
      });
    };
    getUser();
  }, []);

  return (
    <Container>
      <FlatList
        data={chats}
        keyExtractor={(item) => item.contact}
        renderItem={({ item }) => (
          <Card
            onPress={() =>
              navigation.navigate("pc", {
                contact: item.contact,
                chatId: item.chatId,
              })
            }
          >
            <UserInfo>
              <UserImgWrapper>
                <UserImg source="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe2kLngE-uGnLMgRQ_lHMXugatZacKczr7ag&usqp=CAUs" />
              </UserImgWrapper>
              <TextSection>
                <UserInfoText>
                  <UserName>{item.contact}</UserName>
                  {/* <MessageTime>{item.messageTime}</MessageTime> */}
                </UserInfoText>
                {/* <MessageText>{item.messageText}</MessageText> */}
              </TextSection>
            </UserInfo>
          </Card>
        )}
      />
    </Container>
  );
};

export default ChatList;
