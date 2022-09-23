import React, { useState, useRef, useCallback } from "react";
import { View, ScrollView } from "react-native";
import {
  Text,
  Button,
  Flex,
  VStack,
  TextInput,
} from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import styles from "../Stylesheet";
import Logo from "../../components/primary/Logo";
import AppBar from "../AppBar";
import axios from "../../config/axios";
import LoginForm from "../LoginForm";

export default function CreatePassword(props) {
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [result, setResult] = useState("");
  const inputEl = useRef(null);

  const onHandleCreate = async () => {
    try {
      const res = await axios.put(`/register/set_password/${props.userID}`, {
        password,
      });

      setResult(res.data);
    } catch (error) {
      setErrorMsg(error);
    }
  };
  const handleInput = useCallback(
    (ev) => {
      const input = ev.nativeEvent.text;

      // validate all you want here

      setPassword(input);
    },
    [setPassword]
  );
  const indexPage = (
    <Flex fill center mb={20}>
      <AppBar onPress={props.arrowBack} />
      <ScrollView style={styles.scrollView}>
        <VStack fill center>
          <Flex fill center style={{ width: 300, height: 200 }}>
            <Logo />
            <Text
              variant="h6"
              style={{
                ...styles.txtBlue,
                fontWeight: "bold",
              }}
            >
              Gumawa ng Password
            </Text>
          </Flex>
          <Flex fill center mt={10}>
            {errorMsg ? (
              <Text variant="subtitle1" style={styles.txtError}>
                {errorMsg.charAt(0).toUpperCase() + errorMsg.slice(1)}
              </Text>
            ) : null}
            <TextInput
              variant="outlined"
              placeholder="Ilagay ang Password"
              color="#132875"
              style={styles.txtInput}
              secureTextEntry={true}
              onEndEditing={handleInput}
              ref={inputEl}
              defaultValue={password}
              leading={(props) => (
                <Icon
                  name="form-textbox-password"
                  {...props}
                  style={{ color: "#132875" }}
                />
              )}
            />
          </Flex>
          <Flex fill m={10} w={300}>
            <Text
              variant="subtitle"
              style={{
                ...styles.txtGray,
                textAlign: "left",
              }}
            >
              Kaylangang magtaglay ng walo or higit pang letra.
            </Text>
          </Flex>
          <Flex fill m={20}>
            <Button
              title="ISUBMIT"
              color="#FFFFFF"
              variant="outlined"
              style={{ ...styles.btnBlue }}
              onPress={onHandleCreate}
            />
          </Flex>
        </VStack>
      </ScrollView>
    </Flex>
  );

  const MainPage = () => {
    if (result.code === "PASSWORD_SET") {
      return <LoginForm arrowBack={props.arrowBack} />;
    }
    return indexPage;
  };
  return (
    <View style={{ ...styles.textWrapper }}>
      <MainPage />
    </View>
  );
}
