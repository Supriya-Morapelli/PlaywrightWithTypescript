module.exports = {
 default: [
   '--require-module ts-node/register', 
   '--require steps/**/*.ts',
   '--require support/hooks.ts',
   '--require support/world.ts',
   //'--retry 1'
  // '--format progress', 
   //'tests/features/**/*.feature' 
 ].join(' ')
};
