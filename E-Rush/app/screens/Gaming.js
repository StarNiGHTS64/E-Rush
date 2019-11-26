import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/Ionicons";

export default class Gaming extends Component {
  goToScreen = nameScreen => {
    this.props.navigation.navigate(nameScreen);
  };

  render() {
    return (
      <View style={styles.viewBody}>
        <Text>Gaming Screen...</Text>

        <ActionButton
          buttonColor="#00a680"
          onPress={() => this.goToScreen("AddGaming")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
