<template>
	<div id="demo" class="container">

		<div class="row">
			<div class="col text-center">
				<img src="https://vuejs.org/images/logo.png" alt="Vue Logo"/>
			</div>
		</div>

		<div class="jumbotron jumbotron-fluid text-center p-4">
			<div class="container mt-2">
				<h1 class="display-4">Vue Grid Designer Demo</h1>
				<p class="lead">Vue 2.x component for designing grid layouts using SortableJS.</p>
			</div>
		</div>

		<ul class="nav nav-tabs" id="demoTabs" role="tablist">
			<li class="nav-item" role="presentation">
				<a class="nav-link active" id="demoTabBasic" data-toggle="tab" href="#demoContentBasic" role="tab"
				   aria-controls="home" aria-selected="true">Basic Props</a>
			</li>
			<li class="nav-item" role="presentation">
				<a class="nav-link" id="demoTabBones" data-toggle="tab" href="#demoContentBones" role="tab"
				   aria-controls="home" aria-selected="true">Bare Bones</a>
			</li>
			<li class="nav-item" role="presentation">
				<a class="nav-link" id="demoTabContent" data-toggle="tab" href="#demoContentContent" role="tab"
				   aria-controls="home" aria-selected="true">Content</a>
			</li>
			<li class="nav-item" role="presentation">
				<a class="nav-link" id="demoTabCustomStyle" data-toggle="tab" href="#demoContentCustomStyle" role="tab"
				   aria-controls="home" aria-selected="true">Custom Styling</a>
			</li>
			<li class="nav-item" role="presentation">
				<a class="nav-link" id="demoTabSlots" data-toggle="tab" href="#demoContentSlots" role="tab"
				   aria-controls="home" aria-selected="true">Slots</a>
			</li>
			<li class="nav-item" role="presentation">
				<a class="nav-link" id="demoTabEvents" data-toggle="tab" href="#demoContentEvents" role="tab"
				   aria-controls="home" aria-selected="true">Events</a>
			</li>
			<li class="nav-item" role="presentation">
				<a class="nav-link" id="demoTabHtml" data-toggle="tab" href="#demoContentHtml" role="tab"
				   aria-controls="home" aria-selected="true">HTML Generator</a>
			</li>
		</ul>

		<div class="tab-content border border-top-0 py-4 px-2" id="demoTabContentContainer">

			<div class="tab-pane fade show active" id="demoContentBasic" role="tabpanel" aria-labelledby="demoTabBasic">

				<div class="container">

					<div class="row">
						<div class="col-6">
							<p>This demo shows the grid designer with it's default values. The provided grid data is
							   empty and is automatically populated with a default row to get you started.
							   Use the demo toolbar controls below to change the props.</p>
						</div>
						<div class="col-6">
							<pre v-highlightjs="getCode('basicStyleMarkup')"><code class="html"></code></pre>
						</div>
					</div>

					<div class="row">
						<div class="col shadow border p-2">

							<nav class="navbar navbar-dark bg-dark mb-3">
								<form class="form-inline">

									<label class="my-1 mr-2 text-light" for="demoBasicToolbarMode">View mode</label>
									<select
											class="custom-select my-1 mr-sm-2"
											id="demoBasicToolbarMode"
											v-model="controls.basic.mode"
									>
										<option selected value="edit">Edit</option>
										<option value="view">View</option>
									</select>

									<label class="my-1 mx-2 text-light" for="demoBasicToolbarBlocksPerRow">Blocks per
									                                                                       row</label>
									<input type="number" class="form-control my-1 mr-sm-2"
									       id="demoBasicToolbarBlocksPerRow"
									       min="1" max="12" step="1" v-model.number="controls.basic.blocksPerRow"/>

									<label class="my-1 mx-2 text-light" for="demoBasicToolbarMaxRows">Max rows</label>
									<input type="number" class="form-control my-1 mr-sm-2" id="demoBasicToolbarMaxRows"
									       min="0" step="1" v-model.number="controls.basic.maxRows"/>

									<label class="my-1 mx-2 text-light" for="demoBasicToolbarMinBlockHeight">Min block
									                                                                         height
									                                                                         (px)</label>
									<input type="number" class="form-control my-1 mr-sm-2"
									       id="demoBasicToolbarMinBlockHeight"
									       min="70" step="10" v-model.number="controls.basic.minBlockHeight"/>

								</form>
							</nav>

							<vue-grid-designer
									v-model="grids.basic"
									:mode="controls.basic.mode"
									:blocks-per-row="controls.basic.blocksPerRow"
									:max-rows="controls.basic.maxRows"
									:min-block-height="controls.basic.minBlockHeight"
							/>

						</div>
					</div>

				</div>

				<div class="mt-4 px-2">
					<h5>Data Model</h5>
					<pre v-highlightjs="getJSON ( grids.basic )"><code class="json"></code></pre>
				</div>

			</div>

			<div class="tab-pane fade show" id="demoContentBones" role="tabpanel" aria-labelledby="demoTabBones">

				<div class="container">

					<div class="row">
						<div class="col">
							<vue-grid-designer v-model="grids.bones"/>
						</div>
					</div>

				</div>

				<div class="mt-4 px-2">
					<h5>Data Model</h5>
					<pre v-highlightjs="getJSON ( grids.bones )"><code class="json"></code></pre>
				</div>

			</div>

			<div class="tab-pane fade" id="demoContentContent" role="tabpanel" aria-labelledby="demoTabContent">

				<div class="container">

					<div class="row">
						<div class="col-6">
							<p>Text and HTML content provided via each block's <code>content</code> property,
							   is displayed when in <code>view</code> mode. However, it is hidden when in
								<code>edit</code> mode.</p>
							<div class="alert alert-info">
								<font-awesome-icon :icon="['fas', 'info']" class="mr-4"/>
								NOTE: Vue components cannot be embedded this way.
							</div>
							<p>This demo model implements custom model properties. Click the <code>Full Model</code>
							   button and open the browser console, to see the full internal model.</p>
						</div>
						<div class="col-6">
							<pre v-highlightjs="getCode('contentStyleMarkup')"><code class="html"></code></pre>
							<pre v-highlightjs="getCode('contentDataModel')"><code class="js"></code></pre>
						</div>
					</div>

					<div class="row">
						<div class="col shadow border p-2">

							<nav class="navbar navbar-dark bg-dark mb-3">
								<form class="form-inline">

									<label class="my-1 mr-2 text-light" for="demoContentToolbarMode">View mode</label>
									<select
											class="custom-select my-1 mr-sm-2"
											id="demoContentToolbarMode"
											v-model="controls.content.mode"
									>
										<option selected value="edit">Edit</option>
										<option value="view">View</option>
									</select>

									<button type="button" class="btn btn-light" @click="getFullDataModel">Full Model
									</button>

								</form>
							</nav>

							<vue-grid-designer
									v-model="grids.content"
									ref="demoComponentContent"
									:mode="controls.content.mode"
									:blocks-per-row="4"
							/>

						</div>
					</div>

				</div>

				<div class="mt-4 px-2">
					<h5>Data Model</h5>
					<pre v-highlightjs="getJSON ( grids.content )"><code class="json"></code></pre>
				</div>

			</div>

			<div class="tab-pane fade" id="demoContentCustomStyle" role="tabpanel" aria-labelledby="demoTabCustomStyle">

				<div class="container">

					<div class="row">
						<div class="col-6">

							<h5>Row and Block Classes</h5>
							<p>You can specify <em>additional</em> CSS classes for the Row and Block elements.</p>

							<h5>SortableJS Classes</h5>
							<p>You can specify alternate <code>drag</code>, <code>chosen</code> and
								<code>ghost</code> SortableJS classes.</p>

							<h5>Style Overrides</h5>
							<p>All other classes can be simply overridden.</p>

						</div>
						<div class="col-6">
							<pre v-highlightjs="getCode('customStyleMarkup')"><code class="html"></code></pre>
							<pre v-highlightjs="getCode('customStyleScss')"><code class="scss"></code></pre>
						</div>
					</div>

					<div class="row">
						<div class="col shadow border p-2">

							<nav class="navbar navbar-dark bg-dark mb-3">
								<form class="form-inline">

									<label class="my-1 mr-2 text-light" for="demoStyleToolbarMode">View mode</label>
									<select
											class="custom-select my-1 mr-sm-2"
											id="demoStyleToolbarMode"
											v-model="controls.customStyle.mode"
									>
										<option selected value="edit">Edit</option>
										<option value="view">View</option>
									</select>

								</form>
							</nav>

							<vue-grid-designer
									v-model="grids.customStyle"
									:mode="controls.customStyle.mode"
									:row-class="controls.customStyle.rowClass"
									:block-class="controls.customStyle.blockClass"
							/>

						</div>
					</div>

				</div>

				<div class="mt-4 px-2">
					<h5>Data Model</h5>
					<pre v-highlightjs="getJSON ( grids.customStyle )"><code class="json"></code></pre>
				</div>

			</div>

			<div class="tab-pane fade show" id="demoContentSlots" role="tabpanel" aria-labelledby="demoTabSlots">

				<div class="container">

					<div class="row">
						<div class="col-6">
							<p>This demo uses the <code>footer</code> slot to implement a custom Bootstrap button
							   with a font-awesome icon.</p>
						</div>
						<div class="col-6">
							<pre v-highlightjs="getCode('slotsMarkup')"><code class="html"></code></pre>
						</div>
					</div>

					<div class="row">
						<div class="col shadow border p-2">

							<nav class="navbar navbar-dark bg-dark mb-3">
								<form class="form-inline">

									<label class="my-1 mr-2 text-light" for="demoSlotsToolbarMode">View mode</label>
									<select
											class="custom-select my-1 mr-sm-2"
											id="demoSlotsToolbarMode"
											v-model="controls.slots.mode"
									>
										<option selected value="edit">Edit</option>
										<option value="view">View</option>
									</select>

								</form>
							</nav>

							<vue-grid-designer
									v-model="grids.slots"
									:mode="controls.slots.mode"
							>

								<template v-slot:footer="blockScope">
									<button
											class="btn btn-block btn-primary"
											@click="blockScope.addRow"
											:disabled="blockScope.maxRows > 0 && grids.slots.length >= blockScope.maxRows"
									>
										<font-awesome-icon :icon="['fas', 'plus-square']" size="2x" class="mr-3"/>
										<span style="font-size: 2rem;">Create Row</span>
									</button>
								</template>

							</vue-grid-designer>

						</div>
					</div>

				</div>

				<div class="mt-4 px-2">
					<h5>Data Model</h5>
					<pre v-highlightjs="getJSON ( grids.slots )"><code class="json"></code></pre>
				</div>

			</div>

			<div class="tab-pane fade show" id="demoContentEvents" role="tabpanel" aria-labelledby="demoTabEvents">

				<div class="container">

					<div class="row">
						<div class="col-6">
							<p>Open the browser console to see events being fired.
							   Or use the <a href="https://github.com/vuejs/vue-devtools" target="_blank">Vue developer
							                                                                              tools</a>.</p>
						</div>
						<div class="col-6">
							<pre v-highlightjs="getCode('eventsMarkup')"><code class="html"></code></pre>
						</div>
					</div>

					<div class="row">
						<div class="col shadow border p-2">
							<vue-grid-designer
									v-model="grids.events"
									:mode="controls.events.mode"
									@ready="showDemoEvent('ready', $event)"
									@update="showDemoEvent('update', $event)"
									@remove-block="showDemoEvent('remove-block', $event)"
									@remove-row="showDemoEvent('remove-row', $event)"
									@add-block="showDemoEvent('add-block', $event)"
									@add-row="showDemoEvent('add-row', $event)"
									@drag-start="showDemoEvent('drag-start', $event)"
									@drag-stop="showDemoEvent('drag-stop', $event)"
									@block-changed="showDemoEvent('block-changed', $event)"
									@input="showDemoEvent('input (manual handler)', $event)"
							/>
						</div>
					</div>

				</div>

				<div class="mt-4 px-2">
					<h5>Data Model</h5>
					<pre v-highlightjs="getJSON ( grids.events )"><code class="json"></code></pre>
				</div>

			</div>

			<div class="tab-pane fade show" id="demoContentHtml" role="tabpanel" aria-labelledby="demoTabHtml">

				<div class="container">

					<div class="row">
						<div class="col-6">
							<p>This demo shows the grid model being used to dynamically render Bootstrap layout and
							   table components</p>
						</div>
						<div class="col-6">
							<pre v-highlightjs="getCode('htmlMarkup')"><code class="html"></code></pre>
						</div>
					</div>

					<div class="row">
						<div class="col shadow border p-2">

							<vue-grid-designer
									v-model="grids.html"
									:mode="controls.html.mode"
									:blocks-per-row="controls.html.blocksPerRow"
									:max-rows="controls.html.maxRows"
									:min-block-height="controls.html.minBlockHeight"
							/>

						</div>
					</div>

				</div>

				<div class="card-deck mt-4 px-2">
					<div class="card">
						<div class="card-header">Layout Builder Component</div>
						<div class="card-body">
							<bs-layout-builder
									v-model="grids.html"
									:layout-size="controls.html.blocksPerRow"
									class="border rounded shadow-sm p-2"
							/>
						</div>
						<div class="card-footer">
							<pre v-highlightjs="getCode('htmlLayout')"><code class="html"></code></pre>
						</div>
					</div>
					<div class="card">
						<div class="card-header">Table Builder Component</div>
						<div class="card-body">
							<bs-table-builder
									v-model="grids.html"
									:layout-size="controls.html.blocksPerRow"
									class="border rounded shadow-sm p-2"
							/>
						</div>
						<div class="card-footer">
							<pre v-highlightjs="getCode('htmlTable')"><code class="html"></code></pre>
						</div>
					</div>
				</div>

			</div>

		</div>

	</div>
