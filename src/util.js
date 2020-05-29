const formatMoney = (money) => {
  money = parseFloat(money);
  money = Math.floor(money * 100) / 100;
  if (money < 10000) {
    return money + "元";
  } else {
    let unit = "";
    while (money > 9999) {
      money /= 10000;
      money = Math.floor(money * 100) / 100;
      if (unit.slice(0, 1) !== "万") {
        unit = "万" + unit;
      } else {
        unit = unit.slice(1);
        unit = "亿" + unit;
      }
    }
    return money + unit;
  }
}

export {
  formatMoney
}