import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import {
  Text,
  Button,
  TextInput,
  Flex,
  VStack,
} from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import * as Keychain from "react-native-keychain";
import styles from "../Stylesheet";
import Logo from "../../components/primary/Logo";
import axios from "../../config/axios";
import AppBar from "../AppBar";
import Forgot from "../Password";
import Users from "./Users";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.log("🚀 ~ file: index.js ~ line 23 ~ Login ~ isLoggedIn", isLoggedIn);
  const [errorMsg, setErrorMsg] = useState("");
  const [result, setResult] = useState("");
  const [forgot, setForgot] = useState(false);
  const [display, setDisplay] = useState(false);
  const onHandleLogin = async () => {
    try {
      const res = await axios.post("/login", { email, password });
      await Keychain.setGenericPassword(email, password);
      const credentials = await Keychain.getGenericPassword();
      setIsLoggedIn(credentials);
      setResult(res.data);
      setDisplay(true);
    } catch (error) {
      if (email === "" || password === "") {
        setErrorMsg(error.response.data.error[0]);
      } else {
        setErrorMsg(error.response.data.error.message);
      }
    }
  };
  const onForgot = async () => {
    setForgot(!forgot);
  };
  const Loginpage = (
    <Flex fill center mb={20}>
      <AppBar arrowBack={props.arrowBack} />
      <ScrollView style={styles.scrollView}>
        <VStack fill center>
          <Flex fill center style={{ width: 300, height: 200 }}>
            <Logo />
          </Flex>
          <Flex fill center>
            {errorMsg ? (
              <Text variant="subtitle1" style={styles.txtError}>
                {errorMsg.charAt(0).toUpperCase() + errorMsg.slice(1)}
              </Text>
            ) : null}
            <TextInput
              variant="outlined"
              placeholder="Ilagay ang Email"
              color="#132875"
              style={styles.txtInput}
              onChangeText={setEmail}
              leading={(props) => (
                <Icon name="email" {...props} style={{ color: "#132875" }} />
              )}
            />
            <TextInput
              variant="outlined"
              placeholder="Ilagay ang Password"
              color="#132875"
              style={styles.txtInput}
              secureTextEntry={true}
              onChangeText={setPassword}
              leading={(props) => (
                <Icon
                  name="form-textbox-password"
                  {...props}
                  style={{ color: "#132875" }}
                />
              )}
            />
          </Flex>

          <Flex fill mt={20}>
            <Button
              title="ISUBMIT"
              color="#FFFFFF"
              variant="outlined"
              style={{ ...styles.btnBlue, marginVertical: 10 }}
              onPress={onHandleLogin}
            />
            <Button
              variant="text"
              color="#0DFF0D"
              title="Nakalimutan ang Password?"
              style={styles.txtGreen}
              onPress={onForgot}
            />
          </Flex>
        </VStack>
      </ScrollView>
    </Flex>
  );

  return (
    <View style={{ ...styles.textWrapper }}>
      {display ? (
        <Users value={result} />
      ) : forgot ? (
        <Forgot arrowBack={props.arrowBack} />
      ) : (
        Loginpage
      )}
    </View>
  );
}
