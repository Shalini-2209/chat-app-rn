import React, { useState, useEffect } from "react";
import Login from "../screens/Login";
import Register from "../screens/Register";
import { ChatList } from "../screens/ChatList";
import { PrivateChats } from "../screens/PrivateChats";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-community/async-storage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Routes = () => {
  const Stack = createNativeStackNavigator();
  const [user, setUser] = useState("");

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    let res = await AsyncStorage.getItem("user");
    if (res) setUser(res);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="register" component={Register} />
            <Stack.Screen
              name="chats"
              component={PrivateChats}
              options={{ headerShown: true }}
            />
          </>
        ) : (
          <Stack.Screen name="signin" component={Login} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
