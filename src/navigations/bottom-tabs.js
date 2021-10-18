import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import React from "react";
import { bgColor, cherryRed } from "../default/colors";
import AddToContacts from "../screens/AddToContacts";
import LogOut from "../screens/LogOut";
import ChatList from "../screens/ChatList";

const Tab = createMaterialBottomTabNavigator();

export default function MyTabs({ checkUser, initComponent }) {
  return (
    <Tab.Navigator
      initialRouteName={initComponent}
      activeColor="white"
      barStyle={{ backgroundColor: cherryRed }}
    >
      <Tab.Screen
        name="ChatList"
        component={ChatList}
        options={{
          tabBarLabel: "Contacts",
          tabBarIcon: () => <Entypo name="chat" size={24} color={bgColor} />,
        }}
      />
      <Tab.Screen
        name="New contact"
        component={AddToContacts}
        options={{
          tabBarLabel: "Add user",
          tabBarIcon: () => (
            <Ionicons name="person-add-sharp" size={24} color={bgColor} />
          ),
        }}
      />
      <Tab.Screen
        name="Log Out"
        component={() => <LogOut checkUser={checkUser} />}
        options={{
          tabBarLabel: "Log out",
          tabBarIcon: () => <Entypo name="log-out" size={24} color={bgColor} />,
        }}
      />
    </Tab.Navigator>
  );
}
