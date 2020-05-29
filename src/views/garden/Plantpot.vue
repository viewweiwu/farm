<template>
    <div class="plantpot" @mouseenter="onPlantpotMouseDown" ref="paper" :style="{width: plantPotSize + 'px', height: plantPotSize + 'px', margin: (plantPotSize / 10) + 'px'}">
        <div v-show="value > 0">
            <ProgressBar :value="value"></ProgressBar>
            <PlantImage :src="pot.plant.image" v-if="pot.plant && effects > 0"></PlantImage>
            <span v-if="pot.plant && effects <= 0">{{pot.plant.name}}</span>
        </div>
    </div>
</template>

<script>
    import { formatMoney } from "@/util";
    import audio from '@/audio';
    import ProgressBar from "@/components/Progress";
    import { mapState } from 'vuex';

    export default {
        components: {
            ProgressBar
        },
        props: {
            pot: Object
        },
        data() {
            return {
                inGrowUp: false,
                value: 0
            }
        },
        methods: {
            // 种植植物
            onPlantpotMouseDown() {
                if (this.pot.plant) return;
                if (this.user.money - this.currPlant.cost >= 0) {
                    this.$store.commit('setPlant', this.pot);
                } else {
                    return;
                }
                if (this.inGrowUp && this.timer || this.value >= 100) return;
                let plant = this.pot.plant;
                this.inGrowUp = true; // 是否种植完成
                // 计算种植速度
                let speed = plant.speed;
                if (plant.grows === this.season) {
                    speed /= 3;
                }
                // 播放种植音效
                audio.playSe('grow', this.seVolume / 100);
                // 限制最低种植速度
                if (speed < .5) speed = .5;
                // 设置进度条
                this.value = 0;

                let delay = 2;
                if (this.effects === 1) {
                    delay = 5;
                } else if (this.effects === 2) {
                    delay = 20;
                } else if (this.effects === 3) {
                    delay = 100;
                }
                this.timer = setInterval(() => {
                    this.value += 100 / delay;
                    // 进度条走完，开始收获
                    if(this.value >= 100) {
                        // 清空定时器
                        clearInterval(this.timer);
                        this.inGrowUp = false;
                        // 弹出金钱
                        this.popMoney(plant.profit);
                        // 收获植物
                        this.$store.commit('getPlant', this.pot);
                        // 清空进度条
                        this.value = 0;
                        // 发布完成事件
                        this.$emit('done', this.pot);
                    }
                }, speed / delay);
            },
            // 弹出金钱
            popMoney(money) {
                let popDom = document.createElement('div');
                popDom.classList.add('pop-money');
                if (this.effects > 0) {
                     popDom.classList.add('effects');
                }
                popDom.innerHTML = `${formatMoney(money)}`;
                this.$refs.paper.appendChild(popDom);
                setTimeout(() => {
                    popDom.remove();
                }, 500)
            }
        },
        computed: mapState(['plantPotSize', 'season', 'seVolume', 'user', 'currPlant', 'effects'])
    }
</script>

