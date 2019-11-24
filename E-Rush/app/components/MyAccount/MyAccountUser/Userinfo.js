import React, { Component } from "react";
import { StyleSheet, View, Text, ImagePickerIOS } from "react-native";
import { Avatar } from "react-native-elements";
import Toast, { DURATION } from "react-native-easy-toast";

import UpdateUserInfo from "./UpdateUserinfo";

import * as firebase from "firebase";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

export default class UserInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...props,
      userInfo: {
        displayName: "",
        email: "",
        photoUrl: ""
      }
    };
  }

  componentDidMount = async () => {
    await this.getUserInfo();

    console.log(this.state);
  };

  getUserInfo = () => {
    //console.log("Get User info");
    const user = firebase.auth().currentUser;

    user.providerData.forEach(userInfo => {
      this.setState({
        userInfo
      });
    });
  };

  reauthenticate = currentPassword => {
    const user = firebase.auth().currentUser;
    const credentials = firebase.auth.EmailAuthProvider.credential(
      user.email,
      currentPassword
    );
    return user.reauthenticateWithCredential(credentials);
  };

  checkUserAvatar = photoURL => {
    return photoURL
      ? photoURL
      : "https://s.pngix.com/pngfile/s/468-4685538_bear-default-avatar-default-avatar-hd-png-download.png";
  };

  updateUserDisplayName = async newDisplayName => {
    const update = {
      displayName: newDisplayName
    };
    await firebase.auth().currentUser.updateProfile(update);
    this.getUserInfo();
  };

  updateUserEmail = async (newEmail, password) => {
    this.reauthenticate(password)
      .then(() => {
        const user = firebase.auth().currentUser;
        user
          .updateEmail(newEmail)
          .then(() => {
            this.refs.toast.show(
              "Email actualizado, vuelve a iniciar sesion",
              50,
              () => {
                firebase.auth().signOut();
              }
            );
          })
          .catch(err => {
            this.refs.toast.show(err, 1500);
          });
      })
      .catch(err => {
        this.refs.toast.show("Contraseña incorrecta", 1500);
      });
  };

  updateUserPhotoURL = async photoUri => {
    const update = {
      photoURL: photoUri
    };
    await firebase.auth().currentUser.updateProfile(update);
    this.getUserInfo();
  };

  returnUpdateUserInfoComponente = userInfoData => {
    if (userInfoData.hasOwnProperty("uid")) {
      return (
        <UpdateUserInfo
          userInfo={this.state.userInfo}
          updateUserDisplayName={this.updateUserDisplayName}
          updateUserEmail={this.updateUserEmail}
        />
      );
    }
  };

  changeAvatarUser = async () => {
    const resultPermision = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    //console.log(resultPermision);
    if (resultPermision.status === "denied") {
      this.refs.toast.show(
        "Esnecesario aceptar los permisos de la galeria",
        1500
      );
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3]
      });

      console.log(result);
      if (result.cancelled) {
        this.refs.toast.show("Has cerrado la galeria de imagenes", 1500);
      } else {
        console.log("Haz seleccionado una imagen");
        const { uid } = this.state.userInfo;
        this.uploadImage(result.uri, uid)
          .then(resolve => {
            this.refs.toast.show("Avatar actualizado correctamente");

            firebase
              .storage()
              .ref("avatar/" + uid)
              .getDownloadURL()
              .then(resolve => {
                console, log(resolve);
                this.updateUserPhotoURL;
              });
          })
          .catch(error => {
            this.refs.toast.show(
              "Error al actualizar el avatar, intentelo mas tarde"
            );
          });
      }
    }
  };

  uploadImage = async (uri, imageName) => {
    //console.log("URI", uri);
    //console.log("nameImage:", nameImage);

    /*const resultFetch = fetch(uri);

    resultFetch.then(resolve => {
      console.log(resolve);
    });*/

    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.onerror = reject;
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          resolve(xhr.response);
        }
      };

      xhr.open("GET", uri);
      xhr.responseType = "blob";
      xhr.send();
    })
      .then(async resolve => {
        let ref = firebase
          .storage()
          .ref()
          .child("avatar/" + nameImage);
        return await ref.put(resolve);
      })
      .catch(error => {
        this.refs.toast.show(
          "Error al subir la imagen al servidor, intentelo mas tarde",
          1500
        );
      });
  };

  render() {
    const { displayName, email, photoURL } = this.state.userInfo;

    return (
      <View>
        <View style={styles.viewUserInfo}>
          <Avatar
            rounded
            size="large"
            showEditButton
            onEditPress={() => this.changeAvatarUser()}
            source={{
              uri: this.checkUserAvatar(photoURL)
            }}
            containerStyle={styles.userInfoAvatar}
          />
          <View>
            <Text style={styles.displayName}>{displayName}</Text>
            <Text>{email}</Text>
          </View>
        </View>
        {this.returnUpdateUserInfoComponente(this.state.userInfo)}

        <Toast
          ref="toast"
          position="bottom"
          positionValue={250}
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
  viewUserInfo: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingTop: 30,
    paddingBottom: 30,
    backgroundColor: "#f2f2f2"
  },
  userInfoAvatar: {
    marginRight: 20
  },
  displayName: {
    fontWeight: "bold"
  }
});
