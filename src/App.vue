<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		name: 'app',
		mounted() {
			console.log(process.env.NODE_ENV);
		}
	}
</script>

<style lang="less">
	@import "assets/less/main";
</style>

