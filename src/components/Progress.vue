<template>
    <div class="progress">
        <div class="progress-content" :style="'width:' + value + '%' "></div>
    </div>
</template>

<script>
    export default {
        props: {
            value: {
                type: Number,
                default: 0
            }
        }
    }
</script>

