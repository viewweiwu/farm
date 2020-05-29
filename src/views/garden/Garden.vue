<template>
    <div class="garden">
        <Plantpot v-for="(pot, index) in pots" :pot="pot" :key="index"></Plantpot>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import Plantpot from "./Plantpot";

    export default {
        data() {
            return {
            }
        },
        components: {
            Plantpot
        },
        methods: {
        },
        computed: mapState([
            'user',
            'pots'
        ])
    }
</script>
