import React, { useState, useEffect } from "react";
import Login from "../screens/Login";
import Register from "../screens/Register";
import ChatList from "../screens/ChatList";
import AddToContacts from "../screens/AddToContacts";
import { PrivateChats } from "../screens/PrivateChats";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-community/async-storage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyTabs from "./bottom-tabs";
import { cherryRed } from "../default/colors";

const Routes = () => {
  const Stack = createNativeStackNavigator();
  const [user, setUser] = useState("");

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    let res = await AsyncStorage.getItem("user");
    if (res) setUser(res);
    else setUser("");
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          headerStyle: {
            backgroundColor: "",
          },
        }}
      >
        {user ? (
          <>
            <Stack.Screen
              name="tabs"
              component={() => <MyTabs checkUser={checkUser} />}
            />
            <Stack.Screen
              name="addtocontacts"
              component={AddToContacts}
              options={{ headerShown: true }}
            />
            <Stack.Screen
              name="list"
              component={ChatList}
              options={{ headerShown: true }}
            />
            {/* <Stack.Screen name="register" component={Register} /> */}
            <Stack.Screen
              name="pc"
              component={PrivateChats}
              options={{ headerShown: true }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="login"
              component={({ navigation }) => (
                <Login navigation={navigation} checkUser={checkUser} />
              )}
            />
            <Stack.Screen name="register" component={Register} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
