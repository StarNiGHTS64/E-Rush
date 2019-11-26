import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

export default class AddEvent extends Component {
  render() {
    return (
      <View styles={styles.viewBody}>
        <Text>Add Event Screen...</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff"
  }
});
