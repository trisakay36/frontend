import * as React from "react";
import { Image, View, SafeAreaView } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-community/async-storage";
import { Flex, Button } from "@react-native-material/core";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import Users from "./pages/Users";
import TODA from "./pages/TODA";
import Terms from "./pages/Condition";
import Home from "../index";
import { useState } from "react";
import axios from "../../config/axios";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#132875",
  },
};

function UsersList({ navigation, route }) {
  return (
    <Stack.Navigator initialRouteName="Users">
      <Stack.Screen
        name="Users"
        component={Users}
        options={{
          title: "Mga User", //Set Header Title
          headerTintColor: "#132875", //Set Header text color
          headerTitleStyle: {
            fontWeight: "bold", //Set Header text style
            textTransform: "uppercase",
          },
        }}
      />
    </Stack.Navigator>
  );
}
function TODAList({ props }) {
  return (
    <Stack.Navigator initialRouteName="TODA">
      <Stack.Screen
        name="TODA"
        component={TODA}
        options={{
          title: "Mga TODA", //Set Header Title
          headerTintColor: "#132875", //Set Header text color
          headerTitleStyle: {
            fontWeight: "bold", //Set Header text style
            textTransform: "uppercase",
          },
        }}
      />
    </Stack.Navigator>
  );
}
function Kondisyon() {
  return (
    <Stack.Navigator initialRouteName="TODA">
      <Stack.Screen
        name="Terms"
        component={Terms}
        options={{
          title: "Mga Kondisyon", //Set Header Title
          headerTintColor: "#132875", //Set Header text color
          headerTitleStyle: {
            fontWeight: "bold", //Set Header text style
            textTransform: "uppercase",
          },
        }}
      />
    </Stack.Navigator>
  );
}

function CustomDrawerContent(props) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Flex center>
        <Image
          style={{ width: 200, height: 200 }}
          source={require("../../img/logo.png")}
        />
      </Flex>
      <DrawerContentScrollView {...props}>
        <DrawerItem
          label="Mga User"
          onPress={() => {
            props.propss.navigation.navigate("Mga User");
          }}
          icon={({ focused, color, size }) => (
            <Icon color="#132875" size={size} name="account-group" />
          )}
        />
        <DrawerItem
          label="Listahan ng TODA"
          onPress={() => {
            props.propss.navigation.navigate("Listahan ng TODA");
          }}
          icon={({ focused, color, size }) => (
            <Icon color="#132875" size={size} name="format-list-bulleted" />
          )}
        />
        <DrawerItem
          label="Mga Kondisyon"
          onPress={() => {
            props.propss.navigation.navigate("Mga Kondisyon");
          }}
          icon={({ focused, color, size }) => (
            <Icon color="#132875" size={size} name="format-list-checks" />
          )}
        />
        {/* <DrawerItem
          label="Maglogout"
          onPress={() => {
            AsyncStorage.clear();
            props.propss.navigation.replace("Home");
          }}
          icon={({ focused, color, size }) => (
            <Icon color="#132875" size={size} name="logout" />
          )}
        /> */}
      </DrawerContentScrollView>
    </SafeAreaView>
  );
}

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

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
        <CustomDrawerContent propss={props} arrowBack={prop.arrowBack} />
      )}
    >
      <Drawer.Screen
        name="Mga User"
        component={UsersList}
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
        initialParams={{ itemId: 42 }}
      />
      <Drawer.Screen
        name="Listahan ng TODA"
        component={TODAList}
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
        name="Mga Kondisyon"
        component={Kondisyon}
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
    </Drawer.Navigator>
  );
}

export default function App(props) {
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
