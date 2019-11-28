import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { Card, Image, Rating } from "react-native-elements";

import { firebaseApp } from "../utils/FireBase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

export default class TopFive extends Component {
  constructor() {
    super();

    this.state = { gamings: null };
  }

  componentDidMount = () => {
    this.loadTopFiveGamings();
  };

  loadTopFiveGamings = async () => {
    const gamings = db
      .collection("gaming")
      .orderBy("rating", "desc")
      .limit(5);

    let gamingsArray = [];

    await gamings.get().then(response => {
      response.forEach(doc => {
        let gaming = doc.data();
        gaming.id = doc.id;
        gamingsArray.push(gaming);
      });
    });

    this.setState({
      gamings: gamingsArray
    });
  };

  renderGamings = gamings => {
    if (gamings) {
      return (
        <View>
          {gamings.map((gaming, index) => {
            let gamingClick = {
              item: {
                gaming: null
              }
            };

            gamingClick.item.gaming = gaming;

            return (
              <TouchableOpacity
                key={index}
                onPress={() => this.clickGaming(gamingClick)}
              >
                <Card>
                  <Image
                    style={styles.gamingImage}
                    reziseMode="cover"
                    source={{ uri: gaming.image }}
                  />
                  <View style={styles.titleRating}>
                    <Text style={styles.title}>{gaming.name}</Text>
                    <Rating
                      imageSize={20}
                      startingValue={gaming.rating}
                      readonly
                      style={styles.rating}
                    />
                  </View>
                  <Text style={styles.description}>{gaming.description}</Text>
                </Card>
              </TouchableOpacity>
            );
          })}
        </View>
      );
    } else {
      return (
        <View>
          <ActivityIndicator size="large" />
          <Text>Cargando Gamings</Text>
        </View>
      );
    }
  };

  clickGaming = gaming => {
    this.props.navigation.navigate("Gaming", { gaming });
  };

  render() {
    const { gamings } = this.state;

    return (
      <ScrollView style={styles.viewBody}>
        {this.renderGamings(gamings)}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1
  },
  gamingImage: {
    width: "100%",
    height: 200
  },
  titleRating: {
    flexDirection: "row",
    marginTop: 10
  },
  title: {
    fontSize: 20,
    fontWeight: "bold"
  },
  rating: {
    position: "absolute",
    right: 0
  },
  description: {
    color: "grey",
    marginTop: 10,
    textAlign: "justify"
  }
});
