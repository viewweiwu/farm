<template>
    <div class="setting">
        <div class="model-setting" :class="{'hide': !model}">
            <div class="content">
                <div class="header">
                    游戏设定
                    <Icon class="btn-close" type="android-close" size="20" @click.native="closeModel"></Icon>
                </div>
                <div class="body">
                    <Form :label-width="60">
                        <FormItem class="item-setting" label="特效">
                            <RadioGroup v-model="effectsText" type="button">
                                <Radio label="渣"></Radio>
                                <Radio label="低"></Radio>
                                <Radio label="中"></Radio>
                                <Radio label="高"></Radio>
                            </RadioGroup>
                        </FormItem>
                        <FormItem class="item-setting" label="土地大小">
                            <Slider class="size-range" v-model="size" :min="50" :max="100"></Slider>
                        </FormItem>
                        <FormItem class="item-setting" label="音效音量">
                            <Slider class="size-range" v-model="localSeVolume" @on-change="onSeChange"></Slider>
                        </FormItem>
                        <FormItem class="item-setting" label="背景音乐">
                            <Slider class="size-range" v-model="localBgmVolume"></Slider>
                        </FormItem>
                        <FormItem class="item-setting" label="背景音效">
                            <Slider class="size-range" v-model="localBgsVolume"></Slider>
                        </FormItem>
                    </Form>
                    <Poptip
                        confirm
                        title="你真的要重新开始游戏？"
                        @on-ok="onResetBtnClick"
                        placement="top-start">
                        <Button type="error">重新开始</Button>
                    </Poptip>
                    <Button type="primary" @click="onSaveBtnClick">存档</Button>
                </div>
                <div class="footer">
                    <Button type="primary" @click="closeModel">确定</Button>
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
                size: 50,
                localSeVolume: 0,
                localBgmVolume: 0,
                localBgsVolume: 0,
                model: false,
                effectsText: "中"
            }
        },
        created() {
            bus.$on('menuSelect', (name) => {
                if (name === 'setting') {
                    this.openModel();
                }
            });
        },
        mounted() {
            this.size = this.plantPotSize;
            this.localSeVolume = this.seVolume;
            this.localBgmVolume = this.bgmVolume;
            this.localBgsVolume = this.bgsVolume;
        },
        methods: {
            onSeChange() {
                audio.playSe('grow', this.seVolume / 100);
            },
            openModel() {
                this.model = true;
            },
            closeModel() {
                this.model = false;
            },
            onResetBtnClick() {
                localStorage.clear('farmData');
                // 还是要用原生跳转，不然很多状态清空不了
                this.$nextTick(() => {
                    location.reload();
                });
            },
            onSaveBtnClick() {
                this.$store.commit('save');
                this.$Notice.success({
                    title: '存档',
                    desc: '游戏已经存档'
                });
            }
        },
        watch: {
            size(value) {
                this.$store.commit('changePlantPotSize', value);
            },
            localSeVolume(value) {
                this.$store.commit('setSeVolume', value);
            },
            localBgmVolume(value) {
                this.$store.commit('setBgmVolume', value);
                audio.setBgmVolume(this.bgm, value / 100);
            },
            localBgsVolume(value) {
                this.$store.commit('setBgsVolume', value);
                audio.setBgsVolume(value / 100);
            },
            plantPotSize(value) {
                this.size = value;
            },
            seVolume(value) {
                this.localSeVolume = value;
            },
            bgmVolume(value) {
                this.localBgmVolume = value;
            },
            bgsVolume(value) {
                this.localBgsVolume = value;
            },
            effects(value) {
                let map = {
                    0 : "渣",
                    1 :"低",
                    2 :"中",
                    3 :"高"
                }
                this.effectsText = map[value];
            },
            effectsText(value) {
                let map = {
                    "渣": 0,
                    "低": 1,
                    "中": 2,
                    "高": 3
                }
                this.$store.commit('setEffects', map[value]);
            }
        },
        computed: mapState(['plantPotSize', 'seVolume', 'bgm', 'bgmVolume', 'bgsVolume', 'effects'])
    }
</script>

