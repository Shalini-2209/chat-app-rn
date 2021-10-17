import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import React from "react";
import { bgColor } from "../default/colors";
import AddToContacts from "../screens/AddToContacts";
import LogOut from "../screens/LogOut";
import ChatList from "../screens/ChatList";

const Tab = createMaterialBottomTabNavigator();

export default function MyTabs({ checkUser, initComponent }) {
  return (
    <Tab.Navigator
      initialRouteName={initComponent}
      activeColor={bgColor}
      barStyle={{ backgroundColor: "black" }}
    >
      <Tab.Screen name="ChatList" component={ChatList} />
      <Tab.Screen name="New contact" component={AddToContacts} />
      <Tab.Screen
        name="Log Out"
        component={() => <LogOut checkUser={checkUser} />}
      />
    </Tab.Navigator>
  );
}
