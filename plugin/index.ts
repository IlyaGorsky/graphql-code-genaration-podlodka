import { Types, PluginValidateFn, PluginFunction, oldVisit } from '@graphql-codegen/plugin-helpers';
import { LoadedFragment, RawClientSideBasePluginConfig } from '@graphql-codegen/visitor-plugin-common';
import { concatAST, DocumentNode, FragmentDefinitionNode, Kind, visit } from 'graphql';
import { logDebugger } from '../script/logDebugger';
import { MyAwesomeVisitor } from './vistor';
// const allAst =
//  allFragments:
//  visitor = new UrqlVisitor(schema, allFragments, config);
//  visitorResult = oldVisit(allAst, { leave: visitor });

// return {
//   prepend: visitor.getImports(),
//   content: [visitor.fragments, ...visitorResult.definitions.filter(t => typeof t === 'string')].join('\n'),
// };

declare type VisitFn = typeof visit;
declare type NewVisitor = Partial<Parameters<VisitFn>[1]>;
declare type OldVisitor = {
  enter?: Partial<Record<keyof NewVisitor, NonNullable<NewVisitor[keyof NewVisitor]>['enter']>>;
  leave?: Partial<Record<keyof NewVisitor, NonNullable<NewVisitor[keyof NewVisitor]>['leave']>>;
} & NewVisitor;

export const plugin: PluginFunction = (schema, documents, config: RawClientSideBasePluginConfig, info) => {
  const prePareDocuments = documents
    .filter(({ document }) => Boolean(document))
    .map(({ document }) => document) as DocumentNode[];
  const allAst = concatAST(prePareDocuments);
  const fragments = allAst.definitions.filter(
    (def) => def.kind === Kind.FRAGMENT_DEFINITION
  ) as FragmentDefinitionNode[];
  const allFragments: LoadedFragment[] = fragments.map(
    (fragment) => ({
      name: fragment.name.value,
      onType: fragment.typeCondition.name.value,
      node: fragment,
      isExternal: false,
    }),
    ...(config.externalFragments || [])
  );
  const visitor = new MyAwesomeVisitor(schema, allFragments, config, {}, documents);
  const visitorResult = oldVisit(allAst, { leave: visitor as OldVisitor['leave'] });
  //   logDebugger('visitor', visitor.fragments);
  //   logDebugger('plugin', [schema, documents, config, info]);

  return {
    prepend: visitor.getImports(),
    content: [visitor.fragments, ...visitorResult.definitions.filter((t: unknown) => typeof t === 'string')].join('\n'),
  };
};
