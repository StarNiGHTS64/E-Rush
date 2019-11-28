import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
  FlatList
} from "react-native";
import {
  Image,
  Icon,
  ListItem,
  Button,
  Text,
  Rating,
  Avatar
} from "react-native-elements";

import Toast, { DURATION } from "react-native-easy-toast";

import { firebaseApp } from "../../utils/FireBase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

export default class ViewGaming extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reviews: null,
      startReview: null,
      limitReviews: 5,
      isLoading: true
    };
  }

  componentDidMount() {
    this.loadReviews();
  }

  checkUserLogin = () => {
    const user = firebase.auth().currentUser;
    if (user) {
      return true;
    }

    return false;
  };

  checkAddReviewUser = () => {
    const user = firebase.auth().currentUser;
    const idUser = user.uid;
    const idGaming = this.props.navigation.state.params.gaming.item.gaming.id;

    //console.log("User:", idUser);
    //console.log("idGaming:", idGaming);

    const reviewsRef = db.collection("review");
    const queryRef = reviewsRef
      .where("idUser", "==", idUser)
      .where("idGaming", "==", idGaming);

    return queryRef.get().then(resolve => {
      const countReview = resolve.size;

      if (countReview > 0) {
        return true;
      } else {
        return false;
      }
    });
  };

  goToScreenAddReview = () => {
    this.checkAddReviewUser().then(resolve => {
      if (resolve) {
        this.refs.toast.show(
          "Ya has enviado una review, no puedes enviar mas",
          1500
        );
      } else {
        const {
          id,
          name
        } = this.props.navigation.state.params.gaming.item.gaming;
        this.props.navigation.navigate("AddReviewGaming", {
          id,
          name,
          loadReviews: this.loadReviews
        });
      }
    });
  };

  loadButtonAddReview = () => {
    if (!this.checkUserLogin()) {
      return (
        <Text>
          Para escribir una review tienes que iniciar session, puedes hacerlo{" "}
          {""}
          <Text
            onPress={() => this.props.navigation.navigate("Login")}
            style={styles.textLinkLogin}
          >
            AQUI.
          </Text>
        </Text>
      );
    } else {
      return (
        <Button
          title="Agregar Comentario"
          onPress={() => this.goToScreenAddReview()}
          buttonStyle={styles.btnAddReview}
        />
      );
    }
  };

  loadReviews = async () => {
    const { limitReviews } = this.state;
    const { id } = this.props.navigation.state.params.gaming.item.gaming;

    let resultReviews = [];
    let arrayRating = [];

    const reviews = db.collection("review").where("idGaming", "==", id);

    return await reviews.get().then(response => {
      this.setState({
        startReview: response.docs[response.docs.length - 1]
      });

      response.forEach(doc => {
        let review = doc.data();
        resultReviews.push(review);

        arrayRating.push(doc.data().rating);
      });

      let numSum = 0;
      arrayRating.map(value => {
        numSum = numSum + value;
      });
      const countRating = arrayRating.length;
      const resultRating = numSum / countRating;
      const resultRatingFinish = resultRating ? resultRating : 0;

      this.setState({
        reviews: resultReviews,
        rating: resultRatingFinish
      });
      console.log(this.state.reviews);
    });
  };

  renderFlatList = reviews => {
    if (reviews) {
      return (
        <FlatList
          data={reviews}
          renderItem={this.renderRow}
          keyExtractor={(item, index) => index.toString()}
          onEndReachedThreshold={0.1}
        />
      );
    } else {
      return (
        <View style={styles.startLoadReview}>
          <ActivityIndicator size="large" />
          <Text>Cargando reviews</Text>
        </View>
      );
    }
  };

  renderRow = reviewData => {
    const { title, review, rating, idUser, createAt } = reviewData.item;
    // const createReview = new Date(createAt.seconds * 1000);

    return (
      <View style={styles.viewReview}>
        <View style={styles.viewImage}></View>
        <View style={styles.viewInfo}>
          <Text style={styles.reviewTitle}>{title}</Text>
          <Text style={styles.reviewText}>{review}</Text>
          <Rating imageSize={15} startingValue={rating} />
          <Text style={styles.reviewData}></Text>
        </View>
      </View>
    );
  };

  render() {
    const { reviews } = this.state;
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
      <ScrollView style={styles.viewBody}>
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
          {this.loadButtonAddReview()}
        </View>
        <Text style={styles.commentTitle}>Comentarios</Text>
        {this.renderFlatList(reviews)}

        <Toast
          ref="toast"
          position="bottom"
          positionValue={320}
          fadeInDuration={1000}
          fadeOutDuration={1000}
          opacity={0.8}
          textStyle={{ color: "#fff" }}
        />
      </ScrollView>
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
  },
  textLinkLogin: {
    color: "#00a608",
    fontWeight: "bold"
  },
  startLoadReview: {
    marginTop: 20,
    alignItems: "center"
  },
  viewReview: {
    flexDirection: "row",
    margin: 10,
    padding: 20,
    borderBottomColor: "#e3e3e3",
    borderBottomWidth: 1
  },
  viewImage: {
    marginRight: 15
  },
  imageAvatarUser: {
    width: 50,
    height: 50
  },
  viewInfo: {
    flex: 1,
    alignItems: "flex-start"
  },
  reviewTitle: {
    fontWeight: "bold"
  },
  reviewText: {
    paddingTop: 2,
    color: "grey",
    marginBottom: 5
  },
  reviewDate: {
    marginTop: 5,
    color: "grey",
    fontSize: 12
  },
  commentTitle: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
    fontWeight: "bold"
  }
});
