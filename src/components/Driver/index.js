import React, { useState } from "react";
import { View, Text, SafeAreaView } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-community/async-storage";
import { Avatar, Flex, Button } from "@react-native-material/core";

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import Maps from "./pages/Map";
import Profiles from "./pages/Profile";
import Home from "../index";
import axios from "../../config/axios";
import History from "./pages/History";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#132875",
  },
};
function HomeMap({ navigation, route }) {
  return <Maps value={route.params.value} />;
}
function Profile({ navigation, route }) {
  return <Profiles value={route.params.value} />;
}

function Notifications() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Notifications Screen</Text>
    </View>
  );
}
function Historys({ navigation, route }) {
  return <History value={route.params.value} />;
}
function CustomDrawerContent(props) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Flex center p={30}>
        <Avatar image={{ uri: props.value.value.profile }} />
      </Flex>
      <DrawerContentScrollView {...props}>
        <DrawerItem
          label="Home"
          onPress={() => {
            props.propss.navigation.navigate("Home");
          }}
          icon={({ focused, color, size }) => (
            <Icon color="#132875" size={size} name="home" />
          )}
        />
        <DrawerItem
          label="Aking Profile"
          onPress={() => {
            props.propss.navigation.navigate("Aking Profile");
          }}
          icon={({ focused, color, size }) => (
            <Icon color="#132875" size={size} name="account" />
          )}
        />
        <DrawerItem
          label="History"
          onPress={() => {
            props.propss.navigation.navigate("History");
          }}
          icon={({ focused, color, size }) => (
            <Icon color="#132875" size={size} name="history" />
          )}
        />
        <DrawerItem
          label="Mga Mensahe"
          onPress={() => {
            props.propss.navigation.navigate("Notipikasyon");
          }}
          icon={({ focused, color, size }) => (
            <Icon color="#132875" size={size} name="chat" />
          )}
        />
      </DrawerContentScrollView>
    </SafeAreaView>
  );
}

const Drawer = createDrawerNavigator();

function MyDrawer(prop) {
  async function logoutData() {
    await AsyncStorage.clear();
    await axios.put(`/logout/${prop.value.id}`);
    prop.setPages("Home");
  }
  return (
    <Drawer.Navigator
      screenOptions={{ headerTintColor: "#132875" }}
      useLegacyImplementation
      drawerContent={(props) => (
        <CustomDrawerContent propss={props} value={prop} />
      )}
    >
      <Drawer.Screen
        name="Home"
        component={HomeMap}
        initialParams={prop}
        options={{
          headerTitle: "",
          headerRight: () => (
            <Button
              style={{ marginRight: -20 }}
              variant="text"
              leading={(s) => <Icon name="logout" {...s} />}
              color="#132875"
              onPress={logoutData}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Aking Profile"
        component={Profile}
        initialParams={prop}
        options={{
          headerTitle: "",
          headerRight: () => (
            <Button
              style={{ marginRight: -20 }}
              variant="text"
              leading={(s) => <Icon name="logout" {...s} />}
              color="#132875"
              onPress={logoutData}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="History"
        component={Historys}
        initialParams={prop}
        options={{
          headerTitle: "",
          headerRight: () => (
            <Button
              style={{ marginRight: -20 }}
              variant="text"
              leading={(s) => <Icon name="logout" {...s} />}
              color="#132875"
              onPress={logoutData}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Mga Mensahe"
        component={Notifications}
        options={{
          headerTitle: "",
          headerRight: () => (
            <Button
              style={{ marginRight: -20 }}
              variant="text"
              leading={(s) => <Icon name="chat" {...s} />}
              color="#132875"
              onPress={logoutData}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default function Passengers(props) {
  const [pages, setPages] = useState("User");
  const data = props.value;
  return (
    <>
      {pages === "User" ? (
        <NavigationContainer theme={MyTheme} independent={true}>
          <MyDrawer
            value={data}
            arrowBack={props.arrowBack}
            setPages={setPages}
          />
        </NavigationContainer>
      ) : (
        <Home />
      )}
    </>
  );
}
