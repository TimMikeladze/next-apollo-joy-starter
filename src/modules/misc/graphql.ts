import { GraphQLTypes, InputType, Selector } from '@/generated/zeus';
import { typedGql } from '@/generated/zeus/typedDocumentNode';

export const AppVersionFragment = Selector(`AppVersion`)({
  commit: true,
  version: true,
});

export type AppVersionFragmentType = InputType<
  GraphQLTypes['AppVersion'],
  typeof AppVersionFragment
>;

export const AppVersionQuery = typedGql(`query`)({
  appVersion: AppVersionFragment,
});
