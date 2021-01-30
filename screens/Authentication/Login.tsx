import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { theme } from "../../theme/theme";
import * as Facebook from "expo-facebook";
import { FacebookLoginResult } from "expo-facebook";
import * as Google from "expo-google-app-auth";
import { AuthenticationService } from "../../service/authentication.service";

const initialState = {
  email: "",
  password: "",
};

export default function Login({ navigation }) {
  const [state, setstate] = useState(initialState);
  const [Loading, setLoading] = useState(false);

  const ValidateForm = (): boolean => {
    return state.email.length > 0 && state.password.length > 0 ? false : true;
  };

  const ClearState = () => setstate(initialState);

  const Login = async () => {
    try {
      const login = await AuthenticationService.SignIn(
        state.email,
        state.password
      );
      if (login.user) {
        ClearState();
        navigation.navigate("Root");
      } else {
        alert("Email or Password is wrong.Please try agin");
      }
    } catch (error) {
      alert(error);
      //Alert.alert("Credential Error", error);
      console.log(error);
    }
  };

  const LoginWithFacebook = async () => {
    try {
      await Facebook.initializeAsync({
        appId: "439087423801319",
        appName: "Coursera Shop",
      });
      const result: FacebookLoginResult = await Facebook.logInWithReadPermissionsAsync(
        {
          permissions: ["public_profile"],
        }
      );
      if (result.type === "success") {
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${result.token}`
        );
        Alert.alert("Logged in!", `Hi ${(await response.json()).name}!`);
      } else {
        Alert.alert(`Ops... \n You canceled login`);
      }
    } catch ({ message }) {
      Alert.alert(`Facebook Login Error: ${message}`);
    }
  };

  const LoginWithGoogle = async () => {
    const config = {
      iosClientId: `645529795158-t0pghvhukagj003ep9bu5c3l66sotdgp.apps.googleusercontent.com`,
    };
    const response = await Google.logInAsync(config);

    if (response.type === "success") {
      /* `accessToken` is now valid and can be used to get data from the Google API with HTTP requests */
      Alert.alert(JSON.stringify(response.user));
    }
  };

  return (
    <KeyboardAvoidingView style={theme.container} behavior="height">
      <ImageBackground
        source={require("../../assets/images/Background.png")}
        style={theme.imageCover}
      >
        <ScrollView style={theme.contentContainer}>
          <View
            style={{
              display: "flex",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <Image
              source={require("../../assets/images/Intro/Character-reading.png")}
              style={{
                width: 128,
                height: 128,
              }}
            />
          </View>
          <Text
            style={{ ...theme.titleText, marginTop: 64, paddingBottom: 48 }}
          >
            Let's Login.
          </Text>
          <TextInput
            style={theme.textInput}
            placeholder="Email"
            textContentType="emailAddress"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={(value) => setstate({ ...state, email: value })}
          ></TextInput>
          <TextInput
            style={theme.textInput}
            placeholder="Password"
            textContentType="password"
            secureTextEntry={true}
            returnKeyType="go"
            onChangeText={(value) => setstate({ ...state, password: value })}
          ></TextInput>
          <TouchableOpacity
            style={[
              theme.button,
              ValidateForm()
                ? theme.disabledPrimaryButton
                : theme.primaryButton,
            ]}
            onPress={() => Login()}
            disabled={ValidateForm()}
          >
            <Text
              style={{ ...theme.buttonDefaultText, ...theme.buttonPrimaryText }}
            >
              Login
            </Text>
          </TouchableOpacity>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1, paddingVertical: 8, marginRight: 8 }}>
              <TouchableOpacity
                style={{ ...theme.button }}
                onPress={() => {
                  LoginWithGoogle();
                }}
              >
                <Ionicons name="logo-google" size={32} color="#FFFFFF" />
                <Text style={theme.buttonDefaultText}>Gmail</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, paddingVertical: 8, marginLeft: 8 }}>
              <TouchableOpacity
                style={{ ...theme.button }}
                onPress={() => {
                  LoginWithFacebook();
                }}
              >
                <Ionicons name="logo-facebook" size={32} color="#FFFFFF" />
                <Text style={theme.buttonDefaultText}>Facebook</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}
