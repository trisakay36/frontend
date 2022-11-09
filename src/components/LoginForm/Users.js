import React, { useState } from "react";
import { View } from "react-native";
import styles from "../Stylesheet";
import Passenger from "../Passenger";
import Driver from "../Driver";
import Admin from "../Admin";

export default function Users(props) {
  const usersData = props.isLog
    ? JSON.parse(props.value.value).data
    : props.value.data;

  const MainPage = () => {
    if (usersData.roleID === 1) {
      return <Admin value={usersData} />;
    } else if (usersData.roleID === 2) {
      return <Driver value={usersData} />;
    } else {
      return <Passenger value={usersData} />;
    }
  };
  return (
    <View style={{ ...styles.textWrapper }}>
      <MainPage />
    </View>
  );
}
