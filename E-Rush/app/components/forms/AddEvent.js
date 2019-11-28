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
    type: {
      template: inputTemplate,
      config: {
        placeholder: "Nombre del evento",
        iconType: "material-community",
        iconName: "city"
      }
    },
    city: {
      template: inputTemplate,
      config: {
        placeholder: "Nombre del evento",
        iconType: "material-community",
        iconName: "city"
      }
    },
    address: {
      template: inputTemplate,
      config: {
        placeholder: "Nombre del evento",
        iconType: "material-community",
        iconName: "city"
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
