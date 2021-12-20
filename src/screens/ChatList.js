import React, { useEffect, useState } from "react";
import { ImageBackground } from "react-native";
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
// import { bgColor } from "../default/colors";

const ChatList = ({ navigation }) => {
  const [chats, setChats] = useState(null);

  const image = {
    uri: "https://i.pinimg.com/474x/8f/b4/59/8fb4595307a2ad198fff92899d69ccb7.jpg",
  };
  //   const [urls, setUrls] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      const currentUser = await AsyncStorage.getItem("user");
      const db = firebase.database();
      const chatRoomRef = db.ref("chats").child(currentUser);

      chatRoomRef.on("value", (snapshot) => {
        if (snapshot.exists()) {
          const info = snapshot.val();
          // console.log(Object.keys(info));
          setChats(info);
        } else {
          console.log("Data unavailable");
        }
      });
    };
    getUser();
  }, []);

  return (
    <Container>
      {chats &&
        Object.keys(chats).map((key) => (
          <Card
            onPress={() =>
              navigation.navigate("pc", {
                contact: chats[key].contact,
                chatId: key,
              })
            }
            key={key}
          >
            <UserInfo>
              <UserImgWrapper>
                <UserImg source="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe2kLngE-uGnLMgRQ_lHMXugatZacKczr7ag&usqp=CAUs" />
              </UserImgWrapper>
              <TextSection>
                <UserInfoText>
                  <UserName>{chats[key].contact}</UserName>
                  {/* <MessageTime>{item.messageTime}</MessageTime> */}
                </UserInfoText>
                {/* <MessageText>{item.messageText}</MessageText> */}
              </TextSection>
            </UserInfo>
          </Card>
        ))}
    </Container>
  );
};

export default ChatList;
