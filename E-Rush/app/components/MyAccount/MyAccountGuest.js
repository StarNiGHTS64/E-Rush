import React, { Component } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { Button, Image } from "react-native-elements";

export default class MyAccountGuest extends Component {
  constructor(props) {
    super(props);

    console.log(props);
  }

  render() {
    const { goToScreen } = this.props;

    return (
      <View style={styles.viewBody}>
        <Image
          source={require("../../../assets/img/image-my-account-guest-01.jpg")}
          style={styles.image}
          PlaceholderContent={<ActivityIndicator />}
          resizeMode="contain"
        />
        <Text style={styles.title}>Consulta tu perfil de E-Rush</Text>
        <Text style={styles.description}>
          ¿Como describirias el mejor gaming center? ¿Buscas comunidades de
          videojuegos, TCGs, juegos de mesa, etc? Unete ahora y ayudanos a
          descubrirlo votando por los que mas te gusten y comenta tu
          experiencia.
        </Text>
        <Button
          buttonStyle={styles.btnViewProfile}
          title="Ver tu perfil"
          onPress={() => goToScreen("Login")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 30,
    paddingLeft: 30
  },
  image: {
    height: 300,
    width: 300,
    marginBottom: 40
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10
  },
  description: {
    textAlign: "center",
    marginBottom: 20
  },
  btnViewProfile: {
    width: "100%",
    backgroundColor: "#00a680"
  }
});
