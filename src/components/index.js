import React, { useState } from "react";
import { View } from "react-native";
import {
  Flex,
  HStack,
  Text,
  VStack,
  Button,
  Divider,
} from "@react-native-material/core";
import Logo from "./primary/Logo";
import styles from "./Stylesheet";
import Term from "./TermsCondition/index";
import Registration from "./Registration";
import Login from "./LoginForm/index";

export default function Landing() {
  const [isForm, setForm] = useState("");
  const [isLanding, setLanding] = useState(true);
  const handleLogin = () => {
    setLanding(false);
    setForm("login");
  };
  const handleRegister = () => {
    setLanding(false);
    setForm("register");
  };
  const handleLanding = () => {
    setLanding(true);
    setForm("");
  };
  const handleTerm = () => {
    setLanding(false);
    setForm("term");
  };

  const landing_layout = (
    <Flex fill center>
      <VStack>
        <Flex h={100} fill center>
          <Logo />
        </Flex>
        <Flex
          fill
          center
          style={{ ...styles.bgBlue, width: 500, height: 50, flex: 1 }}
        >
          <Button
            title="Maglogin"
            color="#132875"
            variant="outlined"
            style={{ ...styles.btnWhite }}
            onPress={handleLogin}
          />
          <HStack m={15} spacing={6}>
            <Text
              variant="subtitle1"
              style={{
                ...styles.txtWhite,
                marginRight: 2,
              }}
            >
              Wala pang Account?
            </Text>
            <Text
              style={{ ...styles.txtGreen, textTransform: "uppercase" }}
              onPress={handleRegister}
            >
              Magrehistro
            </Text>
          </HStack>
          <Divider style={{ marginTop: 150 }} />
          <Text style={styles.txtWhite}>
            By using Tri-Sakay you are agreeing to our
          </Text>
          <Text style={styles.txtGreen} onPress={handleTerm}>
            Terms of Service & Privacy Policy
          </Text>
        </Flex>
      </VStack>
    </Flex>
  );

  const MainPage = () => {
    if (isLanding === false) {
      if (isForm === "login") {
        return <Login arrowBack={handleLanding} />;
      } else if (isForm === "register") {
        return <Registration arrowBack={handleLanding} />;
      } else {
        return <Term arrowBack={handleLanding} />;
      }
    }
    return landing_layout;
  };
  return (
    <View style={styles.textWrapper}>
      <Flex fill center>
        <MainPage />
      </Flex>
    </View>
  );
}