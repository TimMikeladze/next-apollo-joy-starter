import { GraphQLTypes, InputType, Selector } from '@/generated/zeus';
import { typedGql } from '@/generated/zeus/typedDocumentNode';

export const SignedInUserFragment = Selector(`User`)({
  displayName: true,
  email: true,
  image: true,
});

export type SignedInUserFragmentType = InputType<
  GraphQLTypes['User'],
  typeof SignedInUserFragment
>;

export const SignedInUserQuery = typedGql(`query`)({
  signedInUser: SignedInUserFragment,
});
