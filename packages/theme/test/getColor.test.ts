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
      '--code-bg-color': '#ecf4fa',
      '--arrow-bg-color': '#ccc'
    },
    dark: {
      '--text-color': '#9e9e9e',
      '--background-color': '#1e1e1e',
      '--border-color': '#151310',
      '--code-bg-color': '#282c34',
      '--arrow-bg-color': '#333'
    }
  });
});
