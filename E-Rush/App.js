import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-elements";

import PreLoader from "./app/components/forms/templates/PreLoader";

import t from "tcomb-form-native";
const Form = t.form.Form;
import { LoginStruct, LoginOptions } from "./app/components/forms/testForm";

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      testFormValue: {
        user: "",
        password: ""
      },
      testFormError: "",
      loaded: false
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        loaded: true
      });
    }, 2000);
  }

  onChange = testFormValue => {
    console.log();
    this.setState({
      testFormValue
    });
  };

  sendFormTest = () => {
    const validate = this.refs.formTest.getValue();

    if (validate) {
      console.log("Login Successful");
      this.setState({
        testFormError: ""
      });
    } else {
      console.log("Login Failed");
      this.setState({
        testFormError: "Por favor, rellana todos los campos"
      });
    }
  };

  render() {
    const { testFormValue, testFormError, loaded } = this.state;

    if (!loaded) {
      return <PreLoader />;
    } else {
      return (
        <View style={styles.container}>
          <Text>E-Rush Begin</Text>
          <Form
            ref="formTest"
            type={LoginStruct}
            options={LoginOptions}
            value={testFormValue}
            onChange={v => this.onChange(v)}
          />
          <Button title="Login" onPress={this.sendFormTest.bind(this)} />
          <Text style={styles.testFormErrorText}>{testFormError}</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    //alignItems: "center",
    justifyContent: "center",
    paddingLeft: 40,
    paddingRight: 40
  },

  testFormErrorText: {
    paddingTop: 30,
    color: "#f00",
    textAlign: "center"
  }
});
