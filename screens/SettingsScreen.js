import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity, Switch, Alert } from "react-native";
import { Styles } from "../src/Styles";
import { ThemeContext } from "../src/ThemeContext";

export default function SettingsScreen({ navigation }) {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const [quality, setQuality] = useState("High");
  const [storageAllowed, setStorageAllowed] = useState(false);

  // Download Quality toggle
  const handleQuality = () => {
    const next =
      quality === "High" ? "Medium" : quality === "Medium" ? "Low" : "High";
    setQuality(next);
    Alert.alert("Download Quality", "Changed to " + next);
  };

  // Storage Access toggle
  const handleStorage = () => {
    const val = !storageAllowed;
    setStorageAllowed(val);
    Alert.alert("Storage Access", val ? "Access Granted" : "Access Removed");
  };

  return (
    <View style={[Styles.body, { backgroundColor: theme.background }]}>
      <View
        style={[
          Styles.header,
          { backgroundColor: theme.dark ? "#1E1E1E" : Styles.header.backgroundColor },
        ]}
      >
        <Text style={[Styles.headerText, { color: "#fff" }]}>Settings</Text>
      </View>

      <View style={Styles.container}>

        {/* THEME */}
        <TouchableOpacity
          style={[Styles.card, { backgroundColor: theme.card }]}
          onPress={toggleTheme}
        >
          <Text style={{ color: theme.text }}>Theme: Light / Dark</Text>
          <Switch
            value={theme.dark}
            onValueChange={toggleTheme}
            style={{ marginTop: 10 }}
          />
        </TouchableOpacity>

        {/* DOWNLOAD QUALITY */}
        <TouchableOpacity
          style={[Styles.card, { backgroundColor: theme.card }]}
          onPress={handleQuality}
        >
          <Text style={{ color: theme.text }}>Download Quality</Text>
          <Text style={{ marginTop: 8, color: theme.text }}>{quality}</Text>
        </TouchableOpacity>

        {/* STORAGE ACCESS */}
        <TouchableOpacity
          style={[Styles.card, { backgroundColor: theme.card }]}
          onPress={handleStorage}
        >
          <Text style={{ color: theme.text }}>Storage Access</Text>
          <Switch
            value={storageAllowed}
            onValueChange={handleStorage}
            style={{ marginTop: 10 }}
          />
        </TouchableOpacity>

        {/* ABOUT APP */}
        <TouchableOpacity
          style={[Styles.card, { backgroundColor: theme.card }]}
          onPress={() => navigation.navigate("AboutScreen")}
        >
          <Text style={{ color: theme.text }}>About App</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}
