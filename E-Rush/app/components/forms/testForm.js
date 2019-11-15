import React from "react";

import t from "tcomb-form-native";

const form = t.form.Form;

import Input from "./templates/Input";

export const LoginStruct = t.struct({
  user: t.String,
  password: t.String
});

export const LoginOptions = {
  fields: {
    user: {
      template: Input,
      config: {
        placeholder: "Introduce tu GamerTag",
        password: false,
        secureTextEntry: false,
        iconType: "font-awesome",
        iconName: "user"
      }
    },

    password: {
      template: Input,
      config: {
        placeholder: "Introduce tu Contraseña",
        password: true,
        secureTextEntry: true,
        iconType: "font-awesome",
        iconName: "lock"
      }
    }
  }
};
