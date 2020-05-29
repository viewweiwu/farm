<template>
    <div class="model-achievement" :class="{hide: !model}">
        <div class="content">
            <div class="content-header">
                成就列表 ({{achievementPercent}}%)
                <Icon class="btn-close" type="ios-close-empty" @click.native="closeModel"></Icon>
            </div>
            <div class="content-body">
                <div class="item" v-for="item in achievement" :key="item.id">
                    <Icon class="icon" type="trophy"></Icon>
                    <div class="content">
                        <p class="title">{{item.title}}</p>
                        <p class="content">{{item.desc}}</p>
                        <div class="progress-pnl">
                            <div class="info">({{item.complatePlantCurrCount + "/" + item.complatePlantNeedCount}})</div>
                            <ProgressBar :value="item | percent"></ProgressBar>
                        </div>
                    </div>
                    <div class="complate" v-if="item.complate">完成</div>
                    <div class="label-list">
                        <Button class="label" type="primary" shape="circle" size="small" icon="arrow-graph-up-right">{{item.profit}}</Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import bus from '@/bus';
    import { mapState } from 'vuex';
    import ProgressBar from "@/components/Progress";

    export default {
        components: {
            ProgressBar
        },
        data() {
            return {
                model: false
            }
        },
        created() {
            bus.$on('menuSelect', (name) => {
                if (name === 'achievement') {
                    this.openModel();
                }
            });
        },
        methods: {
            openModel() {
                this.model = true;
            },
            closeModel() {
                this.model = false;
            }
        },
        filters: {
            percent(item) {
                return item.complatePlantCurrCount / item.complatePlantNeedCount * 100;
            }
        },
        computed: {
            ...mapState(['achievement']),
            achievementPercent() {
                let complateLenth = this.achievement.filter(obj => obj.complate).length;
                return Math.floor(complateLenth / this.achievement.length * 100);
            }
        } 
    }
</script>
