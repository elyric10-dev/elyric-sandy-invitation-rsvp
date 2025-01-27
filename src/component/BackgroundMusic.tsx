import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { SoundOutlined, AudioMutedOutlined } from "@ant-design/icons";

const BackgroundMusic = ({ audioSource, onPlay }: any) => {
  const [audio] = useState(new Audio(audioSource));
  const [playing, setPlaying] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Set audio to loop
    audio.loop = true;

    // Some browsers block autoplay, so we need user interaction
    audio.volume = 0.3;

    // Cleanup on unmount
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [audio]);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing, audio]);

  const togglePlaying = () => {
    setPlaying(!playing);
    setIndex(index + 1);
  };

  return { togglePlaying, playing, index };
};

export default BackgroundMusic;
