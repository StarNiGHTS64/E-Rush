import t from "tcomb-form-native";
import inputTemplate from "./templates/Input";
import inputOpinionareaTemplate from "./templates/Opinionarea";

export const AddReviewGamingStruct = t.struct({
  title: t.String,
  review: t.String
});

export const AddReviewGamingOptions = {
  fields: {
    title: {
      template: inputTemplate,
      config: {
        placeholder: "Titulo de la opinion",
        iconType: "material-community",
        iconName: "silverware"
      }
    },
    review: {
      template: inputOpinionareaTemplate,
      config: {
        placeholder: "Comentario"
      }
    }
  }
};
