// @flow strict

'use strict';

const { join } = require('path');

/**
 * @fileoverview TODO
 * @author Enda Phelan
 */

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const requireIndex = require('requireindex');

// ------------------------------------------------------------------------------
// Plugin Definition
// ------------------------------------------------------------------------------


// import all rules in lib/rules
module.exports.rules = requireIndex(join(__dirname, '/rules'));



// import processors
module.exports.processors = {

    // add your processors here
};

