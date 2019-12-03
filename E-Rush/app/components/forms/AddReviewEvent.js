import t from "tcomb-form-native";
import inputTemplate from "./templates/Input";
import inputOpinionareaTemplate from "./templates/Opinionarea";

export const AddReviewEventStruct = t.struct({
  title: t.String,
  review: t.String
});

export const AddReviewEventOptions = {
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
