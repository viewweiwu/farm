import { Notice, Message } from 'iview';

let achievement = [{
  id: 1,
  title: '原来小麦是这样种的',
  desc: '种植 1 棵小麦',
  profit: '小麦收益 +10% ',
  complate: false,
  complatePlantId: 2,
  complatePlantCurrCount: 0,
  complatePlantNeedCount: 1,
  complateMethod: 'grows',
  onComplate(state, achievement, plant) {
    Notice.warning({
      title: '获得成就',
      desc: achievement.title,
      duration: 10
    });
    plant.profit *= 1.1;
  }
}, {
  id: 2,
  title: '种小麦很简单嘛',
  desc: '种植 10 棵小麦',
  profit: '小麦收益 +20% ',
  complate: false,
  complatePlantId: 2,
  complatePlantCurrCount: 0,
  complatePlantNeedCount: 10,
  complateMethod: 'grows',
  onComplate(state, achievement, plant) {
    Notice.warning({
      title: '获得成就',
      desc: achievement.title,
      duration: 10
    });
    plant.profit *= 1.2;
  }
}, {
  id: 3,
  title: '种小麦不过如此',
  desc: '种植 500 棵小麦',
  profit: '小麦收益 +50% ',
  complate: false,
  complatePlantId: 2,
  complatePlantCurrCount: 0,
  complatePlantNeedCount: 500,
  complateMethod: 'grows',
  onComplate(state, achievement, plant) {
    Notice.warning({
      title: '获得成就',
      desc: achievement.title,
      duration: 10
    });
    plant.profit *= 1.3;
  }
}, {
  id: 4,
  title: '我来教你怎么种小麦！',
  desc: '种植 2000 棵小麦',
  profit: '小麦收益 +200% ',
  complate: false,
  complatePlantId: 2,
  complatePlantCurrCount: 0,
  complatePlantNeedCount: 2000,
  complateMethod: 'grows',
  onComplate(state, achievement, plant) {
    Notice.warning({
      title: '获得成就',
      desc: achievement.title,
      duration: 10
    });
    plant.profit *= 2;
  }
}, {
  id: 5,
  title: '这个🍅看起来不错',
  desc: '种植 10 个西红柿',
  profit: '西红柿收益 +10% ',
  complate: false,
  complatePlantId: 1,
  complatePlantCurrCount: 0,
  complatePlantNeedCount: 10,
  complateMethod: 'grows',
  onComplate(state, achievement, plant) {
    Notice.warning({
      title: '获得成就',
      desc: achievement.title,
      duration: 10
    });
    plant.profit *= 1.1;
  }
}, {
  id: 6,
  title: '番茄跟西红柿有区别？',
  desc: '种植 100 个西红柿',
  profit: '西红柿种植时间 -10%',
  complate: false,
  complatePlantId: 1,
  complatePlantCurrCount: 0,
  complatePlantNeedCount: 100,
  complateMethod: 'grows',
  onComplate(state, achievement, plant) {
    Notice.warning({
      title: '获得成就',
      desc: achievement.title,
      duration: 10
    });
    plant.speed *= .9;
  }
}, {
  id: 7,
  title: '我想做番茄酱',
  desc: '种植 1000 个西红柿',
  profit: '西红柿收益 +20% ',
  complate: false,
  complatePlantId: 1,
  complatePlantCurrCount: 0,
  complatePlantNeedCount: 1000,
  complateMethod: 'grows',
  onComplate(state, achievement, plant) {
    Notice.warning({
      title: '获得成就',
      desc: achievement.title,
      duration: 10
    });
    plant.profit *= 1.2;
  }
}, {
  id: 8,
  title: '西红柿超好吃！',
  desc: '种植 5000 个西红柿',
  profit: '金币 +50000',
  complate: false,
  complatePlantId: 1,
  complatePlantCurrCount: 0,
  complatePlantNeedCount: 5000,
  complateMethod: 'grows',
  onComplate(state, achievement, plant) {
    Notice.warning({
      title: '获得成就',
      desc: achievement.title,
      duration: 10
    });
    state.user.money += 50000;
  }
}, {
  id: 9,
  title: '萝卜炖起来很好吃',
  desc: '种植 500 棵萝卜',
  profit: '萝卜收益 +50%',
  complate: false,
  complatePlantId: 1,
  complatePlantCurrCount: 0,
  complatePlantNeedCount: 500,
  complateMethod: 'grows',
  onComplate(state, achievement, plant) {
    Notice.warning({
      title: '获得成就',
      desc: achievement.title,
      duration: 10
    });
    plant.profit *= 1.5;
  }
}, {
  id: 10,
  title: '我觉得我种的不是萝卜，是人参！',
  desc: '种植 5000 棵萝卜',
  profit: '萝卜收益 +150%',
  complate: false,
  complatePlantId: 1,
  complatePlantCurrCount: 0,
  complatePlantNeedCount: 5000,
  complateMethod: 'grows',
  onComplate(state, achievement, plant) {
    Notice.warning({
      title: '获得成就',
      desc: achievement.title,
      duration: 10
    });
    plant.profit *= 2.5;
  }
}, {
  id: 11,
  title: '大白菜大白菜切切切',
  desc: '种植 1 棵大白菜',
  profit: '土地 + 2',
  complate: false,
  complatePlantId: 4,
  complatePlantCurrCount: 0,
  complatePlantNeedCount: 1,
  complateMethod: 'grows',
  onComplate(state, achievement, plant) {
    Notice.warning({
      title: '获得成就',
      desc: achievement.title,
      duration: 10
    });
    state.pots.push({
      type: 'normal'
    });
    state.pots.push({
      type: 'normal'
    });
  }
}, {
  id: 12,
  title: '你们吃的大白菜都是我种的',
  desc: '种植 1000 棵大白菜',
  profit: '大白菜种植时间 -50%',
  complate: false,
  complatePlantId: 4,
  complatePlantCurrCount: 0,
  complatePlantNeedCount: 100,
  complateMethod: 'grows',
  onComplate(state, achievement, plant) {
    Notice.warning({
      title: '获得成就',
      desc: achievement.title,
      duration: 10
    });
    plant.speed *= .5;
  }
}, {
  id: 13,
  title: '大白菜要烂在地了',
  desc: '种植 3000 棵大白菜',
  profit: '金币 +500w',
  complate: false,
  complatePlantId: 4,
  complatePlantCurrCount: 0,
  complatePlantNeedCount: 3000,
  complateMethod: 'grows',
  onComplate(state, achievement, plant) {
    Notice.warning({
      title: '获得成就',
      desc: achievement.title,
      duration: 10
    });
    state.user.money += 5e+6;
  }
}, {
  id: 14,
  title: '土豆土豆泥',
  desc: '种植 100 个土豆',
  profit: '土豆收益 + 10%',
  complate: false,
  complatePlantId: 5,
  complatePlantCurrCount: 0,
  complatePlantNeedCount: 100,
  complateMethod: 'grows',
  onComplate(state, achievement, plant) {
    Notice.warning({
      title: '获得成就',
      desc: achievement.title,
      duration: 10
    });
    plant.profit *= 1.1;
  }
}, {
  id: 15,
  title: '是土豆还是马铃薯',
  desc: '种植 500 个土豆',
  profit: '土豆收益 + 10%',
  complate: false,
  complatePlantId: 5,
  complatePlantCurrCount: 0,
  complatePlantNeedCount: 500,
  complateMethod: 'grows',
  onComplate(state, achievement, plant) {
    Notice.warning({
      title: '获得成就',
      desc: achievement.title,
      duration: 10
    });
    plant.profit *= 1.1;
  }
}, {
  id: 16,
  title: '我家开了土豆场',
  desc: '种植 1500 个土豆',
  profit: '土豆收益 + 100%',
  complate: false,
  complatePlantId: 5,
  complatePlantCurrCount: 0,
  complatePlantNeedCount: 1500,
  complateMethod: 'grows',
  onComplate(state, achievement, plant) {
    Notice.warning({
      title: '获得成就',
      desc: achievement.title,
      duration: 10
    });
    plant.profit *= 2;
  }
}, {
  id: 17,
  title: '豌豆射手',
  desc: '种植 10 个豌豆',
  profit: '金币 + 1000万',
  complate: false,
  complatePlantId: 6,
  complatePlantCurrCount: 0,
  complatePlantNeedCount: 10,
  complateMethod: 'grows',
  onComplate(state, achievement, plant) {
    Notice.warning({
      title: '获得成就',
      desc: achievement.title,
      duration: 10
    });
    state.user.money += 10000000;
  }
}, {
  id: 18,
  title: '豌豆专家',
  desc: '种植 1000 个豌豆',
  profit: '土地 +3',
  complate: false,
  complatePlantId: 6,
  complatePlantCurrCount: 0,
  complatePlantNeedCount: 1000,
  complateMethod: 'grows',
  onComplate(state, achievement, plant) {
    Notice.warning({
      title: '获得成就',
      desc: achievement.title,
      duration: 10
    });
    state.pots.push({
      type: 'normal'
    });
    state.pots.push({
      type: 'normal'
    });
    state.pots.push({
      type: 'normal'
    });
  }
}, {
  id: 19,
  title: '做为武器好像还挺称手的',
  desc: '种植 100 根甘蔗',
  profit: '土地 +1',
  complate: false,
  complatePlantId: 7,
  complatePlantCurrCount: 0,
  complatePlantNeedCount: 100,
  complateMethod: 'grows',
  onComplate(state, achievement, plant) {
    Notice.warning({
      title: '获得成就',
      desc: achievement.title,
      duration: 10
    });
    state.pots.push({
      type: 'normal'
    });
  }
}, {
  id: 20,
  title: '妖怪哪里跑！',
  desc: '种植 500 根甘蔗',
  profit: '甘蔗收益 +50%',
  complate: false,
  complatePlantId: 7,
  complatePlantCurrCount: 0,
  complatePlantNeedCount: 500,
  complateMethod: 'grows',
  onComplate(state, achievement, plant) {
    Notice.warning({
      title: '获得成就',
      desc: achievement.title,
      duration: 10
    });
    plant.profit *= 1.5;
  }
}, {
  id: 21,
  title: '我觉得我能种出定海神针了',
  desc: '种植 2000 根甘蔗',
  profit: '收益 +50% ,并解锁青椒',
  complate: false,
  complatePlantId: 7,
  complatePlantCurrCount: 0,
  complatePlantNeedCount: 2000,
  complateMethod: 'grows',
  onComplate(state, achievement, plant) {
    Notice.warning({
      title: '获得成就',
      desc: achievement.title,
      duration: 10
    });
    plant.profit *= 1.5;
    state.plants.forEach(obj => {
      if (obj.id === 8) {
        obj.state = 0;
      }
    })
  }
}]

export default achievement;