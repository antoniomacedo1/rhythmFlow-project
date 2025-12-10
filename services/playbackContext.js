import React, { createContext, useState, useEffect } from "react";
import { Audio } from "expo-av";

export const PlaybackContext = createContext();

export function PlaybackProvider({ children }) {
  const [soundObj, setSoundObj] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [queue, setQueue] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    return () => {
      if (soundObj) soundObj.unloadAsync();
    };
  }, [soundObj]);

  async function playTrack(track) {
    try {
      if (soundObj) {
        await soundObj.unloadAsync();
      }

      const { sound } = await Audio.Sound.createAsync(
        { uri: track.uri },
        { shouldPlay: true }
      );

      setSoundObj(sound);
      setCurrentTrack(track);
      setIsPlaying(true);

      setQueue((q) => [...q, track]);
      setIndex(queue.length);
    } catch (err) {
      console.log("Play error:", err);
    }
  }

  async function togglePlayPause() {
    if (!soundObj) return;

    const status = await soundObj.getStatusAsync();

    if (status.isPlaying) {
      await soundObj.pauseAsync();
      setIsPlaying(false);
    } else {
      await soundObj.playAsync();
      setIsPlaying(true);
    }
  }

  async function next() {
    if (queue.length === 0) return;

    const nextIndex = (index + 1) % queue.length;
    const track = queue[nextIndex];

    setIndex(nextIndex);
    playTrack(track);
  }

  async function previous() {
    if (queue.length === 0) return;

    const prevIndex = (index - 1 + queue.length) % queue.length;
    const track = queue[prevIndex];

    setIndex(prevIndex);
    playTrack(track);
  }

  return (
    <PlaybackContext.Provider
      value={{
        playTrack,
        togglePlayPause,
        next,
        previous,
        currentTrack,
        isPlaying
      }}
    >
      {children}
    </PlaybackContext.Provider>
  );
}
