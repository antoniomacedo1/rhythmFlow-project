import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';

const PLAYLISTS_KEY = '@rhythmflow_playlists_v2';

export default {
  async getPlaylists() {
    try {
      const raw = await AsyncStorage.getItem(PLAYLISTS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.log("getPlaylists error:", e);
      return [];
    }
  },

  async savePlaylist(playlist) {
    try {
      const list = await this.getPlaylists();
      playlist.id = uuidv4();
      list.push(playlist);
      await AsyncStorage.setItem(PLAYLISTS_KEY, JSON.stringify(list));
    } catch (e) {
      console.log("savePlaylist error:", e);
    }
  },

  async replacePlaylists(newList) {
    try {
      await AsyncStorage.setItem(PLAYLISTS_KEY, JSON.stringify(newList));
    } catch (e) {
      console.log("replacePlaylists error:", e);
    }
  },

  async updatePlaylist(playlistId, updatedPlaylist) {
    try {
      const list = await this.getPlaylists();
      const updated = list.map(pl => pl.id === playlistId ? updatedPlaylist : pl);
      await AsyncStorage.setItem(PLAYLISTS_KEY, JSON.stringify(updated));
    } catch (e) {
      console.log("updatePlaylist error:", e);
    }
  },

  async clearAllPlaylists() {
    try {
      await AsyncStorage.removeItem(PLAYLISTS_KEY);
      return true;
    } catch (e) {
      console.log("clearAllPlaylists error:", e);
      return false;
    }
  }
};
