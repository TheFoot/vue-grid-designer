<template>
	<div class="container">
		<div class="row">
			<div class="col-sm-12 text-center">
				<img src="https://vuejs.org/images/logo.png" alt="Vue Logo"/>
			</div>
		</div>
		<div class="row">
			<div class="col-sm-12 component">
				<hello-world/>
			</div>
		</div>
	</div>

</template>

<script>
import HelloWorld from '@/component';

export default {

    name      : 'App',
    components: { HelloWorld }

};
</script>

<style scoped lang="scss">
.container {

	max-width : 1024px;

	.component {
		border : 1px solid lightgray;
	}

}

.text-center {
	text-align : center;
}
</style>