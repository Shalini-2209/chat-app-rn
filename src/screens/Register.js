import { View, StyleSheet } from "react-native";
import { TextInput, Button, Title } from "react-native-paper";
import React, { useState } from "react";
import firebase from "../storage/firebase";
import { bgColor, cherryRed } from "../default/colors";
import Alert from "../components/Alert";

const Register = () => {
  const initalState = {
    name: "",
    pwd: "",
  };

  const [form, setForm] = useState(initalState);
  const [cpass, setCpass] = useState("");
  const [alert, setAlert] = useState("");

  const handleClick = () => {
    if (form.name === "" || form.pwd === "" || cpass === "")
      setAlert("Encountered null values");
    else {
      if (form.pwd !== cpass) setAlert("Password mismatch!");
      else {
        const db = firebase.database().ref("users");
        db.push({
          name: form.name,
          password: form.pwd,
        });
        setForm(initalState);
        setCpass("");
        setAlert("User registered!");
      }
    }
  };

  if (alert !== "") {
    return <Alert alert={alert} setAlert={setAlert} />;
  }

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
        label="User Name"
        value={form.name}
        mode="outlined"
        outlineColor={cherryRed}
        right={<TextInput.Icon name="account" />}
        onChangeText={(text) => setForm({ ...form, name: text })}
        style={{ marginBottom: 2 }}
      />
      <TextInput
        label="Password"
        value={form.pwd}
        secureTextEntry
        mode="outlined"
        outlineColor={cherryRed}
        right={<TextInput.Icon name="lock" />}
        onChangeText={(pass) => setForm({ ...form, pwd: pass })}
      />

      <TextInput
        label="Confirm Password"
        value={cpass}
        secureTextEntry
        outlineColor={cherryRed}
        selectionColor={cherryRed}
        mode="outlined"
        right={<TextInput.Icon name="lock-check" />}
        onChangeText={(pass) => setCpass(pass)}
      />

      <Button
        icon="account-plus"
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
        Create an account
      </Button>
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

export default Register;
