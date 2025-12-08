import { Modal, View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";

export default function PlaylistModal({ visible, playlists, onSelect, onClose }) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
    >
      <View style={styles.overlay}>
        <View style={styles.modalBox}>

          <Text style={styles.title}>Select Playlist</Text>

          <FlatList
            data={playlists}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.playlistItem}
                onPress={() => onSelect(item.id)}
              >
                <Text style={styles.playlistName}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 15,
  },
  playlistItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  playlistName: {
    fontSize: 16,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#333",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  closeText: {
    color: "#fff",
    fontWeight: "700",
  },
});
