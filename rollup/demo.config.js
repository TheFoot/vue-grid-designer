import vue        from 'rollup-plugin-vue';
import serve      from 'rollup-plugin-serve';
import resolve    from '@rollup/plugin-node-resolve';
import replace    from '@rollup/plugin-replace';
import commonjs   from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import copy       from 'rollup-plugin-copy';
import babel      from '@rollup/plugin-babel';
import path       from 'path';
import alias      from '@rollup/plugin-alias';

const projectRootDir = path.resolve ( __dirname, '../' );

export default {

    input: 'src/demo/app.js',

    output: [

        {

            format   : 'iife',
            name     : 'demo',
            file     : 'dist/demo/app.js',
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
                needMap: false,
                css    : true
            }
        ),
        replace (
            {
                'process.env.NODE_ENV': JSON.stringify ( process.env.NODE_ENV || 'development' )
            }
        ),
        babel (
            {
                babelHelpers: 'bundled',
                exclude     : 'node_modules/**'
            }
        ),
        copy (
            {
                targets: [
                    { src: 'src/demo/index.html', dest: 'dist/demo/' }
                ]
            }
        ),
        serve (
            {
                contentBase: 'dist/demo',
                host       : 'localhost',
                port       : 3001,
                open       : true
            }
        ),
        livereload (
            {
                watch: 'dist'
            }
        )
    ]

};