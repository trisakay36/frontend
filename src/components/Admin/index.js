import * as React from "react";
import { View, Text, Image, SafeAreaView } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Flex } from "@react-native-material/core";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import Users from "./pages/Users";
import TODA from "./pages/TODA";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#132875",
  },
};

function Home({ props }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Notifications Screen</Text>
    </View>
  );
}
function UsersList({ props }) {
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
        name="TODA"
        component={TODA}
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
          label="Home"
          onPress={() => {
            props.propss.navigation.navigate("Home");
          }}
          icon={({ focused, color, size }) => (
            <Icon color="#132875" size={size} name="home" />
          )}
        />
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
const Stack = createStackNavigator();

function MyDrawer(prop) {
  return (
    <Drawer.Navigator
      screenOptions={{ headerTintColor: "#132875" }}
      useLegacyImplementation
      drawerContent={(props) => (
        <CustomDrawerContent propss={props} value={prop} />
      )}
    >
      {/* <Drawer.Screen
        name="Home"
        component={Home}
        options={{ headerTitle: "" }}
        initialParams={{ data: prop }}
      /> */}
      <Drawer.Screen
        name="Mga User"
        component={UsersList}
        options={{ headerTitle: "" }}
        initialParams={{ itemId: 42 }}
      />
      <Drawer.Screen
        name="Listahan ng TODA"
        component={TODAList}
        options={{ headerTitle: "" }}
      />
      <Drawer.Screen
        name="Mga Kondisyon"
        component={Kondisyon}
        options={{ headerTitle: "" }}
      />
    </Drawer.Navigator>
  );
}

export default function App(props) {
  const data = props.value.data;
  return (
    <NavigationContainer theme={MyTheme}>
      <MyDrawer value={data} />
    </NavigationContainer>
  );
}
