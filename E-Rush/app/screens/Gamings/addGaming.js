import React, { Component } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { Icon, Image, Button, Text, Overlay } from "react-native-elements";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

import { uploadImage } from "../../utils/UploadImage";

import Toast, { DURATION } from "react-native-easy-toast";

import t from "tcomb-form-native";
const Form = t.form.Form;
import {
  AddGamingStruct,
  AddGamingOptions
} from "../../components/forms/AddGaming";

import { firebaseApp } from "../../utils/FireBase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

export default class AddGaming extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      imageUriGaming: "",
      formData: {
        name: "",
        type: "",
        city: "",
        address: "",
        description: ""
      }
    };
  }

  isImageGaming = image => {
    if (image) {
      return (
        <Image source={{ uri: image }} style={{ width: 500, height: 200 }} />
      );
    } else {
      return (
        <Image
          source={require("../../../assets/img/gaming-center.jpg")}
          style={{ width: 500, height: 200 }}
        />
      );
    }
  };

  uploadImage = async () => {
    const resultPermission = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );

    if (resultPermission.status === "denied") {
      this.refs.toast.show(
        "Es necesario aceptar los permisos de la galeria",
        1500
      );
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true
      });

      if (result.cancelled) {
        this.refs.toast.show("Haz cerrado la galeria de imagenes", 1500);
      } else {
        //console.log(result);
        this.setState({
          imageUriGaming: result.uri
        });
      }
    }
  };

  onChangeFormAddGaming = formValue => {
    this.setState({
      formData: formValue
    });
  };

  AddGaming = () => {
    const { imageUriGaming } = this.state;
    const { name, type, city, address, description } = this.state.formData;

    if (imageUriGaming && name && type && city && address && description) {
      this.setState({
        loading: true
      });

      db.collection("gaming")
        .add({
          name,
          type,
          city,
          address,
          description,
          image: "",
          createdAt: new Date()
        })
        .then(resolve => {
          const gamingId = resolve.id;

          uploadImage(imageUriGaming, gamingId, "gaming")
            .then(resolve => {
              const gamingRef = db.collection("gaming").doc(gamingId);

              gamingRef
                .update({ image: resolve })
                .then(() => {
                  this.setState({ loading: false });
                  this.refs.toast.show(
                    "Gaming Center creado correctaente",
                    100,
                    () => {
                      this.props.navigation.goBack();
                    }
                  );
                })
                .catch(() => {
                  this.refs.toast.show("Error de servidor intentelo mas tarde");
                  this.setState({ loading: false });
                });
            })
            .catch(() => {
              this.refs.toast.show("Error de servidor intentelo mas tarde");
              this.setState({ loading: false });
            });
        })
        .catch(() => {
          this.refs.toast.show("Error de servidor intentelo mas tarde");
          this.setState({ loading: false });
        });
    } else {
      this.refs.toast.show("Tienes que completar todos los campos");
    }
  };

  render() {
    const { imageUriGaming, loading } = this.state;
    return (
      <View style={styles.viewBody}>
        <View style={styles.viewPhoto}>
          {this.isImageGaming(imageUriGaming)}
        </View>
        <View>
          <Icon
            name="camera"
            type="material-community"
            color="#7A7A7A"
            iconStyle={styles.addPhotoIcon}
            onPress={() => this.uploadImage()}
          />
        </View>
        <View>
          <Form
            ref="addGamingForm"
            type={AddGamingStruct}
            options={AddGamingOptions}
            iconStyle={styles.addPhotoIcon}
            value={this.state.formData}
            onChange={formValue => this.onChangeFormAddGaming(formValue)}
          />
        </View>
        <View style={styles.viewBtnAddGaming}>
          <Button
            title="Registrar"
            onPress={() => this.AddGaming()}
            buttonStyle={styles.btnAddGaming}
          />
        </View>

        <Overlay
          overlayStyle={styles.overlayLoading}
          isVisible={loading}
          width="auto"
          height="auto"
        >
          <View>
            <Text style={styles.overlayLoadingText}>Creando Gaming Center</Text>
            <ActivityIndicator size="large" color="#00a680" />
          </View>
        </Overlay>

        <Toast
          ref="toast"
          position="bottom"
          positionValue={200}
          fadeInDuration={1000}
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
    flex: 1
  },
  viewPhoto: {
    alignItems: "center",
    height: 200,
    marginBottom: 20
  },
  viewIconUploadPhoto: {
    flex: 1
  },
  addPhotoIcon: {
    backgroundColor: "#e3e3e3",
    margin: 4
  },
  viewBtnAddGaming: {
    flex: 1,
    justifyContent: "flex-end"
  },
  btnAddGaming: {
    backgroundColor: "#006a80",
    margin: 20
  },
  overlayLoading: {
    padding: 20
  },
  overlayLoadingText: {
    color: "#00a680",
    marginBottom: 20,
    fontSize: 20
  }
});
