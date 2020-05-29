<template>
    <img :src="url + src" class="plant" alt="" draggable="false">
</template>

<script>
    export default {
        name: 'PlantImage',
        props: {
            src: String
        },
        computed: {
            url() {
                // return process.env.NODE_ENV === 'development' ? '/static/images/' : '/farm/static/images/';
                return '/static/images/';
            }
        }
    }
</script>

