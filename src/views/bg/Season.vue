<template>
    <div class="season" ref="season">
        <div class="sun hide" ref="sun">
            <div class="circle"></div>
            <div class="circle circle2"></div>
            <div class="sun-ring">
                <div class="ring1"></div>
                <div class="ring2"></div>
                <div class="ring3"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import audio from '@/audio';

    export default {
        methods: {
            addSnow() {
                // 浏览器宽度
                let windowWidth = document.body.clientWidth;
                let $snow  = document.createElement('img');
                // 随机大小
                let random = this.getRandom(10, 40) + "px";
                // 雪花样式
                $snow.classList.add('snow');
                // 随机大小
                $snow.style.width = random;
                $snow.style.height = random;
                // 随机雪花开始位置 left
                $snow.style.left = this.getRandom(0, windowWidth) + "px";
                // 随机雪花图片（1 - 3）
                $snow.setAttribute('src', "/static/images/xuehua" + this.getRandom(1, 3) + ".png");
                this.$refs.season.appendChild($snow);
                setTimeout(() => $snow.remove(), 5000)
            },
            addRain() {
                // 浏览器宽度
                let windowWidth = document.body.clientWidth;
                let $rain  = document.createElement('div');
                $rain.classList.add('rain');
                $rain.style.width = this.getRandom(1, 2) + "px";
                $rain.style.height = this.getRandom(30, 50) + "px";
                // 随机雨滴位置
                $rain.style.left = this.getRandom(0, windowWidth) + "px";
                this.$refs.season.appendChild($rain);
                setTimeout(() => $rain.remove(), 1000)
            },
            addLeaves() {
                let windowWidth = document.body.clientWidth;
                let $leaves  = document.createElement('div');
                // 随机大小
                let random = this.getRandom(10, 40) + "px";
                let color = ['#ecb041', '#ec7041', '#c55125', '#d88b18', '#bf1f44'];
                if(this.getRandom(0, 1) === 1) {
                    $leaves.classList.add('leaves2');
                }
                $leaves.classList.add('leaves');
                $leaves.style.width = random;
                $leaves.style.height = random / 10;
                $leaves.style.backgroundColor = color[this.getRandom(0, color.length)];
                $leaves.style.left = this.getRandom(0, windowWidth) + "px";
                this.$refs.season.appendChild($leaves);
                setTimeout(() => $leaves.remove(), 10000);
            },
            // 获取随机数
            getRandom(min = 0, max = 1) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }
        },
        computed: mapState(['season', 'bgsVolume', 'effects']),
        watch: {
            season(val) {
                this.seasonTimer && clearInterval(this.seasonTimer);
                audio.pauseBgs('rain');
                audio.pauseBgs('wind');
                // 隐藏太阳
                this.$refs.sun.classList.add('hide');
                if (val === 'spring') {
                    if (this.effects > 1) {
                        this.seasonTimer = setInterval(this.addRain, 20);
                    }
                    audio.playBgs('rain', this.bgsVolume / 100);
                } else if (val === 'summer') {
                    this.$refs.sun.classList.remove('hide');
                } else if (val === 'autumn') {
                    if (this.effects > 1) {
                        this.seasonTimer = setInterval(this.addLeaves, 1000);
                    }
                    audio.playBgs('wind', this.bgsVolume / 100);
                } else if (val === 'winter') {
                    if (this.effects > 1) {
                        this.seasonTimer = setInterval(this.addSnow, 200);
                    }
                    audio.playBgs('wind', this.bgsVolume / 100);
                }
            }
        }
    }
</script>
