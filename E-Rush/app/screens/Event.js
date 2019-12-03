import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import { Image } from "react-native-elements";
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/Ionicons";

import { firebaseApp } from "../utils/FireBase";
import firebase from "firebase/app";
import "firebase/firestore";
import AddEvent from "./Events/addEvent";
const db = firebase.firestore(firebaseApp);

export default class Event extends Component {
  constructor() {
    super();

    this.state = {
      login: false,
      events: null,
      startEvents: null,
      limitEvents: 8,
      isLoading: true
    };
  }

  componentDidMount() {
    this.checkLogin();
    this.loadEvents();
  }

  checkLogin = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          login: true
        });
      } else {
        this.setState({
          login: false
        });
      }
    });
  };

  loadActionButton = () => {
    const { login } = this.state;

    if (login) {
      return (
        <ActionButton
          buttonColor="#00a680"
          onPress={() =>
            this.props.navigation.navigate("AddEvent", {
              loadEvents: this.loadEvents
            })
          }
        />
      );
    }

    return null;
  };

  loadEvents = async () => {
    const { limitEvents } = this.state;
    let resultEvents = [];

    const events = db
      .collection("event")
      .orderBy("createdAt", "desc")
      .limit(limitEvents);

    await events.get().then(response => {
      this.setState({
        startEvents: response.docs[response.docs.length - 1]
      });

      response.forEach(doc => {
        let event = doc.data();
        event.id = doc.id;

        resultEvents.push({ event });
      });

      this.setState({
        events: resultEvents
      });
    });
  };

  handleLoadMore = async () => {
    const { limitEvents, startEvents } = this.state;
    let resultEvents = [];

    this.state.events.forEach(doc => {
      resultEvents.push(doc);
    });

    const eventsDB = db
      .collection("event")
      .orderBy("createAt", "desc")
      .startAfter(startEvents.data().createdAt)
      .limit(limitEvents);

    await eventsDB.get().then(response => {
      if (response.docs.length > 0) {
        this.setState({
          startEvents: response.docs[response.docs.length - 1]
        });
      } else {
        this.setState({
          isLoading: false
        });
      }

      response.forEach(doc => {
        let event = doc.data();
        event.id = doc.id;
        resultEvents.push({ event });
      });

      this.setState({
        events: resultEvents
      });
    });
  };

  renderRow = event => {
    const { name, date, city, address, description, image } = event.item.event;

    return (
      <TouchableOpacity onPress={() => this.clickEvent(event)}>
        <View style={styles.viewEvent}>
          <View style={StyleSheet.viewEventImage}>
            <Image
              resizeMode="cover"
              source={{ uri: image }}
              style={styles.imageEvent}
            />
          </View>
          <View>
            <Text style={styles.flatListEventName}>
              {name} - {date}
            </Text>
            <Text style={styles.flatListEventAddress}>
              {city}, {address}
            </Text>
            <Text style={styles.flatListEventDescription}>
              {description.substr(0, 60)}...
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  renderFooter = () => {
    if (this.state.isLoading) {
      return (
        <View style={styles.loaderEvents}>
          <ActivityIndicator size="large" />
        </View>
      );
    } else {
      return (
        <View style={styles.notFoundEvents}>
          <Text>No quedan Eventos que cargar</Text>
        </View>
      );
    }
  };

  renderFlatList = events => {
    if (events) {
      return (
        <FlatList
          data={this.state.events}
          renderItem={this.renderRow}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={0.1}
          ListFooterComponent={this.renderFooter}
        />
      );
    } else {
      return (
        <View style={styles.startLoadEvents}>
          <ActivityIndicator size="large" />
          <Text>Cargando Eventos</Text>
        </View>
      );
    }
  };

  clickEvent = event => {
    this.props.navigation.navigate("ViewEvent", { event });
  };

  render() {
    const { events } = this.state;

    return (
      <View style={styles.viewBody}>
        {this.renderFlatList(events)}
        {this.loadActionButton()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1
  },
  startLoadEvents: {
    marginTop: 20,
    alignItems: "center"
  },
  viewEvent: {
    flexDirection: "row",
    margin: 10
  },
  viewEventImage: {
    marginRight: 15
  },
  imageEvent: {
    width: 80,
    height: 80
  },
  flatListEventName: {
    fontWeight: "bold"
  },
  flatListEventAddress: {
    paddingTop: 2,
    color: "grey"
  },
  flatListEventDescription: {
    paddingTop: 2,
    color: "grey",
    width: 300
  },
  loaderEvents: {
    marginTop: 10,
    marginBottom: 10
  },
  notFoundEvents: {
    marginTop: 10,
    marginBottom: 20,
    alignItems: "center"
  }
});
