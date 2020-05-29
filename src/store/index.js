import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import plantsState from './state/plantsState';
import achievementState from './state/achievementState';

import audioMutatuins from './mutations/audioMutations';
import plantsMutatuins from './mutations/plantsMutations';
import achievementMutations from './mutations/achievementMutations';


export default new Vuex.Store({
  state: {
    // 季节
    season: '',
    // 用户
    user: {
      name: 'view',
      money: 1000
    },
    // 花盆列表
    pots: [{
      type: 'normal'
    }],
    // 土地价格
    potsPrice: 1,
    // 植物列表
    plants: plantsState,
    // 奖杯列表
    achievement: achievementState,
    // 土地大小
    plantPotSize: 70,
    bgm: 'town',
    // 音效 SE
    seVolume: 30,
    bgmVolume: 50,
    bgsVolume: 30,
    // 当前选中植物
    currPlant: {},
    effects: 2
  },
  mutations: {
    // 设置用户名
    setUsername(state, name = "农场天才") {
      state.user.name = name;
    },
    // 扣去金额
    costMoney(state, cost = 0) {
      if (state.user.money - cost >= 0) {
        state.user.money -= cost;
      }
    },
    // 加钱
    profitMoney(state, profit = 0) {
      state.user.money += profit;
    },
    unlockAchievement(plant) {

    },
    // 解锁植物
    unlockPlant(state, payload) {
      state.plants.forEach(obj => {
        if (obj.name === payload.name) {
          // 扣钱
          this.commit('costMoney', payload.unlockPrice);
          obj.state = 0;
        }
      });
    },
    // 设置季节
    setSeason(state, payload) {
      if (!payload) return;
      state.season = payload;
    },
    // 切换下一个季节
    nextSeason(state) {
      let seasonList = ['spring', 'summer', 'autumn', 'winter'];
      let index = seasonList.indexOf(state.season);
      index++;
      if (index === 4) index = 0;
      state.season = seasonList[index];
    },
    // 设置画质
    setEffects(state, payload) {
      state.effects = payload;
    },
    ...audioMutatuins,
    ...plantsMutatuins,
    ...achievementMutations,
    // 存档
    save(state) {
      let achievement = state.achievement.map(obj => {
        return {
          id: obj.id,
          count: obj.complatePlantCurrCount,
          complate: obj.complate
        }
      });
      let plants = state.plants.filter(obj => obj.state !== 2).map(obj => {
        return {
          id: obj.id,
          speed: obj.speed,
          cost: obj.cost,
          profit: obj.profit,
          state: obj.state,
          totalGrown: obj.totalGrown
        }
      });
      let pots = state.pots.map(obj => {
        return {
          type: obj.type
        }
      });
      let user = JSON.parse(JSON.stringify(state.user));
      let data = {
        user,
        plants,
        achievement,
        pots,
        season: state.season,
        plantPotSize: state.plantPotSize,
        seVolume: state.seVolume,
        bgmVolume: state.bgmVolume,
        bgsVolume: state.bgsVolume,
        potsPrice: state.potsPrice,
        currPlantId: state.currPlant.id,
        effects: state.effects
      };
      localStorage.setItem('farmData2', JSON.stringify(data));
    },
    // 读档
    load(state) {
      let data = JSON.parse(localStorage.getItem('farmData2'));
      if (!data) return;
      state.plants.filter(obj => obj.state !== 2).forEach(objPlant => {
        data.plants.forEach(newPlant => {
          if (objPlant.id === newPlant.id) {
            objPlant.speed = newPlant.speed;
            objPlant.cost = newPlant.cost;
            objPlant.profit = newPlant.profit;
            objPlant.state = newPlant.state;
            objPlant.totalGrown = newPlant.totalGrown;
          }
        })
      });
      state.achievement.forEach(oldAchievement => {
        data.achievement.forEach(newAchievement => {
          if (oldAchievement.id === newAchievement.id) {
            oldAchievement.complatePlantCurrCount = newAchievement.count;
            oldAchievement.complate = newAchievement.complate;
          }
        });
      });
      state.pots = data.pots;
      state.season = data.season;
      state.plantPotSize = data.plantPotSize;
      state.seVolume = data.seVolume;
      state.bgmVolume = data.bgmVolume;
      state.bgsVolume = data.bgsVolume;
      state.potsPrice = data.potsPrice;
      state.user = data.user;
      state.effects = data.effects;
    }
  },
  getters: {
    seasonCName(state, getters) {
      let season = state.season;
      let seasonMap = {
        'spring': '春天',
        'summer': '夏天',
        'autumn': '秋天',
        'winter': '冬天'
      }
      return seasonMap[season];
    }
  }
})