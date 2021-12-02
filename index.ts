import AccountType from './constants';
import type Account from './types';
import * as substrate from './substrate';
import * as ethereum from './ethereum';
import * as avalanche from './avalanche';
import * as nuls2 from './nuls2';
import * as solana from './solana';

export { AccountType, substrate, ethereum, avalanche, nuls2, solana };
export type { Account };
