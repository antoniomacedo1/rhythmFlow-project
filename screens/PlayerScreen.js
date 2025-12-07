import { useContext } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Styles } from '../src/Styles';
import { PlaybackContext } from '../services/playbackContext';

export default function PlayerScreen() {
  const { currentTrack, isPlaying, togglePlayPause, next, previous } = useContext(PlaybackContext);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F5F8F6" }}>
      <ScrollView 
        contentContainerStyle={{ padding: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={Styles.body}>
          <View style={Styles.header}><Text style={Styles.headerText}>Now Playing</Text></View>

          <View style={Styles.container}>
            {currentTrack ? (
              <>
                <Image source={{uri: currentTrack.artwork || 'https://via.placeholder.com/640x360.png?text=Track'}} style={Styles.trackImage} />
                <View style={Styles.card}>
                  <Text style={Styles.cardTitle}>{currentTrack.title}</Text>
                  <Text style={Styles.cardSub}>{currentTrack.artist}</Text>
                </View>

                <View style={{flexDirection:'row', justifyContent:'center', gap:20, marginTop:20, marginBottom:20}}>
                  <TouchableOpacity style={Styles.iconButton} onPress={previous}><Text style={{color:'#fff'}}>⏮</Text></TouchableOpacity>
                  <TouchableOpacity style={Styles.iconButton} onPress={togglePlayPause}><Text style={{color:'#fff'}}>{isPlaying ? '⏸' : '▶'}</Text></TouchableOpacity>
                  <TouchableOpacity style={Styles.iconButton} onPress={next}><Text style={{color:'#fff'}}>⏭</Text></TouchableOpacity>
                </View>
              </>
            ) : (
              <View style={Styles.card}><Text style={Styles.cardTitle}>No track selected</Text></View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
