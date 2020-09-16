<template>
	<div class="blb">

		<div class="container-fluid">

			<div
					v-for="(row, rowIdx) in value"
					:key="row._id"
					class="row"
			>
				<div :class="getBlockClasses(row, block, blockIdx)"
				     v-for="(block, blockIdx) in row.blocks"
				     :key="block._id"
				     v-html="getBlockContent(rowIdx, blockIdx)"
				></div>
			</div>

		</div>

	</div>
</template>

<script>

export default {

    name: 'BsLayoutBuilder',

    props: {

        value: {
            type   : Array,
            default: () => []
        },

        layoutSize: {
            type: Number
        }

    },

    methods: {

        getBlockClasses ( row, block, blockIdx ) {

            let classes = [
                `col-${ block.span }`
            ];

            if ( ( block.classes || '' ).length > 0 ) {
                classes = classes.concat ( block.classes );
            }

            if ( row.isHeader ) {
                classes.push ( 'bg-primary text-white p-4' );
            } else if ( row.isFooter ) {
                classes.push ( 'bg-light text-dark border-top p-2' );
            } else {
                classes.push ( 'p-3' );
                classes.push ( ( blockIdx % 2 ) > 0 ? 'bg-warning' : 'bg-danger' );
            }

            return classes.join ( ' ' );

        },

        getBlockContent ( rowIdx, blockIdx ) {
            return `${ rowIdx + 1 }:${ blockIdx + 1 }`;
        }

    }

};

</script>

<style scoped lang="scss">

</style>