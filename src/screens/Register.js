import { View, StyleSheet, Text } from "react-native";
import { Button, Title, TextInput } from "react-native-paper";
import React, { useEffect, useState } from "react";
import firebase from "../storage/firebase";
import { bgColor, cherryRed } from "../default/colors";
import Alert from "../components/Alert";

const Register = ({ navigation }) => {
  const initalState = {
    name: "",
    pwd: "",
    img: "",
  };

  const [form, setForm] = useState(initalState);
  const [cpass, setCpass] = useState("");
  const [alert, setAlert] = useState("");

  useEffect(() => {
    <Alert alert={alert} setAlert={setAlert} />;
  }, [alert]);

  const handleClick = () => {
    if (form.name === "" || form.pwd === "" || cpass === "")
      setAlert("Encountered null values");
    else {
      if (form.pwd !== cpass) setAlert("Password mismatch!");
      else {
        const db = firebase.database().ref(`users/${form.name}`);
        db.set({
          password: form.pwd,
          img: form.img,
        });
        setForm(initalState);
        setCpass("");
        setAlert("User registered!");
      }
    }
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
            Tell us more about you
          </Title>
          <TextInput
            // label="User Name"
            value={form.name}
            placeholder="User Name"
            mode="outlined"
            outlineColor={cherryRed}
            right={<TextInput.Icon name="account" />}
            onChangeText={(text) => setForm({ ...form, name: text })}
          />
          <TextInput
            // label="Password"
            value={form.pwd}
            placeholder="Password"
            secureTextEntry
            mode="outlined"
            outlineColor={cherryRed}
            right={<TextInput.Icon name="lock" />}
            onChangeText={(pass) => setForm({ ...form, pwd: pass })}
          />

          <TextInput
            // label="Confirm Password"
            value={cpass}
            placeholder="Confirm Password"
            secureTextEntry
            outlineColor={cherryRed}
            selectionColor={cherryRed}
            mode="outlined"
            right={<TextInput.Icon name="lock-check" />}
            onChangeText={(pass) => setCpass(pass)}
          />

          <TextInput
            // label="Password"
            value={form.img}
            placeholder="Profile picture"
            mode="outlined"
            outlineColor={cherryRed}
            right={<TextInput.Icon name="image" />}
            onChangeText={(url) => setForm({ ...form, img: url })}
          />

          <Button
            icon="account-plus"
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
            Create an account
          </Button>
          <Text
            style={{ color: cherryRed }}
            onPress={() => navigation.navigate("login")}
          >
            Have an account? Login
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
  },
});

export default Register;
