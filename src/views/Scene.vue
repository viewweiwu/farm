<template>
  <div>
    <Bg></Bg>
    <Season></Season>
    <PlantPicker></PlantPicker>
    <Garden></Garden>
    <User></User>
    <Upgrades></Upgrades>
    <Menus></Menus>
    <Setting></Setting>
    <Skill></Skill>
    <Achievement></Achievement>
  </div>
</template>

<script>
import Season from "@/views/bg/Season";
import Bg from "@/views/bg/Bg.vue";
import Garden from "@/views/garden/Garden";
import PlantPicker from "@/views/PlantPicker";
import User from "@/views/info/User";
import Upgrades from "@/views/info/Upgrades";
import Menus from "@/views/info/Menus";
import Setting from "@/views/info/Setting";
import Skill from "@/views/info/Skill";
import Achievement from "@/views/info/Achievement";

export default {
  components: {
    Season,
    Garden,
    Bg,
    PlantPicker,
    User,
    Upgrades,
    Menus,
    Setting,
    Skill,
    Achievement
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      // 设置默认植物
      this.$store.commit("changePlant", "小麦");
      this.$store.commit("setSeason", "summer");
      this.$nextTick(() => {
        this.$store.commit("load");
        if (localStorage.getItem("farmData")) {
          this.$store.commit("profitMoney", 100000);
          this.$Notice.info({
            title: "初始加成",
            desc: "感谢你上次玩耍，初始金钱将会 +10万",
            duration: 10
          });
          localStorage.removeItem("farmData");
        }
      });
      this.loopSeason();
    },
    loopSeason() {
      // 切换天气 120s 一次
      this.seasonTimer = setInterval(() => {
        this.$store.commit("nextSeason");
        this.$Notice.info({
          title: this.$store.getters.seasonCName + "开始了！"
        });
      }, 1000 * 60);
      this.saveTimer = setInterval(() => {
        this.$store.commit("save");
        this.$Notice.success({
          title: "自动存档",
          desc: "已经自动存档(≧∇≦)ﾉ"
        });
      }, 1000 * 30);
    }
  }
};
</script>
