import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Account {
  readonly id: string;
  readonly account_id: string;
  readonly mask?: string;
  readonly name?: string;
  readonly official_name?: string;
  readonly subtype?: string;
  readonly type?: string;
  constructor(init: ModelInit<Account>);
  static copyOf(source: Account, mutator: (draft: MutableModel<Account>) => MutableModel<Account> | void): Account;
}

export declare class Balance {
  readonly id: string;
  readonly available?: number;
  readonly current?: number;
  readonly iso_currency_code?: string;
  readonly limit?: number;
  readonly unofficial_currency_code?: string;
  constructor(init: ModelInit<Balance>);
  static copyOf(source: Balance, mutator: (draft: MutableModel<Balance>) => MutableModel<Balance> | void): Balance;
}