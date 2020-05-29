<template>
    <div class="bg" :class="season"></div>
</template>

<script>
    import { mapState } from 'vuex';
    import audio from '@/audio';

    export default {
        mounted() {
            audio.playBgm(this.bgm, this.bgmVolume / 100);
        },
        computed: mapState(['season', 'bgm', 'bgmVolume'])
    }
</script>
