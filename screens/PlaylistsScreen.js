import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity, FlatList, TextInput, Alert, ScrollView, Image } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Styles } from "../src/Styles";
import Storage from "../services/storage";
import { PlaybackContext } from "../services/playbackContext";

export default function PlaylistsScreen({ navigation }) {
  const [playlists, setPlaylists] = useState([]);
  const [newName, setNewName] = useState("");
  const { playTrack } = useContext(PlaybackContext);

  useFocusEffect(
    React.useCallback(() => {
      loadPlaylists();
    }, [])
  );

  async function loadPlaylists() {
    const data = await Storage.getPlaylists();
    setPlaylists(data || []);
  }

  function handlePlay(track) {
    try {
      playTrack(track);
      navigation.navigate("Player", { track });
    } catch (err) {
      console.log("Error in handlePlay:", err);
    }
  }

  async function createPlaylist() {
    if (!newName.trim()) return Alert.alert("Playlist name is required");

    const playlist = {
      id: Date.now().toString(),
      name: newName.trim(),
      tracks: [],
    };

    await Storage.savePlaylist(playlist);
    setNewName("");
    loadPlaylists();
  }

  async function handleReset() {
    const success = await Storage.clearAllPlaylists();
    if (success) {
      setPlaylists([]);
      Alert.alert("All playlists deleted successfully.");
    } else {
      Alert.alert("Error clearing playlists. Try again.");
    }
  }

  return (
    <View style={Styles.body}>
      {/* HEADER */}
      <View style={Styles.header}>
        <Text style={Styles.headerText}>Playlists</Text>
      </View>

      {/* RESET BUTTON */}
      <TouchableOpacity
        onPress={handleReset}
        style={{
          backgroundColor: "red",
          padding: 14,
          borderRadius: 10,
          marginTop: 20,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontWeight: "700" }}>Reset All Playlists</Text>
      </TouchableOpacity>

      <ScrollView style={Styles.container}>
        {/* CREATE PLAYLIST */}
        <TextInput
          placeholder="New playlist name…"
          style={Styles.input}
          value={newName}
          onChangeText={setNewName}
        />

        <TouchableOpacity style={Styles.button} onPress={createPlaylist}>
          <Text style={Styles.buttonText}>Create Playlist</Text>
        </TouchableOpacity>

        {/* PLAYLIST LIST */}
        <FlatList
          data={playlists}
          keyExtractor={(item, index) => String(index)}
          renderItem={({ item }) => (
            <View style={{ marginTop: 12 }}>
              <View style={Styles.card}>
                <Text style={Styles.cardTitle}>
                  {item.name} ({item.tracks ? item.tracks.length : 0})
                </Text>

                {item.tracks && item.tracks.length > 0 && (
                  <>
                    <Text style={{ marginTop: 12, fontWeight: "700" }}>Tracks:</Text>

                    {item.tracks.map((t, i) => (
                      <TouchableOpacity
                        key={t.id + i}
                        onPress={() => handlePlay(t)}
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          paddingVertical: 8,
                        }}
                      >
                        {/* Artwork Image */}
                        <Image
                          source={ {uri: t.artwork || "https://via.placeholder.com/100?text=No+Art" }}
                          style={{
                            width: 50,
                            height: 50,
                            borderRadius: 8,
                            marginRight: 12,
                          }}
                        />

                        {/* Track Title + Artist */}
                        <View>
                          <Text style={{ fontWeight: "600" }}>{t.title}</Text>
                          <Text style={Styles.smallText}>{t.artist}</Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </>
                )}
              </View>
            </View>
          )}
        />
      </ScrollView>
    </View>
  );
}
