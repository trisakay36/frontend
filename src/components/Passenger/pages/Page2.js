import React, { useState } from "react";
import { View, ScrollView, AsyncStorage } from "react-native";
import {
  Text,
  Button,
  TextInput,
  Flex,
  VStack,
  Avatar,
} from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import styles from "../../Stylesheet";

export default function Page2(props) {
  console.log("🚀 ~ file: Page2.js ~ line 15 ~ Page2 ~ props", props);
  const indexPage = (
    <Flex fill center mb={20}>
      <ScrollView style={styles.scrollView}>
        <VStack fill center>
          <Flex fill center></Flex>
        </VStack>
      </ScrollView>
    </Flex>
  );

  return <View style={{ ...styles.textWrapper }}>{indexPage}</View>;
}
