<template>
    <div class="user">
        ￥{{user.money | money}}
    </div>
</template>
<script>
    import { mapState } from 'vuex';
    export default {
        computed: mapState(['user'])
    }
</script>

