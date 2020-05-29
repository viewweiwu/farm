<template>
    <svg class="icon" aria-hidden="true">
        <use :xlink:href="'#' + type"></use>
    </svg>
</template>

<script>
    export default {
        name: 'Icon',
        props: {
            type: String,
            size: Number
        }
    }
</script>

