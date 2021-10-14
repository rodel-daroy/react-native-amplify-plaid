// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Account, Balance } = initSchema(schema);

export {
  Account,
  Balance
};