import { useEffect, useState, useContext } from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput, Alert } from 'react-native';
import { Styles } from '../src/Styles';
import Storage from '../services/storage';
import { PlaybackContext } from '../services/playbackContext';

export default function PlaylistsScreen() {
  const [playlists, setPlaylists] = useState([]);
  const [newName, setNewName] = useState('');
  const { playTrack } = useContext(PlaybackContext);

  useEffect(()=>{ load(); }, []);

  async function load(){
    const p = await Storage.getPlaylists();
    setPlaylists(p || []);
  }

  async function createPlaylist(){
    if(!newName.trim()) return Alert.alert('Name required');
    const list = { name: newName.trim(), tracks: [] };
    await Storage.savePlaylist(list);
    setNewName('');
    load();
  }

  async function addSampleToPlaylist(pl){
    const sample = { id:'t1', title:'SoundHelix Song 1', artist:'SoundHelix', uri:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' };
    pl.tracks = pl.tracks || [];
    pl.tracks.push(sample);
    await Storage.replacePlaylist(pl.name, pl);
    load();
    Alert.alert('Added sample to ' + pl.name);
  }

  async function playFromPlaylist(pl, idx){
    const t = pl.tracks && pl.tracks[idx];
    if(t) playTrack(t);
  }

  return (
    <View style={Styles.body}>
      <View style={Styles.header}><Text style={Styles.headerText}>Playlists</Text></View>
      <View style={Styles.container}>
        <TextInput placeholder="New playlist name…" style={Styles.input} value={newName} onChangeText={setNewName} />
        <TouchableOpacity style={Styles.button} onPress={createPlaylist}><Text style={Styles.buttonText}>Create Playlist</Text></TouchableOpacity>

        <FlatList
          data={playlists}
          keyExtractor={(item,idx)=>String(idx)}
          renderItem={({item})=>(
            <View style={{marginTop:12}}>
              <View style={Styles.card}>
                <Text style={Styles.cardTitle}>{item.name} ({item.tracks?item.tracks.length:0})</Text>
                <TouchableOpacity onPress={()=>addSampleToPlaylist(item)}><Text style={{color:'#2EA865', marginTop:8}}>Add sample track</Text></TouchableOpacity>
                {item.tracks && item.tracks.length>0 && (
                  <>
                    <Text style={{marginTop:12, fontWeight:'700'}}>Tracks:</Text>
                    {item.tracks.map((t,i)=>(
                      <TouchableOpacity key={t.id+i} onPress={()=>playFromPlaylist(item,i)} style={{paddingVertical:6}}>
                        <Text>{t.title} — <Text style={Styles.smallText}>{t.artist}</Text></Text>
                      </TouchableOpacity>
                    ))}
                  </>
                )}
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
}
