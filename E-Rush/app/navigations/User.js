import React from "react";
import { Icon } from "react-native-elements";

import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator
} from "react-navigation";

// Screens
import HomeScreen from "../screens/Home";
import TopFiveScreen from "../screens/TopFive";
import SearchScreen from "../screens/Search";
import MyAccountScreen from "../screens/MyAccount";

const homeScreenStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Home"
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
  }
});

const RootStack = createBottomTabNavigator(
  {
    Home: {
      screen: homeScreenStack,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: "Home",
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
    initialRouteName: "Home",

    order: ["Search", "Home", "TopFive", "MyAccount"],

    tabBarOptions: {
      inactiveTintColor: "#646464",
      activeTintColor: "#00a680"
    }
  }
);

export default createAppContainer(RootStack);
