<template>
    <div class="plant-picker">
        <div class="nav">
            <Poptip trigger="hover" v-for="plant in plants" :key="plant.name" v-if="plant.state === 0">
                <div class="item" :class="{'active': currPlant.name === plant.name}" @click="onPlantChange(plant.name)">
                    <PlantImage :src="plant.image"></PlantImage>
                    <p>{{plant.name}}</p>
                </div>
                <div class="info" slot="content">
                    <p>植物：{{plant.name}}</p>
                    <p>成本：{{plant.cost | money}}</p>
                    <p>收益：{{plant.profit | money}}</p>
                    <p>速度: {{plant.speed / 1000}}秒</p>
                    <p>种植季：{{plant.grows | seasonCName}}</p>
                    <p>已种植：{{plant.totalGrown}}</p>
                </div>
            </Poptip>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    export default {
        methods: {
            onPlantChange(val) {
                this.$store.commit('changePlant', val);
            }
        },
        computed: mapState(['plants', 'currPlant'])
    }
</script>