</template>

<script>

import VueGridDesigner          from '@/component';
import { library }              from '@fortawesome/fontawesome-svg-core';
import { faInfo, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon }      from '@fortawesome/vue-fontawesome';
import BsLayoutBuilder          from '@/demo/bs-layout-builder';
import BsTableBuilder           from '@/demo/bs-table-builder';

library.add ( faInfo );
library.add ( faPlusSquare );

export default {

    name      : 'App',
    components: { VueGridDesigner, FontAwesomeIcon, BsLayoutBuilder, BsTableBuilder },
    data () {
        return {

            grids: {

                basic: [],

                bones: [
                    {
                        blocks: [
                            { span: 1, content: '' },
                            { span: 1, content: '' },
                            { span: 1, content: '' },
                            { span: 1, content: '' }
                        ]
                    },
                    {
                        blocks: [
                            { span: 3, content: '' },
                            { span: 1, content: '' }
                        ]
                    },
                    {
                        blocks: [
                            { span: 2, content: '' },
                            { span: 2, content: '' }
                        ]
                    },
                    {
                        blocks: [
                            { span: 4, content: '' }
                        ]
                    }
                ],

                content: [
                    {
                        label : 'First row',
                        blocks: [
                            {
                                span   : 4,
                                source : 'https://www.blindtextgenerator.com/lorem-ipsum',
                                content: '<h5 class="mt-2">Far, far away</h5><p class="p-2">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life</p>'
                            }
                        ]
                    },
                    {
                        label : 'Second row',
                        blocks: [
                            {
                                span   : 2,
                                source : 'https://en.wikipedia.org/wiki/The_quick_brown_fox_jumps_over_the_lazy_dog',
                                content: '<h5 class="mt-2 ml-2 text-left">Quick ol\' foxy</h5><p class="text-left p-2">The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax quiz prog.</p>'
                            },
                            {
                                span   : 2,
                                source : 'via.placeholder.com',
                                content: '<div class="m-2"><img class="img-fluid rounded" src="https://via.placeholder.com/468x60?text=Image: 468x60" /></div>'
                            }
                        ]
                    }
                ],

                customStyle: [
                    {
                        blocks: [
                            { span: 2, content: 'One' },
                            { span: 2, content: 'Two' }
                        ]
                    }
                ],

                slots: [],

                events: [],

                html: [
                    {
                        isHeader: true,
                        blocks  : [
                            { span: 2, classes: 'text-center' },
                            { span: 2, classes: 'text-center' },
                            { span: 2, classes: 'text-center' },
                            { span: 2, classes: 'text-center' },
                            { span: 2, classes: 'text-center' },
                            { span: 2, classes: 'text-center' }
                        ]
                    },
                    {
                        blocks: [
                            { span: 3, classes: 'text-center' },
                            { span: 3, classes: 'text-center' },
                            { span: 3, classes: 'text-center' },
                            { span: 3, classes: 'text-center' }
                        ]
                    },
                    {
                        isFooter: true,
                        classes : 'text-center',
                        blocks  : [
                            { span: 12, classes: 'text-center' }
                        ]
                    }
                ]

            },

            controls: {
                basic      : {
                    mode          : 'edit',
                    blocksPerRow  : 4,
                    maxRows       : 0,
                    minBlockHeight: 100
                },
                bones      : {
                    mode: 'edit'
                },
                content    : {
                    mode: 'view'
                },
                customStyle: {
                    mode      : 'edit',
                    rowClass  : 'demo__row',
                    blockClass: 'demo__block'
                },
                slots      : {
                    mode: 'edit'
                },
                events     : {
                    mode: 'edit'
                },
                html       : {
                    mode          : 'edit',
                    blocksPerRow  : 12,
                    maxRows       : 4,
                    minBlockHeight: 70
                }
            }

        };
    },
    computed  : {},
    methods   : {

        getJSON ( data ) {
            return JSON.stringify ( data, null, 4 );
        },

        getCode ( which ) {
            switch ( which ) {

                case 'basicStyleMarkup':
                    return '<vue-grid-designer v-model="grids.basic" />';

                case 'contentStyleMarkup':
                    return '<vue-grid-designer v-model="grids.content" />';

                case 'customStyleMarkup':
                    return `<vue-grid-designer
    v-model="grids.customStyle"
    mode="edit"
    row-class="demo__row"
    block-class="demo__block"
/>`;

                case 'customStyleScss':
                    return `#demo {

    .vgd__row.demo__row {
        padding: 1rem;
        background-color: black;

        .vgd__row__toolbar {
            background-color: rgba(0, 0, 0, .5);
            &__button {
                color: white;
            }
        }
    }

    .vgd__block.demo__block {
        padding: .6rem;
        background-color: rgba(255, 127, 80, .5);
    }

    .use-hover {
        &.vgd__row.demo__row {
            &:hover {
                background-color: rgba(0, 0, 0, .5);
            }
            .vgd__block.demo__block:hover {
                background-color: rgb(255, 127, 80);
            }
        }
    }

};`;

                case 'slotsMarkup':
                    return `<vue-grid-designer
    v-model="grids.slots"
    mode="edit"
>

    <template v-slot:footer="blockScope">
        <button
            class="btn btn-block btn-primary"
            @click="blockScope.addRow"
            :disabled="blockScope.maxRows > 0 && grids.slots.length >= blockScope.maxRows"
        >
            <font-awesome-icon :icon="['fas', 'plus-square']" size="2x" class="mr-3"/>
            <span style="font-size: 2rem;">Create Row</span>
        </button>
    </template>

</vue-grid-designer>`;

                case 'eventsMarkup':
                    return `<vue-grid-designer
    v-model="grids.events"
    mode="edit"
    @ready="showDemoEvent('ready', $event)"
    @update="showDemoEvent('update', $event)"
    @remove-block="showDemoEvent('remove-block', $event)"
    @remove-row="showDemoEvent('remove-row', $event)"
    @add-block="showDemoEvent('add-block', $event)"
    @add-row="showDemoEvent('add-row', $event)"
    @drag-start="showDemoEvent('drag-start', $event)"
    @drag-stop="showDemoEvent('drag-stop', $event)"
    @block-changed="showDemoEvent('block-changed', $event)"
    @input="showDemoEvent('input (manual handler)', $event)"
/>`;

                case 'contentDataModel':
                    return `getFullDataModel () {

    const $comp = this.$refs[ 'demoComponentContent' ];
    console.log ( 'Full Data Model: ', $comp.getFullModel () );

}`;

                case 'htmlLayout':
                    return `<bs-layout-builder
    v-model="grids.html"
    :layout-size="controls.html.blocksPerRow"
    class="border rounded shadow-sm p-2"
/>`;

                case 'htmlTable':
                    return `<bs-table-builder
    v-model="grids.html"
    :layout-size="controls.html.blocksPerRow"
    class="border rounded shadow-sm p-2"
/>`;

                case 'htmlMarkup':
                    return `<vue-grid-designer
    v-model="grids.html"
    mode="edit"
    :blocks-per-row="12"
    :max-rows="4"
    :min-block-height="70"
/>`;

            }
        },

        showDemoEvent ( name, e ) {
            console.log ( `Event: ${ name }`, e );
        },

        getFullDataModel () {

            const $comp = this.$refs[ 'demoComponentContent' ];
            console.log ( 'Full Data Model: ', $comp.getFullModel () );

        }

    }

};
</script>

