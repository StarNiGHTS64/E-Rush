import React, { Component } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { Image, Icon, ListItem, Button } from "react-native-elements";

export default class ViewGaming extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      id,
      name,
      type,
      city,
      address,
      description,
      image
    } = this.props.navigation.state.params.gaming.item.gaming;

    const listExtraInfo = [
      {
        text: `${city}, ${address}`,
        iconName: "map-marker",
        iconType: "material-community",
        action: null
      }
    ];

    return (
      <View style={styles.viewBody}>
        <View style={styles.viewImage}>
          <Image
            source={{ uri: image }}
            PlaceholderContent={<ActivityIndicator />}
            style={styles.imageGaming}
          />
        </View>
        <View style={styles.viewGamingBasicInfo}>
          <Text style={styles.nameGaming}>{name}</Text>
          <Text style={styles.descriptionGaming}>{description}</Text>
        </View>

        <View style={styles.viewGamingExtraInfo}>
          <Text style={styles.gamingExtraInfoTitle}>
            Informacion sobre el Gaming Center
          </Text>
          {listExtraInfo.map((item, index) => (
            <ListItem
              key={index}
              title={item.text}
              leftIcon={<Icon name={item.iconName} type={item.iconType} />}
            />
          ))}
        </View>

        <View style={styles.viewBtnAddReview}>
          <Button
            title="Agregar Comentario"
            onPress={() =>
              this.props.navigation.navigate("AddReviewGaming", { id, name })
            }
            buttonStyle={styles.btnAddReview}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1
  },
  viewImage: {
    width: "100%"
  },
  imageGaming: {
    width: "100%",
    height: 200
  },
  viewGamingBasicInfo: {
    margin: 15
  },
  nameGaming: {
    fontSize: 20,
    fontWeight: "bold"
  },
  descriptionGaming: {
    marginTop: 5,
    color: "grey"
  },
  viewGaming: {
    margin: 15,
    marginTop: 25
  },
  gamingExtraInfoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10
  },
  viewBtnAddReview: {
    margin: 20
  },
  btnAddReview: {
    backgroundColor: "#00a680"
  }
});
