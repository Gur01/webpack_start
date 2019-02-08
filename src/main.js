import './scss/main.scss';

// import { hello } from './js/index.js';
// import { goodbye } from './js/index.js';
import greeting from '@/src/index.js'

// hello('hello')
// goodbye('goodbye')
greeting.goodbye('goodbye');
// console.log(greeting.concat);
const name = { name: 'john' }
const age = { age: 25 }
const concat = { ...name, ...age };
console.log(concat);

