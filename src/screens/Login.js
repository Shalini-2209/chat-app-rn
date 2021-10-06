import React, { useState, useEffect } from "react";
import firebase from "../storage/firebase";
import Alert from "../components/Alert";
import { View, StyleSheet, Text } from "react-native";
import { TextInput, Button, Title } from "react-native-paper";
import { bgColor, cherryRed } from "../default/colors";
import AsyncStorage from "@react-native-community/async-storage";

const Login = ({ navigation, checkUser }) => {
  const initalState = {
    name: "",
    pwd: "",
  };

  const [form, setForm] = useState(initalState);
  const [alert, setAlert] = useState("");

  useEffect(() => {
    <Alert alert={alert} setAlert={setAlert} />;
  }, [alert]);

  const handleClick = () => {
    if (form.name === "" || form.pwd === "")
      setAlert("Encountered null values");

    const db = firebase.database();
    const ref = db.ref("users").child(form.name);

    ref.once("value", (snapshot) => {
      snapshot.forEach((data) => {
        const info = data.val();
        // console.log(info.password + " " + form.pwd);

        if (info.password === form.pwd) {
          storeUser();
          checkUser();
          console.log("Logged in");
        }
      });
    });
  };

  const storeUser = async () => {
    await AsyncStorage.setItem("user", form.name);
  };

  return (
    <View style={styles.container}>
      {alert ? (
        <Alert alert={alert} setAlert={setAlert} />
      ) : (
        <>
          <Title
            style={{
              textTransform: "capitalize",
              marginBottom: 60,
              fontWeight: "bold",
            }}
          >
            Sign in and connect people
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
              backgroundColor: cherryRed,
              borderRadius: 40,
            }}
            onPress={handleClick}
          >
            Log me in..
          </Button>

          <Text
            style={{ color: cherryRed }}
            onPress={() => navigation.navigate("register")}
          >
            No account? Create one
          </Text>
        </>
      )}
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

export default Login;
