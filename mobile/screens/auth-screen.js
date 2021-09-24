import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Animated,
  ScrollView,
  Image,
  Dimensions,
  Button,
  TextInput,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const AuthScreen = ({ navigation }) => {
  const [active, setActive] = useState(1);
  const [xTabOne, setXTabOne] = useState(0);
  const [xTabTwo, setXTabTwo] = useState(0);
  const [translateX, setTranslateX] = useState(new Animated.Value(0));
  const [translateXTabOne, setTranslateXTabOne] = useState(
    new Animated.Value(0)
  );
  const [translateXTabTwo, setTranslateXTabTwo] = useState(
    new Animated.Value(width)
  );
  const [translateY, setTranslateY] = useState(-1000);

  const [loginMail, setLoginMail] = useState(null);
  const [loginPassword, setLoginPassword] = useState(null);

  handleSlide = (type) => {
    Animated.spring(translateX, {
      toValue: type,
      duration: 100,
    }).start();
    if (active === 0) {
      Animated.parallel([
        Animated.spring(translateXTabOne, {
          toValue: 0,
          duration: 100,
        }).start(),
        Animated.spring(translateXTabTwo, {
          toValue: width,
          duration: 100,
        }).start(),
      ]);
    } else {
      Animated.parallel([
        Animated.spring(translateXTabOne, {
          toValue: -width,
          duration: 100,
        }).start(),
        Animated.spring(translateXTabTwo, {
          toValue: 0,
          duration: 100,
        }).start(),
      ]);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          width: "100%",
          marginLeft: "auto",
          marginRight: "auto",
          alignItems: "center",
          marginTop: 30,
        }}
      >
        {active ? (
          <Image
            source={require("../assets/PussallaMeatProducersPvtLtd.png")}
            style={styles.image}
          />
        ) : null}
        <Text
          style={{
            color: "black",
            fontWeight: "bold",
            fontSize: 35,
            textAlign: "center",
            paddingBottom: 0,
            paddingTop: active ? 0 : 40,
          }}
        >
          Welcome
        </Text>
        <View
          style={{
            flexDirection: "row",
            marginTop: 40,
            marginBottom: 20,
            height: 36,
            position: "relative",
          }}
        >
          <Animated.View
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              top: 0,
              left: 0,
              borderRadius: 4,
              transform: [
                {
                  translateX,
                },
              ],
            }}
          />
          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              borderBottomWidth: active === 0 ? 3 : 0,
              borderColor: active === 0 ? "#f07800" : null,
            }}
            onLayout={(event) => setXTabOne(event.nativeEvent.layout.x)}
            onPress={() => {
              setActive(0);
              handleSlide(xTabOne);
            }}
          >
            <Text
              style={{
                color: active === 0 ? "#f07800" : "black",
                fontWeight: active === 0 ? "bold" : "normal",
                fontSize: 23,
                paddingBottom: 10,
              }}
            >
              Signup
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              borderBottomWidth: active === 1 ? 3 : 0,
              borderColor: active === 1 ? "#f07800" : null,
            }}
            onLayout={(event) => setXTabTwo(event.nativeEvent.layout.x)}
            onPress={() => {
              setActive(1);
              handleSlide(xTabTwo);
            }}
          >
            <Text
              style={{
                color: active === 1 ? "#f07800" : "black",
                fontWeight: active === 1 ? "bold" : "normal",

                fontSize: 23,
                paddingBottom: 10,
              }}
            >
              Login
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView>
          <Animated.View
            style={{
              justifyContent: "center",
              alignItems: "center",
              transform: [
                {
                  translateX: translateXTabOne,
                },
              ],
            }}
            onLayout={(event) => setTranslateY(event.nativeEvent.layout.height)}
          >
            <View style={styles.container}>
              <TextInput
                style={styles.textInputStyle}
                onChangeText={(inputText) => setLoginMail(inputText)}
                placeholder="Email"
                placeholderTextColor="grey"
              />
              <TextInput
                style={styles.textInputStyle}
                onChangeText={(inputText) => setLoginPassword(inputText)}
                placeholder="Password"
                placeholderTextColor="grey"
                secureTextEntry={true}
              />

              <View
                style={{
                  marginBottom: 10,
                  marginTop: 25,
                  marginLeft: 20,
                  marginRight: 20,
                  borderRadius: 10,
                }}
              >
                <TouchableOpacity
                  style={{
                    width: "100%",
                    height: 40,
                    backgroundColor: "#f07800",
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => {
                    navigation.navigate("Shop");
                  }}
                >
                  <Text style={{ color: "#fff", fontSize: 18 }}>Login</Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  marginLeft: 20,
                  marginRight: 20,
                }}
              >
                <TouchableOpacity
                  style={{
                    flex: 1,
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                  }}
                  onLayout={(event) => setXTabTwo(event.nativeEvent.layout.x)}
                  onPress={() => {
                    navigation.navigate({
                      routeName: "ForgotPassword",
                    });
                  }}
                >
                  <Text
                    style={{
                      color: "#f07800",
                      fontSize: 15,
                    }}
                  >
                    Forgot Password ?
                  </Text>
                </TouchableOpacity>
              </View>

              {/* <View
                style={{
                  marginBottom: 20,
                  marginLeft: 20,
                  marginRight: 20,
                  borderRadius: 10,
                }}
              >
                <Ionicons name="ios-home" size={25} />
              </View> */}
            </View>

            <View style={{ marginTop: 20 }}></View>
          </Animated.View>

          <Animated.View
            style={{
              justifyContent: "center",
              alignItems: "center",
              transform: [
                {
                  translateX: translateXTabTwo,
                },
                {
                  translateY: -translateY,
                },
              ],
            }}
          >
            <View style={styles.container}>
              <TextInput
                style={styles.textInputStyle}
                onChangeText={(inputText) => setLoginMail(inputText)}
                placeholder="Name"
                placeholderTextColor="grey"
              />
              <TextInput
                style={styles.textInputStyle}
                onChangeText={(inputText) => setLoginMail(inputText)}
                placeholder="Address"
                placeholderTextColor="grey"
              />
              <TextInput
                style={styles.textInputStyle}
                onChangeText={(inputText) => setLoginMail(inputText)}
                placeholder="Email"
                placeholderTextColor="grey"
              />
              <TextInput
                style={styles.textInputStyle}
                onChangeText={(inputText) => setLoginPassword(inputText)}
                placeholder="Password"
                placeholderTextColor="grey"
                secureTextEntry={true}
              />

              <View
                style={{
                  marginTop: 20,
                  marginLeft: 20,
                  marginRight: 20,
                  borderRadius: 10,
                }}
              >
                <TouchableOpacity
                  style={{
                    width: "100%",
                    height: 40,
                    backgroundColor: "#f07800",
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => {
                    navigation.navigate("Shop");
                  }}
                >
                  <Text style={{ color: "#fff", fontSize: 18 }}>SignUp</Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  marginBottom: 10,
                  marginTop: 15,
                  marginLeft: 20,
                  marginRight: 20,
                }}
              >
                <TouchableOpacity
                  style={{
                    flex: 1,
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                  }}
                  onLayout={(event) => setXTabTwo(event.nativeEvent.layout.x)}
                  onPress={() => {
                    navigation.navigate({
                      routeName: "ForgotPassword",
                    });
                  }}
                >
                  <Text
                    style={{
                      color: "#f07800",
                      fontSize: 15,
                    }}
                  >
                    Forgot Password ?
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ marginTop: 20 }}></View>
          </Animated.View>
        </ScrollView>
      </View>
    </View>
  );
};

AuthScreen.navigationOptions = (navigationData) => {
  return {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false,
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

export default AuthScreen;
