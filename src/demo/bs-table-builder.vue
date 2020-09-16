<template>
	<div class="btb">

		<table class="table table-bordered table-hover table-striped">

			<thead v-if="header">
				<tr>
					<th
							v-for="(block,blockIdx) in header.blocks"
							:key="block._id"
							v-html="getBlockContent(header.rowIdx, blockIdx, false)"
							:colspan="block.span"
							:class="getHeaderBlockClasses(block)"
					></th>
				</tr>
			</thead>

			<tbody>

				<tr
						v-for="row in body"
						:key="row._id"
				>
					<td
							v-for="(block, blockIdx) in row.blocks"
							:key="block._id"
							v-html="getBlockContent(row.rowIdx, blockIdx)"
							:colspan="block.span"
							:class="getBodyBlockClasses(row, block, blockIdx)"
					></td>
				</tr>

			</tbody>

			<tfoot v-if="footer">
				<tr>
					<td
							v-for="(block,blockIdx) in footer.blocks"
							:key="block._id"
							v-html="getBlockContent(footer.rowIdx, blockIdx,false)"
							:colspan="block.span"
							:class="getFooterBlockClasses(block)"
					></td>
				</tr>
			</tfoot>

		</table>

	</div>
</template>

<script>

export default {

    name: 'BsTableBuilder',

    props: {

        value: {
            type   : Array,
            default: () => []
        },

        layoutSize: {
            type: Number
        }

    },

    computed: {

        header () {

            const header = this.value.find ( x => x.isHeader );
            if ( header ) {
                header.rowIdx = 0;
            }

            return header;

        },

        footer () {

            const footer = this.value.find ( x => x.isFooter );
            if ( footer ) {
                footer.rowIdx = this.value.length - 1;
            }

            return footer;

        },

        body () {

            return this
                .value
                .filter ( x => !x.isHeader && !x.isFooter )
                .map ( ( row, idx ) => {
                    row.rowIdx = idx;
                    return row;
                } );

        }

    },

    methods: {

        getHeaderBlockClasses ( block ) {

            let classes = [ 'bg-primary text-white p-4' ];

            if ( ( block.classes || '' ).length > 0 ) {
                classes = classes.concat ( block.classes );
            }

            return classes.join ( ' ' );
        },

        getFooterBlockClasses ( block ) {

            let classes = [ 'bg-light text-dark border-top p-2' ];

            if ( ( block.classes || '' ).length > 0 ) {
                classes = classes.concat ( block.classes );
            }

            return classes.join ( ' ' );

        },

        getBodyBlockClasses ( row, block, blockIdx ) {

            let classes = [ 'p-3' ];

            if ( ( block.classes || '' ).length > 0 ) {
                classes = classes.concat ( block.classes );
            }

            classes.push ( ( blockIdx % 2 ) > 0 ? 'bg-warning' : 'bg-danger' );

            return classes.join ( ' ' );

        },

        getBlockContent ( rowIdx, blockIdx, isBody = true ) {
            return `${ rowIdx + ( isBody && this.header ? 2 : 1 ) }:${ blockIdx + 1 }`;
        }

    }

};

</script>