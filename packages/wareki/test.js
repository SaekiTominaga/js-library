import Wareki from './dist/Wareki.js';

const wareki = new Wareki('2000');

console.debug(wareki.getYearParts({ era: 'narrow' }));
