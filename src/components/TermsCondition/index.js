import React from "react";
import { View } from "react-native";
import TermCondition from "./TermCondition";
import styles from "../Stylesheet";

const Terms = (props) => {
  return (
    <View style={styles.textWrapper}>
      <TermCondition back={props.arrowBack} />
    </View>
  );
};
export default Terms;
