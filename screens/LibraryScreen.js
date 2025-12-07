import { useEffect, useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { Styles } from '../src/Styles';
import { PlaybackContext } from '../services/playbackContext';
import Storage from '../services/storage';

const MOCK_TRACKS = [
  { id: 't1', title: 'SoundHelix Song 1', artist: 'SoundHelix', uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 't2', title: 'SoundHelix Song 2', artist: 'SoundHelix', uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
  { id: 't3', title: 'SoundHelix Song 3', artist: 'SoundHelix', uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
  { id: 't4', title: 'Sample Track 4', artist: 'Demo', uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
  { id: 't5', title: 'Sample Track 5', artist: 'Demo', uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' }
];

export default function LibraryScreen({ navigation }) {
  const { playTrack } = useContext(PlaybackContext);
  const [tracks, setTracks] = useState([]);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    setTracks(MOCK_TRACKS);
    (async () => {
      const p = await Storage.getPlaylists();
      setPlaylists(p || []);
    })();
  }, []);

  function handlePlay(item) {
    playTrack(item);
    navigation.navigate('Player');
  }

  async function handleAddToPlaylist(track) {
    let p = await Storage.getPlaylists();
    if (!p || p.length === 0) {
      const newList = { name: 'Favorites', tracks: [track] };
      await Storage.savePlaylist(newList);
      p = await Storage.getPlaylists();
      setPlaylists(p);
      alert('Created playlist Favorites and added track');
      return;
    }
    p[0].tracks = p[0].tracks || [];
    p[0].tracks.push(track);
    await Storage.replacePlaylists(p);
    setPlaylists(p);
    alert('Added to playlist: ' + p[0].name);
  }

  return (
    
        <View style={Styles.body}>
          <View style={Styles.header}><Text style={Styles.headerText}>Library</Text></View>
          <View style={Styles.container}>
            <TextInput placeholder="Search your music…" style={Styles.input} />
            <FlatList
              data={tracks}
              keyExtractor={item => item.id}
              renderItem={({item})=>(
                <TouchableOpacity style={Styles.listItem} onPress={()=>handlePlay(item)}>
                  <Text style={{fontWeight:'700'}}>{item.title}</Text>
                  <Text style={Styles.smallText}>{item.artist}</Text>
                  <TouchableOpacity onPress={()=>handleAddToPlaylist(item)}>
                    <Text style={{color:'#2EA865', marginTop:8}}>Add to playlist</Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
  );
}
