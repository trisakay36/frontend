import React, { useState } from "react";
import { View, ScrollView, Image } from "react-native";
import {
  Text,
  HStack,
  TextInput,
  Flex,
  VStack,
  Avatar,
} from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import styles from "../../Stylesheet";

export default function Profile(props) {
  const userData = props.value;
  const address = userData.details;
  let statusAccount;
  if (userData.status === 1) {
    statusAccount = "Active";
  } else if (userData.status === 2) {
    statusAccount = "Pending Account";
  } else {
    statusAccount = "Not Active";
  }
  const indexPage = (
    <Flex fill style={{ marginVertical: 20, marginHorizontal: 10 }}>
      <ScrollView style={styles.scrollView}>
        <VStack fill mt={20}>
          <Flex fill center>
            <Avatar
              size={80}
              image={
                <Image
                  source={{ uri: userData.profile }}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    borderRadius: 40,
                  }}
                />
              }
            />
          </Flex>
          <Flex fill center mt={10}>
            <Text
              variant="h5"
              style={{
                ...styles.txtBlue,
                fontWeight: "bold",
                textTransform: "uppercase",
              }}
            >{`${userData.fname} ${userData.lname}`}</Text>
            <Text
              variant="h6"
              style={{
                ...styles.txtGray,
                fontWeight: "bold",
                textTransform: "uppercase",
              }}
            >
              Passenger
            </Text>
            <Text
              variant="subtitle1"
              style={{
                ...styles.txtGreen,
                fontWeight: "bold",
                textTransform: "uppercase",
              }}
            >
              {statusAccount}
            </Text>
          </Flex>
          <Flex fill mt={10}>
            <HStack m={6} spacing={6}>
              <Icon name="email" size={30} color="#132875" />{" "}
              <Text
                variant="h6"
                style={{
                  ...styles.txtGray,
                  textAlign: "left",
                }}
              >
                {userData.email}
              </Text>
            </HStack>
            <HStack m={6} spacing={6}>
              <Icon name="cellphone" size={30} color="#132875" />{" "}
              <Text
                variant="h6"
                style={{
                  ...styles.txtGray,
                  textAlign: "left",
                }}
              >
                {userData.mobile}
              </Text>
            </HStack>
            <HStack m={6} spacing={6}>
              <Icon name="home-city" size={30} color="#132875" />{" "}
              <Text
                variant="h6"
                style={{
                  ...styles.txtGray,
                  textAlign: "left",
                }}
              >
                {JSON.parse(address).address}
              </Text>
            </HStack>
          </Flex>
        </VStack>
      </ScrollView>
    </Flex>
  );

  return <View style={{ ...styles.textWrapper }}>{indexPage}</View>;
}
