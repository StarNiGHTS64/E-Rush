import t from "tcomb-form-native";
import inputTemplate from "./templates/Input";
import inputTextareaTemplate from "./templates/Textarea";

export const AddGamingStruct = t.struct({
  name: t.String,
  type: t.String,
  city: t.String,
  address: t.String,
  description: t.String
});

export const AddGamingOptions = {
  fields: {
    name: {
      template: inputTemplate,
      config: {
        placeholder: "Nombre del lugar",
        iconType: "material-community",
        iconName: "silverware"
      }
    },
    type: {
      template: inputTemplate,
      config: {
        placeholder: "Gaming Center, Comunidad...",
        iconType: "material-community",
        iconName: "silverware"
      }
    },
    city: {
      template: inputTemplate,
      config: {
        placeholder: "Ciudad",
        iconType: "material-community",
        iconName: "city"
      }
    },
    address: {
      template: inputTemplate,
      config: {
        placeholder: "Direccion",
        iconType: "material-community",
        iconName: "map-marker"
      }
    },
    description: {
      template: inputTextareaTemplate,
      config: {
        placeholder: "Descripcion del lugar",
        iconType: "material-community",
        iconName: "silverware"
      }
    }
  }
};
