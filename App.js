import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import { StyleSheet, Text, View } from "react-native";
import Register from "./src/screens/Register";
import Login from "./src/screens/Login";

function App() {
  const [user, setUser] = useState("");

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const user = await AsyncStorage.getItem("user");
    if (user) {
      setUser(user);
    }
  };

  return (
    <View style={styles.container}>
      {user.length ? (
        <View>
          <Text onPress={() => setUser("")}>
            Open up App.js to start working on your app!
          </Text>
          <StatusBar style="auto" />
        </View>
      ) : (
        // <Register />
        <Login setUser={setUser} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
