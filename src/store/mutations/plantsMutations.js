let plants = {
  // 改变选中植物
  changePlant(state, payload) {
    state.plants.forEach(obj => {
      if (obj.name === payload) {
        state.currPlant = obj;
      }
    });
  },
  // 添加花盆
  addPlantPot(state) {
    if (state.user.money - state.potsPrice >= 0 && state.pots.length < 50) {
      state.pots.push({
        type: 'normal'
      });
      // 扣去价钱
      this.commit('costMoney', state.potsPrice);
      // 涨价
      state.potsPrice *= 1.8;
    }
  },
  // 修改花盆大小
  changePlantPotSize(state, payload) {
    state.plantPotSize = payload || 100;
  },
  // 添加植物
  setPlant(state, payload) {
    payload.plant = state.currPlant;
    // 扣去成本
    this.commit('costMoney', payload.plant.cost);
  },
  // 收获植物
  getPlant(state, payload) {
    state.user.money += payload.plant.profit;
    // 加钱
    this.commit('costMoney', payload.unlockPrice);
    // 设置植物统计
    this.commit('setPlantCountUp', payload.plant.id);
    // 查看奖杯获得情况
    this.commit('checkAchievemnt', payload.plant.id);
    delete payload.plant;
  },
  // +1 统计
  setPlantCountUp(state, id) {
    // 统计
    state.plants.forEach(obj => {
      if (obj.id === id) {
        obj.totalGrown += 1;
      }
    });
  },
  // 设置速度
  setPlantSpeed(state, payload) {
    state.plants.forEach(obj => {
      if (obj.id === payload.id) {
        obj.speed = payload.speed;
      }
    });
    if (state.user.money - payload.price >= 0) {
      state.user.money -= payload.price;
    }
  },
  // 设置收益
  setPlantProfit(state, payload) {
    state.plants.forEach(obj => {
      if (obj.id === payload.id) {
        obj.profit = payload.profit;
      }
    });
    if (state.user.money - payload.price >= 0) {
      state.user.money -= payload.price;
    }
  }
}

export default plants;