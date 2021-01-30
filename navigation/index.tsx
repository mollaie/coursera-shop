import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { ColorSchemeName } from "react-native";
import Intro from "../screens/Authentication/Intro";
import Login from "../screens/Authentication/Login";
import SignUp from "../screens/Authentication/SignUp";
import ProductScreen from "../screens/Home/Product";

import NotFoundScreen from "../screens/NotFoundScreen";
import { Colors } from "../theme/theme";
import { RootStackParamList } from "../types";
import BottomTabNavigator from "./BottomTabNavigator";
import LinkingConfiguration from "./LinkingConfiguration";

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DefaultTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  const defaultPageHeader = {
    headerShown: true,
    title: "",
    headerTintColor: "#000000",
    headerTransparent: true,
    headerBackTitle: " ",
  };
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Intro" component={Intro} />
      <Stack.Screen
        name="Login"
        component={Login}
        options={defaultPageHeader}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={defaultPageHeader}
      />
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{
          headerShown: false,
          headerTitle: "",
          headerBackTitleVisible: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="Product"
        component={ProductScreen}
        options={{
          headerTitle: "",
          headerShown: true,
          headerTintColor: Colors.dark,
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
    </Stack.Navigator>
  );
}
