import { useContext } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView, SafeAreaView } from "react-native";
import { PlaybackContext } from "../services/playbackContext";
import { Styles } from "../src/Styles";

export default function PlayerScreen({ navigation }) {
  const { currentTrack, isPlaying, togglePlayPause, next, previous } =
    useContext(PlaybackContext);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F5F8F6" }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View style={Styles.body}>
          
          {/* Header */}
          <View style={Styles.header}>
            <Text style={Styles.headerText}>Now Playing</Text>
          </View>

          {/* Back Button */}
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ padding: 20 }}
          >
            <Text style={{ fontSize: 16 }}>← Back to Library</Text>
          </TouchableOpacity>

          <View style={Styles.container}>
            {currentTrack ? (
              <>
                {/* ARTWORK IMAGE */}
                <Image
                  source={{
                    uri:
                      currentTrack.artwork ||
                      "https://via.placeholder.com/600x400?text=No+Artwork",
                  }}
                  style={Styles.trackImage}
                />

                {/* TRACK INFO CARD */}
                <View style={Styles.card}>
                  <Text style={Styles.cardTitle}>{currentTrack.title}</Text>
                  <Text style={Styles.cardSub}>{currentTrack.artist}</Text>
                </View>

                {/* CONTROLS */}
                <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 25 }}>
                  <TouchableOpacity onPress={previous} style={Styles.iconButton}>
                    <Text style={{ color: "#fff", fontSize: 22 }}>⏮</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={togglePlayPause} style={Styles.iconButton}>
                    <Text style={{ color: "#fff", fontSize: 22 }}>
                      {isPlaying ? "⏸" : "▶"}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={next} style={Styles.iconButton}>
                    <Text style={{ color: "#fff", fontSize: 22 }}>⏭</Text>
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
