import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import cleaner from 'rollup-plugin-cleaner';
import { uglify } from "rollup-plugin-uglify";

import packageJson from "./package.json";

export default {
  input: "./src/index.ts",
  output: [
    {
      file: packageJson.main,
      format: "cjs",
      sourcemap: false
    },
    {
      file: packageJson.module,
      format: "esm",
      sourcemap: false
    }
  ],
  plugins: [
    cleaner({
      targets: ['./build'],
    }),
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({
      exclude: ['**/*.stories.tsx', '**/*.test.tsx'],
    }),
    postcss({
      extract: false,
      modules: true,
      use: ['sass'],
    }), uglify()]
};