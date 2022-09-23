import React, { useState, useEffect } from "react";
import { View, ScrollView } from "react-native";
import { Text, Button, Stack, Flex, VStack } from "@react-native-material/core";
import styles from "../Stylesheet";
import Logo from "../../components/primary/Logo";

export default function Terms(props) {
  const terms = [
    {
      id: 1,
      title: "Term 1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      id: 1,
      title: "Term 1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      id: 1,
      title: "Term 1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      id: 1,
      title: "Term 1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      id: 1,
      title: "Term 1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
  ];
  const layout = (
    <Flex fill center mb={20}>
      <ScrollView style={styles.scrollView}>
        <VStack fill center>
          <Flex fill center style={{ width: 300, height: 200 }}>
            <Logo />
            <Text
              variant="h6"
              style={{ ...styles.txtBlue, fontWeight: "bold" }}
            >
              Terms & Conditions
            </Text>
          </Flex>
          <Flex fill center style={{ padding: 20 }}>
            {terms.map((data, i) => (
              <Stack key={i}>
                <Text variant="subtitle1">
                  <Text style={styles.subnumber}>{`${data.id}. `}</Text>
                  <Text>{data.title}</Text>
                </Text>
                <Text variant="body1" style={styles.description}>
                  {data.description}
                </Text>
              </Stack>
            ))}
          </Flex>
          <Flex fill>
            <Button
              title="Tanggapin"
              color="#FFFFFF"
              variant="outlined"
              style={{ ...styles.btnBlue }}
              onPress={props.back}
            />
          </Flex>
        </VStack>
      </ScrollView>
    </Flex>
  );

  return <View style={styles.textWrapper}>{layout}</View>;
}
