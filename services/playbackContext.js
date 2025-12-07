import React, { createContext, useState, useEffect } from 'react';
import { Audio } from 'expo-av';

export const PlaybackContext = createContext();

export function PlaybackProvider({ children }) {
  const [soundObj, setSoundObj] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [queue, setQueue] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(()=>{
    return ()=>{ if(soundObj) soundObj.unloadAsync(); };
  }, [soundObj]);

  async function playTrack(track){
    try{
      if(soundObj){
        await soundObj.unloadAsync();
      }
      const { sound } = await Audio.Sound.createAsync(
        { uri: track.uri },
        { shouldPlay: true }
      );
      setSoundObj(sound);
      setCurrentTrack(track);
      setIsPlaying(true);
    }catch(e){
      console.error('play error', e);
    }
  }

  async function togglePlayPause(){
    if(!soundObj) return;
    const status = await soundObj.getStatusAsync();
    if(status.isPlaying){
      await soundObj.pauseAsync();
      setIsPlaying(false);
    }else{
      await soundObj.playAsync();
      setIsPlaying(true);
    }
  }

  async function next(){
    if(queue.length===0) return;
    const nextIndex = (index + 1) % queue.length;
    setIndex(nextIndex);
    const t = queue[nextIndex];
    if(t) await playTrack(t);
  }

  async function previous(){
    if(queue.length===0) return;
    const prevIndex = (index - 1 + queue.length) % queue.length;
    setIndex(prevIndex);
    const t = queue[prevIndex];
    if(t) await playTrack(t);
  }

  return (
    <PlaybackContext.Provider value={{
      playTrack, togglePlayPause, next, previous,
      currentTrack, isPlaying, queue, setQueue, addToQueue: (t)=>setQueue(q=>[...q,t])
    }}>
      {children}
    </PlaybackContext.Provider>
  );
}
