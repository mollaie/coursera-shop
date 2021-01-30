import React from "react";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { theme } from "../../theme/theme";
import { Ionicons } from "@expo/vector-icons";
export default function Toolbar({ navigation }) {
  return (
    <View style={theme.toolbarContainer}>
      <TouchableOpacity
        style={theme.toolbarBackButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="chevron-back-outline" size={32} />
      </TouchableOpacity>
    </View>
  );
}
