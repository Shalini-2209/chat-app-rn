import React, { useState, useEffect } from "react";
import firebase from "../storage/firebase";
import Alert from "../components/Alert";
import { View, StyleSheet, Text } from "react-native";
import { TextInput, Button, Title } from "react-native-paper";
import { bgColor, cherryRed } from "../default/colors";
import AsyncStorage from "@react-native-community/async-storage";

const AddToContacts = ({ navigation }) => {
  const [contactName, setContactName] = useState("");
  const [alert, setAlert] = useState("");

  const handleClick = async () => {
    if (contactName) {
      const chatId = Date.now();
      const currentUser = await AsyncStorage.getItem("user");

      const db = firebase.database();
      const personOne = db.ref("chats").child(currentUser);
      const personTwo = db.ref("chats").child(contactName);

      personOne.push({
        chatId: chatId,
        contact: contactName,
      });

      personTwo.push({
        chatId: chatId,
        contact: currentUser,
      });
      setAlert("Added Successfully!");
    } else {
      setAlert("Enter a contact name!");
    }
  };

  useEffect(() => {
    <Alert alert={alert} setAlert={setAlert} />;
  }, [alert]);

  return (
    <View style={styles.container}>
      <Title
        style={{
          textTransform: "capitalize",
          marginBottom: 60,
          fontWeight: "bold",
        }}
      >
        Expand your network
      </Title>
      <TextInput
        placeholder="Contact Name"
        value={contactName}
        mode="outlined"
        outlineColor={cherryRed}
        right={<TextInput.Icon name="account-box-outline" />}
        onChangeText={(text) => setContactName(text)}
        style={{ marginBottom: 2 }}
      />

      <Button
        icon="import"
        mode="contained"
        dark="true"
        style={{
          margin: 25,
          paddingHorizontal: 15,
          paddingVertical: 7,
          backgroundColor: cherryRed,
          borderRadius: 40,
        }}
        onPress={handleClick}
      >
        Add to Chat list
      </Button>

      <Text
        style={{ color: cherryRed }}
        onPress={() => navigation.navigate("login")}
      >
        Back
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bgColor,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
});

export default AddToContacts;
