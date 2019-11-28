import React from "react";
import { Icon } from "react-native-elements";

import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator
} from "react-navigation";

// Screens
import TopFiveScreen from "../screens/TopFive";
import SearchScreen from "../screens/Search";
//Screens MyAccount
import MyAccountScreen from "../screens/MyAccount/MyAccount";
import RegisterScreen from "../screens/MyAccount/Register";
import LoginScreen from "../screens/MyAccount/Login";

//Screens Gaming
import GamingScreen from "../screens/Gaming";
import AddGamingScreen from "../screens/Gamings/addGaming";
import ViewGamingScreen from "../screens/Gamings/viewGaming";
import AddReviewGamingScreen from "../screens/Gamings/addReviewGaming";

//Screens Event
import EventScreen from "../screens/Event";
import AddEventScreen from "../screens/Events/addEvent";

const gamingScreenStack = createStackNavigator({
  Gaming: {
    screen: GamingScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Gaming"
    })
  },
  AddGaming: {
    screen: AddGamingScreen,
    navigationOptions: ({ navigation }) => ({
      title: "New Gaming"
    })
  },
  ViewGaming: {
    screen: ViewGamingScreen,
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.gaming.item.gaming.name
    })
  },
  AddReviewGaming: {
    screen: AddReviewGamingScreen,
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.name
    })
  }
});

const eventScreenStack = createStackNavigator({
  Event: {
    screen: EventScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Event"
    })
  },
  AddEvent: {
    screen: AddEventScreen,
    navigationOptions: ({ navigation }) => ({
      title: "New Event"
    })
  }
});

const topFiveScreenStack = createStackNavigator({
  TopFive: {
    screen: TopFiveScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Top Five"
    })
  }
});

const searchScreenStack = createStackNavigator({
  Search: {
    screen: SearchScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Buscar"
    })
  }
});

const myAccountScreenStack = createStackNavigator({
  MyAccount: {
    screen: MyAccountScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Mi Cuenta"
    })
  },
  Register: {
    screen: RegisterScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Registro"
    })
  },
  Login: {
    screen: LoginScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Login"
    })
  }
});

const RootStack = createBottomTabNavigator(
  {
    Gaming: {
      screen: gamingScreenStack,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: "Gaming",
        tabBarLabel: ({ tintColor }) => (
          <Icon
            name="compass-outline"
            type="material-community"
            size={22}
            color={tintColor}
          />
        )
      })
    },

    Event: {
      screen: eventScreenStack,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: "Event",
        tabBarLabel: ({ tintColor }) => (
          <Icon
            name="calendar-outline"
            type="material-community"
            size={22}
            color={tintColor}
          />
        )
      })
    },

    TopFive: {
      screen: topFiveScreenStack,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: "Top 5",
        tabBarLabel: ({ tintColor }) => (
          <Icon
            name="star-outline"
            type="material-community"
            size={22}
            color={tintColor}
          />
        )
      })
    },

    Search: {
      screen: searchScreenStack,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: "Buscar",
        tabBarLabel: ({ tintColor }) => (
          <Icon
            name="magnify"
            type="material-community"
            size={22}
            color={tintColor}
          />
        )
      })
    },

    MyAccount: {
      screen: myAccountScreenStack,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: "Mi Cuenta",
        tabBarLabel: ({ tintColor }) => (
          <Icon
            name="home-outline"
            type="material-community"
            size={22}
            color={tintColor}
          />
        )
      })
    }
  },
  {
    initialRouteName: "Gaming",

    order: ["Gaming", "Event", "TopFive", "MyAccount"],

    tabBarOptions: {
      inactiveTintColor: "#646464",
      activeTintColor: "#00a680"
    }
  }
);

export default createAppContainer(RootStack);
