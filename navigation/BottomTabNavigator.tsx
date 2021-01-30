import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { View, Text, StyleSheet } from "react-native";

import useColorScheme from "../hooks/useColorScheme";
import Home from "../screens/Home/Home";
import CartScreen from "../screens/Home/Cart";

import TabOneScreen from "../screens/TabOneScreen";
import TabTwoScreen from "../screens/TabTwoScreen";
import { Colors } from "../theme/theme";
import {
  BottomTabParamList,
  CartParamList,
  HomeParamList,
  ProfileParamList,
  SearchParamList,
} from "../types";
import SearchScreen from "../screens/Home/Search";
import ProfileScreen from "../screens/Home/Profile";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: Colors.primary,
        showLabel: false,
        style: {
          backgroundColor: Colors.lightGray,
          position: "absolute",
          bottom: 34,
          borderBottomEndRadius: 24,
          borderBottomStartRadius: 24,
          marginHorizontal: 16,
          padding: 24,
        },
      }}
    >
      <BottomTab.Screen
        name="Cart"
        component={CartNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <View style={styles.ButtonContainer}>
              <TabBarIcon name="cart-outline" color={color} />
              <Text
                style={{
                  ...styles.ButtonText,
                  display: color === Colors.primary ? "flex" : "none",
                  color,
                }}
              >
                Cart
              </Text>
            </View>
          ),
        }}
      />
      {/* <BottomTab.Screen
        name="Search"
        component={SearchNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <View style={styles.ButtonContainer}>
              <TabBarIcon name="search-outline" color={color} />
              <Text
                style={{
                  ...styles.ButtonText,
                  display: color === Colors.primary ? "flex" : "none",
                  color,
                }}
              >
                Search
              </Text>
            </View>
          ),
        }}
      /> */}
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <View style={styles.ButtonContainer}>
              <TabBarIcon name="home-outline" color={color} />
              <Text
                style={{
                  ...styles.ButtonText,
                  display: color === Colors.primary ? "flex" : "none",
                  color,
                }}
              >
                Home
              </Text>
            </View>
          ),
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <View style={styles.ButtonContainer}>
              <TabBarIcon name="person-outline" color={color} />
              <Text
                style={{
                  ...styles.ButtonText,
                  display: color === Colors.primary ? "flex" : "none",
                  color,
                }}
              >
                Profile
              </Text>
            </View>
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const SearchStack = createStackNavigator<SearchParamList>();

function SearchNavigator() {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen
        name="Search"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
    </SearchStack.Navigator>
  );
}

const CartStack = createStackNavigator<CartParamList>();

function CartNavigator() {
  return (
    <CartStack.Navigator>
      <CartStack.Screen
        name="Cart"
        component={CartScreen}
        options={{ headerShown: false }}
      />
    </CartStack.Navigator>
  );
}

const HomeStack = createStackNavigator<HomeParamList>();

function HomeNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
}

const ProfileStack = createStackNavigator<ProfileParamList>();

function ProfileNavigator() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </ProfileStack.Navigator>
  );
}

const styles = StyleSheet.create({
  ButtonContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  ButtonText: {
    fontWeight: "bold",
    marginHorizontal: 12,
    paddingTop: 8,
  },
});
