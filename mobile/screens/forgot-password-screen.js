import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Ionicons } from "@expo/vector-icons";

const ForgotPasswordScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          width: "100%",
          marginLeft: "auto",
          marginRight: "auto",
          alignItems: "flex-start",
          marginTop: 35,
          marginLeft: 35,
        }}
      >
        <TouchableOpacity
          style={{
            width: "80%",
            height: 25,
          }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="md-arrow-round-back" size={30} color="#f07800" />
        </TouchableOpacity>
      </View>

      <View
        style={{
          width: "100%",
          marginLeft: "auto",
          marginRight: "auto",
          alignItems: "center",
          marginTop: 5,
        }}
      >
        <Image
          source={require("../assets/PussallaMeatProducersPvtLtd.png")}
          style={styles.image}
        />
        <Text
          style={{
            color: "black",
            fontWeight: "bold",
            fontSize: 30,
            textAlign: "center",
            paddingBottom: 10,
            paddingTop: 40,
            color: "#f07800",
          }}
        >
          Reset Password
        </Text>
        <View
          style={{
            height: 5,
            width: "100%",
            borderBottomColor: "#f07800",
            borderBottomWidth: 3,
            marginBottom: 30,
          }}
        />
        <TextInput
          style={styles.textInputStyle}
          placeholder="Email "
          placeholderTextColor="grey"
        />
        <TouchableOpacity
          style={{
            width: "80%",
            height: 40,
            backgroundColor: "#f07800",
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
            marginLeft: 20,
            marginRight: 20,
          }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Text style={{ color: "#fff", fontSize: 18 }}>RESET</Text>
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexDirection: "row",
            width: "60%",
            marginRight: 48,
            paddingTop: 15,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Text
              style={{
                color: "#f07800",
                fontSize: 15,
              }}
            >
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Text
              style={{
                color: "#f07800",
                fontSize: 15,
              }}
            >
              Signup
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

ForgotPasswordScreen.navigationOptions = (navigationData) => {
  return {
    headerTitle: "Forgot Password",
    headerLayoutPreset: "center",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#f07800",
      },
      headerTintColor: "white",
    },
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: wp("80%"),
    height: hp("25%"),
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingVertical: hp("1%"),
    paddingHorizontal: wp("1%"),
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignContent: "center",
    margin: 10,
  },
  textInputStyle: {
    borderColor: "#f07800",
    width: wp("80%"),
    borderWidth: 1,
    borderRadius: 10,
    height: 40,
    marginLeft: 20,
    marginRight: 20,
    padding: 10,
    marginTop: 8,
  },
});

export default ForgotPasswordScreen;
