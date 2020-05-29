import Vue from "vue";

export default new Vue({
  data() {
    return {
      se: [{
        name: 'grow',
        src: '/static/audio/grow.wav',
      }, {
        name: 'break',
        src: '/static/audio/break.ogg',
      }, {
        name: 'cant',
        src: '/static/audio/cant.ogg',
      }, {
        name: 'coin',
        src: '/static/audio/coin.ogg',
      }, {
        name: 'pot',
        src: '/static/audio/pot.wav',
      }],
      bgm: [{
        name: 'town',
        src: '/static/audio/town.ogg'
      }],
      bgs: [{
        name: 'rain',
        src: '/static/audio/rain.wav'
      }, {
        name: 'wind',
        src: '/static/audio/wind.ogg'
      }]
    }
  },
  created() {
    this.initSound(this.se);
    this.initSound(this.bgm);
    this.initSound(this.bgs);
  },
  methods: {
    initSound(sound) {
      sound.forEach(obj => {
        obj.$el = new Audio(obj.src);
      });
    },
    playSe(name, volume = 0.1) {
      if (volume === 0) return;
      this.se.forEach(obj => {
        if (obj.name === name) {
          obj.$el.currentTime = 0;
          obj.$el.oncanplaythrough = () => {
            obj.$el.play();
          }
          obj.$el.volume = volume;
        }
      })
    },
    playBgm(name, volume = 0.1) {
      if (volume === 0) return;
      this.bgm.forEach(obj => {
        if (obj.name === name) {
          obj.$el.loop = true;
          obj.$el.volume = volume;
          obj.$el.oncanplaythrough = () => {
            obj.$el.play();
          }
        }
      })
    },
    setBgmVolume(name, volume) {
      this.bgm.forEach(obj => {
        if (obj.name === name) {
          obj.$el.volume = volume;
        }
      })
    },
    setBgsVolume(volume) {
      this.bgs.forEach(obj => {
        obj.$el.volume = volume;
      })
    },
    playBgs(name, volume = 0.1) {
      if (volume === 0) return;
      this.bgs.forEach(obj => {
        if (obj.name === name) {
          obj.$el.volume = volume;
          if (obj.name === 'wind') {
            // 风
            obj.$el.loop = true;
          } else {
            // 雨
            obj.loop = true;
            obj.$el.addEventListener('timeupdate', (e) => {
              let target = e.currentTarget;
              if (target.currentTime > target.duration - 4 && obj.loop && obj.name !== 'wind') {
                target.currentTime = 4;
              }
            });
          }
          obj.$el.play();
        }
      })
    },
    pauseBgs(name) {
      this.bgs.forEach(obj => {
        if (name === name) {
          if (obj.name === 'wind') {
            obj.$el.loop = false;
          } else if (obj.loop) {
            obj.loop = false;
            let target = obj.$el;
            target.currentTime = target.duration - 4 || 0;
          }
        }
      });
    }
  }
});