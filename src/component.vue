<template>
    <div class="vgd">

        <!-- Rows -->
        <div class="vgd__rows">

            <div
                v-for="row in rows"
                :key="row._id"
                :ref="`row_${row._id}`"
                :class="rowClass"
                :data-id="row._id"
                :style="getAnimationStyle()"
                class="vgd__row use-hover"
            >

                <!-- Row toolbar -->
                <div
                    v-if="mode === 'edit'"
                    :style="getAnimationStyle()"
                    class="vgd__row__toolbar no-drag"
                >
                    <slot
                        :addBlock="addBlock"
                        :deleteRow="deleteRow"
                        :row="row"
                        name="row-toolbar"
                    >

					<span
                        class="vgd__row__toolbar__button"
                        title="Delete row"
                        @click="deleteRow($event, row)"
                    >
							<font-awesome-icon :icon="['fas', 'times']"/>
						</span>

                        <span
                            class="vgd__row__toolbar__button"
                            title="Add block"
                            @click="addBlock($event, row)"
                        >
							<font-awesome-icon :icon="['fas', 'plus']"/>
						</span>

                    </slot>

                </div>

                <!-- Blocks -->
                <div
                    v-for="block in row.blocks"
                    :key="block._id"
                    :class="blockClass"
                    :data-id="block._id"
                    :style="getBlockStyles(row, block)"
                    class="vgd__block"
                >

                    <!-- Block toolbar -->
                    <div
                        v-if="mode === 'edit'"
                        :style="getAnimationStyle()"
                        class="vgd__block__toolbar no-drag"
                    >
                        <slot
                            :block="block"
                            :collapseBlock="collapseBlock"
                            :expandBlock="expandBlock"
                            :row="row"
                            name="block-toolbar"
                        >

						<span
                            :class="{ disabled: block.span >= blocksPerRow }"
                            class="vgd__block__toolbar__button"
                            title="Expand"
                            @click="expandBlock($event, row, block)"
                        >
							<font-awesome-icon :icon="['fas', 'plus']"/>
						</span>

                            <span
                                :class="{ disabled: block.span <= 1 }"
                                class="vgd__block__toolbar__button"
                                title="Collapse"
                                @click="collapseBlock($event, row, block)"
                            >
							<font-awesome-icon :icon="['fas', 'minus']"/>
						</span>

                            <span
                                class="vgd__block__toolbar__button"
                                title="Delete"
                                @click="deleteBlock($event, row, block)"
                            >
							<font-awesome-icon :icon="['fas', 'times']"/>
						</span>

                        </slot>

                    </div>

                    <!-- Block content -->
                    <div v-if="mode === 'view'" class="vgd__block__content" v-html="block.content"></div>

                </div>

            </div>

        </div>

        <div v-show="mode === 'edit'" class="no-drag">
            <slot
                :addRow="addRow"
                :maxRows="maxRows"
                name="footer"
            >
                <button
                    :disabled="maxRows > 0 && rows.length >= maxRows"
                    class="vgd__footer__button"
                    @click="addRow($event)"
                >Add Row
                </button>
            </slot>
        </div>

    </div>
</template>

<script>

import PropsMixin          from './mixins/props.mixin';
import ComponentMixin      from './mixins/component.mixin';
import { library }         from '@fortawesome/fontawesome-svg-core';
import {
    faPlus,
    faMinus,
    faTimes
}                          from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add ( faPlus );
library.add ( faMinus );
library.add ( faTimes );

export default {

    // Module/component name
    name: 'VueGridDesigner',

    mixins: [
        PropsMixin,
        ComponentMixin
    ],

    components: {
        FontAwesomeIcon
    }

};
</script>

<style lang="scss">
:root {
    --color-highlight: 55, 114, 255;
    --color-highlight-faded: 215, 227, 255;
    --color-active: 150, 5, 5;
    --color-black: 0, 0, 0;
    --color-white: 255, 255, 255;
    --color-lightgrey: 240, 240, 240;
    --color-darkgrey: 76, 76, 76;
}
</style>

<style lang="scss" scoped>
.vgd {

    font-family: sans-serif;

    &__row {

        position: relative;
        min-height: 65px;

        &__toolbar {

            display: flex;
            visibility: hidden;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            position: absolute;
            top: 0;
            bottom: 0;
            right: -30px;
            width: 30px;
            background-color: rgb(var(--color-highlight-faded));
            padding: 0;

            &__button {

                cursor: pointer;
                width: 100%;
                text-align: center;
                color: rgb(var(--color-darkgrey));
                margin: 4px 0 4px -4px;

                &:hover {
                    color: rgb(var(--color-highlight));
                }

                &.disabled {
                    cursor: default;
                    color: rgb(var(--color-lightgrey));
                    opacity: 0.4;
                }

            }

        }

    }

    &__block {

        position: relative;
        vertical-align: top;
        box-sizing: border-box;
        display: inline-block;
        background-color: rgb(var(--color-lightgrey));
        padding: 0;
        width: calc(var(--block-width) - var(--block-total-margin));

        &__toolbar {

            cursor: initial;
            display: block;
            visibility: hidden;
            position: absolute;
            left: 50%;
            top: 50%;
            margin-top: -15px;
            margin-left: -38px;
            padding: 0;
            height: 30px;
            width: 76px;
            line-height: 30px;
            z-index: 10;
            text-align: center;
            background-color: rgba(var(--color-black), .3);

            &__drag-handle {
                float: left;
                margin-left: 6px;
            }

            &__button {

                cursor: pointer;
                color: lightgray;
                margin-right: 4px;

                &:hover {
                    color: rgb(var(--color-white));
                }

                &.disabled {
                    cursor: not-allowed;
                    opacity: 0.4;
                }

            }

        }

        &__content {
            color: rgb(var(--color-darkgrey));
            text-align: center;
        }

        &--drag {

            opacity: .7;

        }

        &--chosen {

            opacity: .7;

        }

        &--ghost {

            opacity: .2;
            background-color: rgb(var(--color-active));

        }

    }

    &__footer__button {

        border: 0 none;
        padding: .3rem .6rem;
        background-color: rgb(var(--color-darkgrey));
        color: rgb(var(--color-white));
        margin: 10px 6px;
        cursor: pointer;

        &:hover {
            background-color: rgb(var(--color-highlight));
        }

        &[disabled] {
            cursor: not-allowed;
            opacity: 0.4;
            background-color: rgb(var(--color-darkgrey));
        }

    }

    /* Chrome has a hover bug https://github.com/SortableJS/Sortable/issues/232 */
    .use-hover {

        &.vgd__row:hover {

            background-color: rgb(var(--color-highlight-faded));

            .vgd__row__toolbar {
                visibility: visible;
            }

        }

        .vgd__block:hover {

            background-color: rgb(var(--color-highlight));

            .vgd__block__toolbar {
                visibility: visible;
            }

            &:after {

            }

        }

    }

    &.editmode {
        .use-hover {

            &.vgd__row:hover {
                cursor: move;

                &:after {
                    cursor: move;
                    content: "............";
                    position: absolute;
                    left: -20px;
                    top: 0px;
                    padding-left: 9px;
                    padding-bottom: 5px;
                    width: 20px;
                    height: 100%;
                    vertical-align: middle;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                    background-color: rgb(var(--color-highlight-faded));
                    line-break: anywhere;
                    line-height: 5px;
                }
            }
        }
    }

}
</style>