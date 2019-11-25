import React, { Component } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { Button, Image } from "react-native-elements";

import UserInfo from "./Userinfo";

export default class MyAccount extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.viewUserAccount}>
        <UserInfo />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewUserAccount: {
    height: "100%",
    backgroundColor: "#f2f2f2"
  }
});
