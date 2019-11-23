import React, { Component } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { Image, Button, Divider, SocialIcon } from "react-native-elements";
import Toast, { DURATION } from "react-native-easy-toast";

import t from "tcomb-form-native";
const Form = t.form.Form;
import { LoginOptions, LoginStruct } from "../../components/forms/Login";

import * as firebase from "firebase";
import * as Facebook from "expo-facebook";
import { FacebookApi } from "../../utils/Social";

export default class Login extends Component {
  constructor() {
    super();

    this.state = {
      loginStruct: LoginStruct,
      loginOptions: LoginOptions,
      loginData: {
        email: "",
        password: ""
      },
      loginErrorMessage: ""
    };
  }

  login = () => {
    //console.log("Haciendo Login");
    //console.log(this.state.loginData);
    const validate = this.refs.loginForm.getValue();

    if (!validate) {
      this.setState({
        loginErrorMessage: "El email y/o contraseña son invalidos"
      });
      //console.log("Formulario Incorrecto");
    } else {
      this.setState({
        loginErrorMessage: ""
      });

      firebase
        .auth()
        .signInWithEmailAndPassword(validate.email, validate.password)
        .then(() => {
          this.refs.toastLogin.show("Login correcto", 200, () => {
            this.props.navigation.goBack();
          });
          //console.log("Login Correcto");
        })
        .catch(erro => {
          this.refs.toastLogin.show("Email y/o contraseña incorrectos", 2500);
          //console.log("Login Incorrecto");
        });
    }

    //console.log(validate);
  };

  loginFacebook = async () => {
    //console.log("Login Facebook...");
    const {
      type,
      token
    } = await Facebook.logInWithReadPermissionsAsync(
      FacebookApi.application_id,
      { permissions: FacebookApi.permissions }
    );

    if (type == "success") {
      const credentials = firebase.auth.FacebookAuthProvider.credential(token);
      firabase
        .auth()
        .signInWithCredential(credentials)
        .then(() => {
          this.refs.toastLogin.show("Login correcto", 100, () => {
            this.props.navigation.goBack();
          });
        })
        .catch(err => {
          this.refs.toastLogin.show(
            "Error accediendo con Facebook, intentelo mas tarde",
            300
          );
        });
    } else if (type == "cancel") {
      this.refs.toastLogin.show("Inicio de sesion cancelado", 300);
    } else {
      this.refs.toastLogin.show("Error desconocido, intentelo mas tarde", 300);
    }

    console.log(type);
    console.log(token);
  };

  onChangeFormLogin = formValue => {
    //console.log("Change Form Login...");
    //console.log(formValue);
    this.setState({
      loginData: formValue
    });
  };

  render() {
    const { loginStruct, loginOptions, loginErrorMessage } = this.state;

    return (
      <View style={styles.viewBody}>
        <Image
          source={require("../../../assets/img/5-tenedores-letras-icono-logo.png")}
          containerStyle={styles.containerLogo}
          style={styles.logo}
          PlaceholderContent={<ActivityIndicator />}
          resizeMode="contain"
        />
        <View style={styles.viewForm}>
          <Form
            ref="loginForm"
            type={loginStruct}
            options={loginOptions}
            value={this.state.loginData}
            onChange={formValue => this.onChangeFormLogin(formValue)}
          />
          <Button
            buttonStyle={styles.buttonLoginContainer}
            title="Login"
            onPress={() => this.login()}
          />
          <Text style={styles.loginErrorMessage}> {loginErrorMessage}</Text>

          <Divider style={styles.divider} />

          <SocialIcon
            title="Iniciar sesión con Facebook"
            button
            type="facebook"
            onPress={() => this.loginFacebook()}
          />
        </View>

        <Toast
          ref="toastLogin"
          position="bottom"
          positionValue={300}
          fadeInDuaration={750}
          fadeOutDuration={1000}
          opacity={0.8}
          textStyle={{ color: "#fff" }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    marginLeft: 40,
    marginRight: 40,
    marginTop: 40
  },
  containerLogo: {
    alignItems: "center"
  },
  logo: {
    width: 300,
    height: 150
  },
  viewForm: {
    marginTop: 50
  },
  buttonLoginContainer: {
    backgroundColor: "#00a680",
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10
  },
  loginErrorMessage: {
    color: "#f00",
    textAlign: "center",
    marginTop: 20
  },
  divider: {
    backgroundColor: "#00a680",
    marginBottom: 20
  }
});
