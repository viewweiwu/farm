<template>
    <div class="hello">
        <div class="hello-content">
            <img class="logo" src="../assets/images/farm.jpg" alt="">
            <div class="hello-title">无聊的农场</div>
            <Button class="btn-start" @click="onStartBtnClick" type="info" long>{{hasLocalData ? '继续' : '开始'}}</Button>
        </div>
        <Modal v-model="model" @on-ok="onDoneBtnClick">
            <Input placeholder="请输入你的大名" v-model="username"></Input>
        </Modal>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                hasLocalData: false,
                data: null,
                model: false,
                username: ""
            }
        },
        mounted() {
            let data = localStorage.getItem('farmData');
            this.hasLocalData = !!data;
            this.data = data;
        },
        methods: {
            onStartBtnClick() {
                let data = this.data;
                if (!data) {
                    this.model = true;
                } else {
                    this.$store.commit('load');
                    this.$router.push('/scene');
                }
            },
            onDoneBtnClick() {
                this.$store.commit('setUsername', this.username.trim() || '未来袁隆平');
                this.$store.commit('save');
                this.$Notice.success({
                    title: '游戏开始',
                    desc: '已经自动存档'
                });
                this.$Notice.info({
                    title: '游戏提示',
                    desc: '鼠标移动到白色的那个土地上即可种植植物',
                    duration: 10
                });
                this.$router.push('/scene');
            }
        }
    }
</script>

