<template>
    <Menu class="menus" mode="horizontal" @on-select="onMenuSelect">
        <MenuItem name="setting"><Icon type="ios-gear"></Icon>游戏设定</MenuItem>
        <MenuItem name="unlock"><Icon type="unlocked"></Icon>解锁植物</MenuItem>
        <MenuItem name="achievement"><Icon type="trophy"></Icon>成就</MenuItem>
        <MenuItem name="addPot"><Icon type="cube"></Icon>添加土地（{{potsPrice | money}}）</MenuItem>
    </Menu>
</template>

<script>
    import bus from '@/bus';
    import { mapState } from 'vuex';

    export default {
        methods: {
            onMenuSelect(name) {
                bus.$emit('menuSelect', name);
            }
        },
        computed: mapState(['potsPrice'])
    }
</script>