<style lang="scss">

pre {
	font-size: 0.8rem;
	max-height: 400px;
	position: relative;
}

pre code.hljs.html::before,
pre code.hljs.js::before,
pre code.hljs.json::before,
pre code.hljs.scss::before,
pre code.hljs.css::before {
	font-family: "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
	position: absolute;
	top: 0;
	right: 10px;
	color: #cccccc;
	text-align: right;
	font-size: 0.9em;
	padding: 5px 10px 0;
	line-height: 15px;
	height: 15px;
	font-weight: 600;
}

pre code.hljs.html::before {
	content: "HTML";
}

pre code.hljs.js::before {
	content: "JS";
}

pre code.hljs.json::before {
	content: "JSON";
}

pre code.hljs.scss::before {
	content: "SCSS";
}

pre code.hljs.css::before {
	content: "CSS";
}

.navbar {
	input[type="number"] {
		width: 100px;
	}
}

#demo {

	.vgd__row.demo__row {
		padding: 1rem;
		background-color: black;

		.vgd__row__toolbar {
			background-color: rgba(0, 0, 0, .5);

			&__button {
				color: white;
			}
		}
	}

	.vgd__block.demo__block {
		padding: .6rem;
		background-color: rgba(255, 127, 80, .5);
	}

	.use-hover {

		&.vgd__row.demo__row {
			&:hover {
				background-color: rgba(0, 0, 0, .5);
			}

			.vgd__block.demo__block:hover {
				background-color: rgb(255, 127, 80);
			}
		}

	}

}

</style>