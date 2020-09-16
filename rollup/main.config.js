import vue           from 'rollup-plugin-vue';
import resolve       from '@rollup/plugin-node-resolve';
import replace       from '@rollup/plugin-replace';
import commonjs      from '@rollup/plugin-commonjs';
import copy          from 'rollup-plugin-copy';
import alias         from '@rollup/plugin-alias';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import { terser }    from 'rollup-plugin-terser';
import path          from 'path';

const customResolver = resolve (
    {
        extensions: [ '.js', '.json', '.vue', '.scss' ]
    }
);

const projectRootDir = path.resolve ( __dirname, '../' );

export default {

    context: 'window',

    external: [],

    input: 'src/component.js',

    output: [

        {

            format   : 'esm',
            file     : 'dist/component.esm.js',
            sourcemap: true,
            globals  : {}

        },

        {

            format   : 'umd',
            name     : 'vueGridDesigner',
            file     : 'dist/component.umd.js',
            sourcemap: true,
            globals  : {},
            plugins  : [ terser () ]

        },

        {

            format   : 'iife',
            name     : 'vueGridDesigner',
            file     : 'dist/component.min.js',
            sourcemap: true,
            globals  : {},
            plugins  : [ terser () ]

        }

    ],

    plugins: [
        alias (
            {
                entries: [
                    { find: '@', replacement: path.resolve ( projectRootDir, 'src' ) },
                    { find: '~', replacement: path.resolve ( projectRootDir, 'node_modules' ) }
                ],
                customResolver
            }
        ),
        resolve (
            { browser: true }
        ),
        commonjs (),
        nodePolyfills (),
        vue (
            {
                css: true
            }
        ),
        replace (
            {
                'process.env.NODE_ENV': JSON.stringify ( 'production' )
            }
        ),
        copy (
            {
                targets: [
                    { src: 'dist/demo/*.*', dest: 'docs/' }
                ]
            }
        )
    ]

};