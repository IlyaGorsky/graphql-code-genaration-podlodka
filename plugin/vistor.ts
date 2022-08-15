import { ClientSideBaseVisitor } from '@graphql-codegen/visitor-plugin-common';
import { OperationDefinitionNode } from 'graphql';
import { logDebugger } from '../script/logDebugger';

// ClientSideBaseVisitor
export class MyAwesomeVisitor extends ClientSideBaseVisitor {
  getImports(options?: { excludeFragments?: boolean | undefined } | undefined): string[] {
    if (this._collectedOperations.length) {
      return [`import { useQuery } from '../hooks/useQuery';`, ...super.getImports(options)];
    }

    return super.getImports(options);
  }
  protected buildOperation(
    _node: OperationDefinitionNode,
    _documentVariableName: string,
    _operationType: string,
    _operationResultType: string,
    _operationVariablesTypes: string,
    _hasRequiredVariables: boolean
  ): string {
    logDebugger('buildOperation', [
      _node,
      _documentVariableName,
      _operationType,
      _operationResultType,
      _operationVariablesTypes,
      _hasRequiredVariables,
    ]);

    if (_operationType === 'Query') {
      const fnName = `use${_operationResultType}`;
      const options = _hasRequiredVariables ? `variables: ${_operationVariablesTypes}` : '';

      return `
        export const ${fnName} = (${options}) =>
            useQuery<${_operationResultType}, ${_operationVariablesTypes}>(${_documentVariableName}, variables)
        
        `;
    }

    return ``;
  }
}
