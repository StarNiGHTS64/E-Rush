import React, { Component } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { Image, Button, Text } from "react-native-elements";
import Toast, { DURATION } from "react-native-easy-toast";

import t from "tcomb-form-native";
const Form = t.form.Form;
import {
  RegisterStruct,
  RegisterOptions
} from "../../components/forms/Register";

import * as firebase from "firebase";

export default class Register extends Component {
  constructor() {
    super();

    this.state = {
      registerStruct: RegisterStruct,
      registerOptions: RegisterOptions,
      formData: {
        name: "",
        email: "",
        password: "",
        passwordConfirmation: ""
      },
      formErrorMessage: ""
    };
  }

  register = () => {
    //console.log(this.state.formData);

    const { password, passwordConfirmation } = this.state.formData;

    if (password === passwordConfirmation) {
      const validate = this.refs.registerForm.getValue();

      if (validate) {
        this.setState({ formErrorMessage: "" });

        firebase
          .auth()
          .createUserWithEmailAndPassword(validate.email, validate.password)
          .then(resolve => {
            //console.log("Formulario Correcto");
            this.refs.toast.show("Registrado con Exito", 200, () => {
              this.props.navigation.navigate("MyAccount");
            });
          })
          .catch(err => {
            //console.log("El email ya esta en uso.");
            this.refs.toast.show("El email ya ha sido registrado.", 2500);
          });
      } else {
        //console.log("Formulario Invalido");
        this.setState({
          formErrorMessage: "Formulario Invalido"
        });
      }
      //console.log("Contraseñas iguales");
    } else {
      //console.log("Contraseñas No Coinciden");
      this.setState({
        formErrorMessage: "Las contraseñas no son iguales"
      });
    }

    //console.log(this.state.formData);
  };

  onChangeFormRegister = formValue => {
    //console.log(this.state.formData);
    this.setState({
      formData: formValue
    });
  };

  render() {
    const { registerStruct, registerOptions, formErrorMessage } = this.state;

    return (
      <View style={styles.viewBody}>
        <Image
          source={require("../../../assets/img/Combined.png")}
          containerStyle={styles.containerLogo}
          style={styles.logo}
          PlaceholderContent={<ActivityIndicator />}
          resizeMode="contain"
        />
        <Form
          ref="registerForm"
          type={registerStruct}
          options={registerOptions}
          value={this.state.formData}
          onChange={formValue => this.onChangeFormRegister(formValue)}
        />
        <Button
          buttonStyle={styles.buttonRegisterContainer}
          title="Unirse"
          onPress={() => this.register()}
        />

        <Text style={styles.formErrorMessage}>{formErrorMessage}</Text>

        <Toast
          ref="toast"
          position="bottom"
          positionValue={250}
          fadeInDuration={750}
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

    justifyContent: "center",
    marginLeft: 40,
    marginRight: 40
  },
  containerLogo: {
    alignItems: "center",
    marginBottom: 30
  },
  logo: {
    width: 300,
    height: 150
  },
  buttonRegisterContainer: {
    backgroundColor: "#00a680",
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10
  },
  formErrorMessage: {
    color: "#f00",
    textAlign: "center",
    marginTop: 30
  }
});
