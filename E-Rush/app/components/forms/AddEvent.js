import t from "tcomb-form-native";
import inputTemplate from "./templates/Input";
import inputTextareaTemplate from "./templates/Textarea";

export const AddEventStruct = t.struct({
  name: t.String,
  date: t.String,
  city: t.String,
  address: t.String,
  description: t.String
});

export const AddEventOptions = {
  fields: {
    name: {
      template: inputTemplate,
      config: {
        placeholder: "Nombre del evento",
        iconType: "material-community",
        iconName: "city"
      }
    },
    date: {
      template: inputTemplate,
      config: {
        placeholder: "Dia del evento",
        iconType: "material-community",
        iconName: "city"
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
        placeholder: "Nombre del evento",
        iconType: "material-community",
        iconName: "city"
      }
    }
  }
};
