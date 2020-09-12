import vue      from 'rollup-plugin-vue';
import resolve  from '@rollup/plugin-node-resolve';
import replace  from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import copy     from 'rollup-plugin-copy';
import alias    from '@rollup/plugin-alias';
import path     from 'path';

const projectRootDir = path.resolve ( __dirname, '../' );

export default {

    input: 'src/component.js',

    output: [

        {

            format   : 'esm',
            file     : 'dist/component.esm.js',
            sourcemap: true

        }

    ],

    plugins: [
        resolve (),
        alias (
            {
                entries: [
                    { find: '@', replacement: path.resolve ( projectRootDir, 'src' ) },
                    { find: '~', replacement: path.resolve ( projectRootDir, 'node_modules' ) }
                ]
            }
        ),
        commonjs (),
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