/* eslint-disable graphql/annotate-internal-functions */
// @noflow

'use strict';

const { isFunctionPublic, isFunctionAnnotated } = require('../utils/fileUtils');

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'disallow unannotated internal functions',
      recommended: false,
    },
  },
  create(context) {
    function reportIfInternal(node) {
      const parent = node.parent;
      const sourceCode = context.getSourceCode();
      const jsDocs = sourceCode.getJSDocComment(node);
      // const projectRoot = process.cwd();
      const filename = context.getFilename();

      if (parent.type === 'ExportNamedDeclaration') {
        const isPublic = isFunctionPublic(node, filename);
        const isAnnotated = isFunctionAnnotated(jsDocs);
        
        if (!isPublic && !isAnnotated) {
          context.report({
            node,
            message: 'Internal functions should be annotated with `@internal`',
          });
        }
      }
    }

    return {
      FunctionDeclaration: reportIfInternal,
    };
  },
};
