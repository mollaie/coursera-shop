import React, { useState } from "react";
import {
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  View,
} from "react-native";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { Colors, theme } from "../../theme/theme";
import { Ionicons } from "@expo/vector-icons";
import * as Facebook from "expo-facebook";
import { FacebookLoginResult } from "expo-facebook";
import * as Google from "expo-google-app-auth";
import { AuthenticationService } from "../../service/authentication.service";
import UserModel from "../../models/user.model";
const initialState: UserModel = {
  FirstName: "",
  LastName: "",
  Email: "",
  Mobile: "",
  Password: "",
};

export default function SignUp({ navigation }) {
  const [model, setModel] = useState(initialState);
  const [isLoggedin, setLoggedinStatus] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isImageLoading, setImageLoadStatus] = useState(false);

  const ClearState = () => setModel(initialState);

  const Register = async () => {
    try {
      const result = AuthenticationService.Registration(model);
      if (result) {
        const login = await AuthenticationService.SignIn(
          model.Email,
          model.Password
        );
        if (login.user) {
          console.log(JSON.stringify(login));
          ClearState();
          navigation.navigate("Root");
        }
      }
    } catch (error) {
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

  const ValidateForm = (): boolean => {
    return model.Email.length > 0 &&
      model.FirstName.length > 0 &&
      model.LastName.length > 0 &&
      model.Mobile.length > 0 &&
      model.Password.length > 0
      ? false
      : true;
  };

  return (
    <KeyboardAvoidingView style={theme.container} behavior="height">
      <ImageBackground
        source={require("../../assets/images/Background.png")}
        style={theme.imageCover}
      >
        <ScrollView style={theme.contentContainer}>
          <Text style={{ ...theme.titleText, marginTop: 64 }}>
            Let's Sign Up.
          </Text>
          <Text style={theme.normalText}>
            Do you have an account?{" "}
            <Text
              style={{ color: Colors.primary }}
              onPress={() => navigation.navigate("Login")}
            >
              Login
            </Text>
          </Text>
          <TextInput
            style={{ ...theme.textInput, marginTop: 70 }}
            placeholder="First Name"
            onChangeText={(value) => setModel({ ...model, FirstName: value })}
          ></TextInput>
          <TextInput
            style={theme.textInput}
            placeholder="Last Name"
            onChangeText={(value) => setModel({ ...model, LastName: value })}
          ></TextInput>
          <TextInput
            style={theme.textInput}
            placeholder="Email"
            textContentType="emailAddress"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={(value) => setModel({ ...model, Email: value })}
          ></TextInput>
          <TextInput
            style={theme.textInput}
            placeholder="Mobile Number"
            textContentType="telephoneNumber"
            keyboardType="number-pad"
            onChangeText={(value) => setModel({ ...model, Mobile: value })}
          ></TextInput>
          <TextInput
            style={theme.textInput}
            placeholder="Password"
            textContentType="password"
            secureTextEntry={true}
            returnKeyType="go"
            onChangeText={(value) => setModel({ ...model, Password: value })}
          ></TextInput>
          <TouchableOpacity
            style={[
              theme.button,
              ValidateForm()
                ? theme.disabledPrimaryButton
                : theme.primaryButton,
            ]}
            onPress={() => Register()}
            disabled={ValidateForm()}
          >
            <Text
              style={{ ...theme.buttonDefaultText, ...theme.buttonPrimaryText }}
            >
              Register
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
