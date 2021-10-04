import React, { useState } from "react";
import firebase from "../storage/firebase";
import Alert from "../components/Alert";
import { View, StyleSheet, Text } from "react-native";
import { TextInput, Button, Title } from "react-native-paper";
import { bgColor, cherryRed } from "../default/colors";
import AsyncStorage from "@react-native-community/async-storage";

const Login = ({ setUser }) => {
  const initalState = {
    name: "",
    pwd: "",
  };

  const [form, setForm] = useState(initalState);
  const [alert, setAlert] = useState("");

  const handleClick = () => {
    if (form.name === "" || form.pwd === "" || cpass === "")
      setAlert("Encountered null values");

    const db = firebase.database();
    const ref = db.ref("users");

    ref.once("value", (snapshot) => {
      let data = snapshot.val();
      for (let i in data) {
        if (data[i].name === form.name && data[i].password === form.pwd) {
          storeUser();
          setUser(form.name);

          console.log("Logged in");
          break;
        }
      }
    });
  };

  const storeUser = async () => {
    await AsyncStorage.setItem("user", form.name);
  };

  //   if (alert !== "") {
  //     return <Alert alert={alert} setAlert={setAlert} />;
  //   }
  return (
    <View style={styles.container}>
      <Title
        style={{
          textTransform: "capitalize",
          marginBottom: 60,
          fontWeight: "bold",
        }}
      >
        Tell us more about you
      </Title>
      <TextInput
        placeholder="User Name"
        value={form.name}
        mode="outlined"
        outlineColor={cherryRed}
        right={<TextInput.Icon name="account" />}
        onChangeText={(text) => setForm({ ...form, name: text })}
        style={{ marginBottom: 2 }}
      />
      <TextInput
        placeholder="Password"
        value={form.pwd}
        secureTextEntry
        mode="outlined"
        outlineColor={cherryRed}
        right={<TextInput.Icon name="lock" />}
        onChangeText={(pass) => setForm({ ...form, pwd: pass })}
      />

      <Button
        icon="import"
        mode="contained"
        dark="true"
        style={{
          margin: 25,
          paddingHorizontal: 15,
          paddingVertical: 7,
          backgroundColor: "#C24641",
          borderRadius: 40,
        }}
        onPress={handleClick}
      >
        Log me in..
      </Button>

      <Text style={{ color: "red" }}>No account? Create one</Text>
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
  },
});

export default Login;
