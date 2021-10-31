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
  const [isReset, setIsReset] = useState(false);

  useEffect(() => {
    <Alert alert={alert} setAlert={setAlert} />;
  }, [alert]);

  const handleClick = () => {
    if ((!isReset && form.name === "") || form.pwd === "")
      setAlert("Encountered null values");

    const db = firebase.database();
    const ref = db.ref(`users/${form.name}`);

    if (isReset) {
      if (form.pwd === "") setAlert("Missing password");
      else {
        ref
          .update({ password: form.pwd })
          .then(() => setAlert("Updated new Password!"));
        setForm(initalState);
      }
    } else {
      ref.once("value").then((snapshot) => {
        const info = snapshot.val();
        console.log("User data: ", snapshot.val());
        if (info.password === form.pwd) {
          storeUser();
          checkUser();
          console.log("Logged in");
        }
      });
    }
  };

  const resetPassword = () => {
    if (!isReset && form.name === "") setAlert("Fill user name");
    else {
      setIsReset(!isReset);
    }
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
            {isReset ? "Reset New Password" : "Sign in and connect people"}
          </Title>

          {!isReset && (
            <TextInput
              placeholder="User Name"
              value={form.name}
              mode="outlined"
              outlineColor={cherryRed}
              right={<TextInput.Icon name="account" />}
              onChangeText={(text) => setForm({ ...form, name: text })}
              style={{ marginBottom: 2 }}
            />
          )}

          <TextInput
            placeholder={isReset ? "New Password" : "Password"}
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
            {isReset ? "Update Password" : " Log me in.."}
          </Button>

          {!isReset && (
            <Text
              style={{ color: cherryRed }}
              onPress={() => navigation.navigate("register")}
            >
              No account? Create one
            </Text>
          )}

          <Text
            style={{
              color: cherryRed,
              marginTop: 10,
              textDecorationLine: "underline",
            }}
            onPress={resetPassword}
          >
            {isReset ? "Back to Login" : "Forgot Password?"}
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
