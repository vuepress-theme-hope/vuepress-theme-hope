/* eslint-disable guard-for-in */
import * as fs from 'fs';
import { expect } from 'chai';
import { handleVar } from '../src/lib/getColor';
import { it } from 'mocha';

it('Get vars from palette.styl', () => {
  const content = fs.readFileSync('./src/styles/palette.styl', {
    encoding: 'utf-8'
  });
  expect(handleVar(content)).to.be.deep.equal({
    '--accent-color': '#3eaf7c',
    light: {
      '--text-color': '#2c3e50',
      '--background-color': '#fff',
      '--border-color': '#eaecef',
      '--box-shadow-color': '#f0f1f2',
      '--card-shadow-color': 'rgba(0, 0, 0, 0.15)',
      '--code-bg-color': '#ecf4fa',
      '--arrow-bg-color': '#ccc'
    },
    dark: {
      '--text-color': '#9e9e9e',
      '--background-color': '#1e1e1e',
      '--border-color': '#302d28',
      '--box-shadow-color': '#0f0e0d',
      '--card-shadow-color': '#0f0e0d',
      '--code-bg-color': '#282c34',
      '--arrow-bg-color': '#333'
    }
  });
});
