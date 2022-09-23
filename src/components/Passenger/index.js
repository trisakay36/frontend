import * as React from "react";
import { View, Text, Button, SafeAreaView } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Avatar, Flex } from "@react-native-material/core";

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import Maps from "../Screens";
import Profiles from "./pages/Page2";
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#132875",
  },
};
function Home({ props }) {
  return <Maps />;
}
function Profile({ props }) {
  console.log("🚀 ~ file: index.js ~ line 26 ~ Profile ~ props", props);
  return <Profiles />;
}

function Notifications() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Notifications Screen</Text>
    </View>
  );
}
function History() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>History Screen</Text>
    </View>
  );
}
function CustomDrawerContent(props) {
  console.log(
    "🚀 ~ file: index.js ~ line 45 ~ CustomDrawerContent ~ props",
    props
  );
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
          label="Notipikasyon"
          onPress={() => {
            props.propss.navigation.navigate("Notipikasyon");
          }}
          icon={({ focused, color, size }) => (
            <Icon color="#132875" size={size} name="bell" />
          )}
        />
        <DrawerItem
          label="Maglogout"
          onPress={() => props.navigation.toggleDrawer()}
          icon={({ focused, color, size }) => (
            <Icon color="#132875" size={size} name="logout" />
          )}
        />
      </DrawerContentScrollView>
    </SafeAreaView>
  );
}

const Drawer = createDrawerNavigator();

function MyDrawer(prop) {
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
        component={Home}
        options={{ headerTitle: "" }}
        initialParams={{ data: prop }}
      />
      <Drawer.Screen
        name="Aking Profile"
        component={Profile}
        options={{ headerTitle: "" }}
        initialParams={{ itemId: 42 }}
      />
      <Drawer.Screen
        name="History"
        component={History}
        options={{ headerTitle: "" }}
      />
      <Drawer.Screen
        name="Notipikasyon"
        component={Notifications}
        options={{ headerTitle: "" }}
      />
    </Drawer.Navigator>
  );
}

export default function App(props) {
  const data = props.value;
  console.log("🚀 ~ file: index.js ~ line 138 ~ App ~ data", data);
  return (
    <NavigationContainer theme={MyTheme}>
      <MyDrawer value={data} />
    </NavigationContainer>
  );
}
