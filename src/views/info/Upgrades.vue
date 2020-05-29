<template>
    <div class="upgrades">
        <div class="unlock-plant" :class="{'hide': !model}">
            <Icon class="btn-close" size="50" color="#fff" type="close-circled" @click.native="closeModel"></Icon>
            <div class="content">
                <div class="item" v-for="plant in plants" :key="plant.name">
                    <div class="image" @click="unlockPlant(plant)">
                        <PlantImage :src="plant.image" v-show="plant"></PlantImage>
                        <Icon type="locked" :size="70" v-show="plant.state === 1"></Icon>
                        <Icon type="help" :size="70" v-show="plant.state === 2"></Icon>
                    </div>
                    <div class="info">
                        <p>植物：{{plant.name}}</p>
                        <p>成本：{{plant.cost | money}}</p>
                        <p>收益：{{plant.profit | money}}</p>
                        <p>速度: {{plant.speed / 1000}}秒</p>
                        <p>解锁：{{plant.unlockPrice | money}}</p>
                    </div>
                    <div class="ctrl">
                        <Button @click="addProfit(plant)" class="btn-profit" type="success">+ 收益</Button>
                        <Button @click="addSpeed(plant)" class="btn-speed" type="info">+ 速度 </Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import audio from '@/audio';
    import bus from '@/bus';

    export default {
        data() {
            return {
                model: false
            }
        },
        created() {
            bus.$on('menuSelect', (name) => {
                if (name === 'unlock') {
                    this.openModel();
                } else if (name === 'addPot') {
                    this.onAddPlantPot();
                }
            })
        },
        methods: {
            onAddPlantPot() {
                if (this.user.money - this.potsPrice >= 0) {
                    this.$store.commit('addPlantPot');
                    audio.playSe('pot', this.seVolume / 100);
                } else {
                    audio.playSe('cant', this.seVolume / 100);
                }
            },
            unlockPlant(plant) {
                if (plant.state === 1) {
                    if (this.user.money - plant.unlockPrice >= 0) {
                        this.$Message.success('解锁成功');
                        this.$store.commit('unlockPlant', plant);
                        audio.playSe('break', this.seVolume / 100);
                    } else {
                        this.$Message.warning('请先赚够钱吧！(*^▽^*)');
                    }
                } else if (plant.state === 2) {
                    this.$Message.warning('植物尚未开放');
                } else if (plant.state === 0) {
                    this.$Message.warning('你已经解锁了');
                }
            },
            openModel() {
                this.model = true;
            },
            closeModel() {
                this.model = false;
            },
            addProfit(plant) {
                if (plant.state !== 0) {
                    this.$Message.warning('未解锁(#`O′)');
                    return;
                }
                let price = plant.profit * 10;
                let profit = plant.profit * 1.01;
                if (this.user.money - price < 0) {
                    this.$Message.warning('钱不够');
                    return;
                }
                this.$store.commit('setPlantProfit', {
                    id: plant.id,
                    profit,
                    price
                })
            },
            addSpeed(plant) {
                if (plant.state !== 0) {
                    this.$Message.warning('未解锁(#`O′)');
                    return;
                }
                if (plant.speed <= 500) {
                    this.$Message.warning('速度已经是极限了');
                    return;
                } 
                let price = plant.profit * 10;
                let speed = plant.speed - 100;
                if (this.user.money - price < 0) {
                    this.$Message.warning('钱不够');
                    return;
                }
                this.$store.commit('setPlantSpeed', {
                    id: plant.id,
                    speed,
                    price
                })
            }
        },
        computed: mapState(['plantPotSize', 'plants', 'user', 'potsPrice', 'seVolume'])
    }
</script>

