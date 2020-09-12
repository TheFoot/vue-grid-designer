<template>
	<div>

		<h1 v-html="display"></h1>

		<button class="primary" @click="reverse">Reverse</button>

	</div>
</template>

<script>
export default {

    name      : 'HelloWorld',
    mixins    : [],
    components: {},

    props: {
        name: {
            type   : String,
            default: 'World'
        }
    },

    data () {
        return {
            reversed: false
        };
    },

    computed: {
        display () {
            const str = `Hello ${ this.name }`;
            return this.reversed
                ? str
                    .split ( '' )
                    .reverse ()
                    .join ( '' )
                : str;
        }
    },

    methods: {

        reverse () {
            this.reversed = !this.reversed;
        }

    }

};
</script>

<style scoped lang="scss">

h1 {
	display: inline-block;
}

button {
	&:hover {
		-webkit-transform: rotate(180deg);
		-moz-transform: rotate(180deg);
		-o-transform: rotate(180deg);
		-ms-transform: rotate(180deg);
		transform: rotate(180deg);
	}
}

</style>