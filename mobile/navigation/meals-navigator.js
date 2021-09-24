import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import Colors from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import AuthScreen from "../screens/auth-screen";
import ForgotPasswordScreen from "../screens/forgot-password-screen";
import ProfileScreen from "../screens/profile-screen";
import HomeScreen from "../screens/home-screen";

const HomeNavigator = createStackNavigator(
  {
    Home: HomeScreen,
  },
  {
    headerLayoutPreset: "center",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Colors.primaryColor,
      },
      headerTintColor: "white",
    },
  }
);

const ProfileNavigator = createStackNavigator(
  {
    Profile: ProfileScreen,
  },
  {
    headerLayoutPreset: "center",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Colors.primaryColor,
      },
      headerTintColor: "white",
    },
  }
);

const ShopNavigator = createDrawerNavigator(
  {
    Home: {
      screen: HomeNavigator,
      navigationOptions: {
        drawerLabel: "Home",
        drawerIcon: <Ionicons name="ios-home" size={25} />,
      },
    },
    Profile: {
      screen: ProfileNavigator,
      navigationOptions: {
        drawerLabel: "Profile",
        drawerIcon: <Ionicons name="md-person" size={25} />,
      },
    },
  },
  {
    drawerBackgroundColor: "rgba(255, 255, 255, 0.9)",
    contentOptions: {
      activeTintColor: Colors.primaryColor,
      labelStyle: {},
    },
  }
);

const AuthNavigator = createStackNavigator(
  {
    Auth: AuthScreen,
    ForgotPassword: ForgotPasswordScreen,
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false,
    },
  }
);

const MainNavigator = createSwitchNavigator({
  Auth: AuthNavigator,
  Shop: ShopNavigator,
});

export default createAppContainer(MainNavigator);
