import React, { useContext } from "react";
import { View, Text, Image, TouchableOpacity, Share, Linking } from "react-native";
import { ThemeContext } from "../src/ThemeContext";
import { Styles } from "../src/Styles";

export default function AboutScreen({ navigation }) {
  const { theme } = useContext(ThemeContext);

  // Recommend to friends
  const handleRecommend = async () => {
    try {
      await Share.share({
        message:
          "Check out RhythmFlow – an awesome music app! 🎵",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Feedback via email
  const handleFeedback = () => {
    Linking.openURL("mailto:developer@example.com?subject=RhythmFlow Feedback");
  };

  // Navigate to Privacy Screen
  const handlePrivacy = () => {
    navigation.navigate("PrivacyPolicyScreen");
  };

  return (
    <View style={[Styles.body, { backgroundColor: theme.background, padding: 20 }]}>

      {/* Title */}
      <View style={{ alignItems: "center", marginBottom: 30 }}>
        <Text style={{ fontSize: 26, fontWeight: "700", color: theme.text }}>
          About RhythmFlow
        </Text>
      </View>

      {/* App Logo */}
      <View style={{ alignItems: "center", marginBottom: 20 }}>
        <Image
          source={{
            uri: "https://icons.iconarchive.com/icons/dtafalonso/android-lollipop/512/Play-Music-icon.png",
          }}
          style={{ width: 120, height: 120, borderRadius: 16 }}
        />
        <Text style={{ marginTop: 10, fontSize: 15, color: theme.text }}>
          Current Version: 1.0.0
        </Text>
      </View>

      {/* Buttons */}
      <TouchableOpacity style={Styles.listItem} onPress={handleRecommend}>
        <Text style={{ color: theme.text }}>Recommend to Friends</Text>
      </TouchableOpacity>

      <TouchableOpacity style={Styles.listItem} onPress={handleFeedback}>
        <Text style={{ color: theme.text }}>Give Feedback</Text>
      </TouchableOpacity>

      <TouchableOpacity style={Styles.listItem} onPress={handlePrivacy}>
        <Text style={{ color: theme.text }}>Privacy Policy</Text>
      </TouchableOpacity>

    </View>
  );
}
