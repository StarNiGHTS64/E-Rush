import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedbackBase
} from "react-native";
import { Button } from "react-native-elements";

import * as firebase from "firebase";

export default class MyAccount extends Component {
  constructor() {
    super();

    this.state = {
      login: false
    };
  }

  async componentDidMount() {
    await firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          login: true
        });
      } else {
        this.setState({
          login: false
        });
      }
    });
  }

  goToScreen = nameScreen => {
    //console.log(nameScreen);
    this.props.navigation.navigate(nameScreen);
  };

  logout = () => {
    firebase.auth().signOut();
    //console.log("Cerrar sesion...");
  };

  render() {
    const { login } = this.state;

    if (login) {
      return (
        <View style={styles.viewBody}>
          <Text>Estas logeado correctamente...</Text>
          <Button title="Cerrar sesión" onPress={() => this.logout()} />
        </View>
      );
    } else {
      return (
        <View style={styles.viewBody}>
          <Text>MyAccount Screen...</Text>
          <Button
            title="Registro"
            onPress={() => this.goToScreen("Register")}
          />
          <Button title="Login" onPress={() => this.goToScreen("Login")} />
        </View>
      );
    }
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
