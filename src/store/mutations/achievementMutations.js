let achievement = {
  checkAchievemnt(state, id) {
    // 寻找目标一致且未完成的成就
    let targetList = state.achievement.filter(obj => obj.complatePlantId === id && !obj.complate);
    // 寻找目标植物
    let targetPlant = state.plants.find(obj => obj.id === id);
    // 执行目标植物的奖励方式
    targetList.forEach(obj => {
      if (obj.complateMethod === 'grows' && obj.complatePlantCurrCount <= obj.complatePlantNeedCount) {
        obj.complatePlantCurrCount += 1;
        if (obj.complatePlantCurrCount >= obj.complatePlantNeedCount) {
          obj.complate = true;
          if (typeof obj.onComplate === 'function') {
            obj.onComplate(state, obj, targetPlant);
          }
        }
      }
    })
  }
}

export default achievement;