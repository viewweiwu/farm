let audio = {
  // 设置音效音量
  setSeVolume(state, volume = 10) {
    if (volume < 0) volume = 0;
    if (volume > 100) volume = 100;
    state.seVolume = volume;
  },
  // 设置 bgm 音量
  setBgmVolume(state, volume = 10) {
    if (volume < 0) volume = 0;
    if (volume > 100) volume = 100;
    state.bgmVolume = volume;
  },
  // 设置 bgs 音量
  setBgsVolume(state, volume = 10) {
    if (volume < 0) volume = 0;
    if (volume > 100) volume = 100;
    state.bgsVolume = volume;
  }
}

export default audio;