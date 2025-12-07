import AsyncStorage from '@react-native-async-storage/async-storage';
const PLAYLISTS_KEY = '@rhythmflow_playlists_v1';

export default {
  async getPlaylists(){
    try{
      const raw = await AsyncStorage.getItem(PLAYLISTS_KEY);
      return raw ? JSON.parse(raw) : [];
    }catch(e){
      console.error('getPlaylists error', e);
      return [];
    }
  },

  async savePlaylist(playlist){
    try{
      const list = await this.getPlaylists();
      list.push(playlist);
      await AsyncStorage.setItem(PLAYLISTS_KEY, JSON.stringify(list));
    }catch(e){
      console.error('savePlaylist error', e);
    }
  },

  async replacePlaylists(newList){
    try{
      await AsyncStorage.setItem(PLAYLISTS_KEY, JSON.stringify(newList));
    }catch(e){
      console.error('replacePlaylists error', e);
    }
  },

  async replacePlaylist(name, newPlaylist){
    try{
      const list = await this.getPlaylists();
      const idx = list.findIndex(l=>l.name===name);
      if(idx>-1){
        list[idx]=newPlaylist;
        await AsyncStorage.setItem(PLAYLISTS_KEY, JSON.stringify(list));
      }
    }catch(e){
      console.error('replacePlaylist error', e);
    }
  }
};
