import React, { useState, useEffect } from "react";
import { View, ScrollView } from "react-native";
import { Text, Button, Stack, Flex, VStack } from "@react-native-material/core";
import styles from "../Stylesheet";
import Logo from "../../components/primary/Logo";
import axios from "../../config/axios";

export default function Terms(props) {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    axios.get("admin/terms").then((response) => {
      setRows(response.data.data);
    });
  }, []);
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
            {rows.map((data, i) => (
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
          <Flex fill center>
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
