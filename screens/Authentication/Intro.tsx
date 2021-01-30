import * as React from "react";
import { Text, View } from "../../components/Themed";
import { StyleSheet, ImageBackground, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import Navigation from "../../navigation";

const { width, height } = Dimensions.get("screen");

export default function Intro({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/Background.png")}
        style={styles.image}
      >
        <Image
          source={require("../../assets/images/Intro/Character-reading.png")}
        />
        <Text style={styles.text}>The Right Address For Shopping Everyday</Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            backgroundColor: "transparent",
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 47,
            marginTop: 116,
          }}
        >
          <Text
            style={{
              color: "#000000",
              fontSize: 27,
              fontWeight: "bold",
              textAlign: "left",
              flex: 4,
            }}
          >
            Register
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: "#000000",
              width: 64,
              height: 64,
              borderRadius: 64,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <Ionicons
              name="chevron-forward-outline"
              size={32}
              color="#FFFFFF"
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: "transparent",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            marginTop: 56,
          }}
        >
          <TouchableOpacity
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              width: width,
              height: 50,
              paddingHorizontal: 47,
            }}
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <Text
              style={{
                color: "#000000",
                fontSize: 17,
                textAlign: "left",
              }}
            >
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  secondImage: {
    textAlign: "center",
  },
  text: {
    color: "#000000",
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 37,
  },
});
