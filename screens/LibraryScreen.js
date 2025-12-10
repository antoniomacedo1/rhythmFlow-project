import { useState, useContext, useCallback } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Styles } from "../src/Styles";
import { PlaybackContext } from "../services/playbackContext";
import PlaylistModal from "../components/PlaylistModal";
import Storage from "../services/storage";

const MOCK_TRACKS = [
  { id: "t1", title: "SoundHelix Song 1", artist: "SoundHelix", uri: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
  { id: "t2", title: "SoundHelix Song 2", artist: "SoundHelix", uri: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
  { id: "t3", title: "SoundHelix Song 3", artist: "SoundHelix", uri: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
  { id: "t4", title: "Sample Track 4", artist: "Demo", uri: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" },
  { id: "t5", title: "Sample Track 5", artist: "Demo", uri: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" }
];

export default function LibraryScreen({ navigation }) {
  const { playTrack } = useContext(PlaybackContext);
  const [tracks] = useState(MOCK_TRACKS);
  const [playlists, setPlaylists] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);

  const loadPlaylists = useCallback(async () => {
    try {
      const p = await Storage.getPlaylists();
      setPlaylists(p || []);
    } catch (err) {
      console.log("Error loading playlists:", err);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadPlaylists();
    }, [loadPlaylists])
  );

  function handlePlay(track) {
    try {
      playTrack(tracks, track);  
      navigation.navigate("Player", { track });
    } catch (err) {
      console.log("Error playing:", err);
    }
  }

  async function addToPlaylist(playlistId, track) {
    try {
      const p = await Storage.getPlaylists();
      if (!p) return;

      const updated = p.map(pl => {
        if (pl.id === playlistId) {
          return { ...pl, tracks: [...(pl.tracks || []), track] };
        }
        return pl;
      });

      await Storage.replacePlaylists(updated);
      setPlaylists(updated);
    } catch (err) {
      console.log("Error adding to playlist:", err);
    }
  }

  return (
    <View style={Styles.body}>
      <View style={Styles.header}>
        <Text style={Styles.headerText}>Library</Text>
      </View>

      <View style={Styles.container}>
        <TextInput placeholder="Search your music…" style={Styles.input} />

        <FlatList
          data={tracks}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 140 }}
          renderItem={({ item }) => (
            <TouchableOpacity style={Styles.listItem} onPress={() => handlePlay(item)}>
              <Text style={{ fontWeight: "700" }}>{item.title}</Text>
              <Text style={Styles.smallText}>{item.artist}</Text>

              <TouchableOpacity
                onPress={() => {
                  setCurrentTrack(item);
                  setModalVisible(true);
                }}
              >
                <Text style={Styles.trackAction}>Add to playlist</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />

        <PlaylistModal
          visible={modalVisible}
          playlists={playlists}
          onSelect={(playlistId) => {
            addToPlaylist(playlistId, currentTrack);
            setModalVisible(false);
          }}
          onClose={() => setModalVisible(false)}
        />
      </View>
    </View>
  );
}
