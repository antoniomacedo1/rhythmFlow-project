import { useContext } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView, SafeAreaView } from "react-native";
import { PlaybackContext } from "../services/playbackContext";
import { Styles } from "../src/Styles";

export default function PlayerScreen({ navigation }) {
  const { currentTrack, isPlaying, togglePlayPause, next, previous } = useContext(PlaybackContext);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F5F8F6" }}>
      <ScrollView contentContainerStyle={{ padding: 20 }} showsVerticalScrollIndicator={false}>
        <View style={Styles.body}>
          <View style={Styles.header}>
            <Text style={Styles.headerText}>Now Playing</Text>
          </View>

          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ marginTop: 10, marginBottom: 20 }}
          >
            <Text style={{ fontSize: 16 }}>Back</Text>
          </TouchableOpacity>

          <View style={Styles.container}>
            {currentTrack ? (
              <>
                <Image
                  source={{ uri: currentTrack.artwork || "https://via.placeholder.com/640x360.png?text=Track" }}
                  style={Styles.trackImage}
                />

                <View style={Styles.card}>
                  <Text style={Styles.cardTitle}>{currentTrack.title}</Text>
                  <Text style={Styles.cardSub}>{currentTrack.artist}</Text>
                </View>

                <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 20 }}>
                  <TouchableOpacity onPress={previous} style={Styles.iconButton}>
                    <Text style={{ color: "#fff" }}>⏮</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={togglePlayPause} style={Styles.iconButton}>
                    <Text style={{ color: "#fff" }}>{isPlaying ? "⏸" : "▶"}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={next} style={Styles.iconButton}>
                    <Text style={{ color: "#fff" }}>⏭</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <View style={Styles.card}>
                <Text style={Styles.cardTitle}>No track selected</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
