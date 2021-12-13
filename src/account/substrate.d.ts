import { Keyring } from "@polkadot/keyring";
import { KeyringPair } from "@polkadot/keyring/types";
import AccountType from "./constants";
import { BaseMessage } from "../message/types";
export declare type DOTAccount = {
    keyring: Keyring;
    public_key: string;
    private_key?: string;
    mnemonic?: string;
    address: string;
    address_format: number;
    type: AccountType;
    source: string;
    signer: KeyringPair;
    name: string;
};
export declare type DOTAccountImportConfiguration = {
    privateKey?: string;
    mnemonic?: string;
    format?: number;
    name?: string;
};
export declare function importAccount(privateKey: any, mnemonic: any, format: number, name?: string): Promise<DOTAccount>;
export declare function newAccount({ format }?: {
    format?: number;
}): Promise<DOTAccount>;
export declare function sign(account: DOTAccount, msg: BaseMessage): BaseMessage;
export declare function getApi(wsprovider: string): Promise<{
    msg: string;
    status: number;
}>;
export declare function transfer(mnemonic: string, recipientAddr: string, txAmount: string, tip: string, format: number, wsprovider: string, fn?: any): Promise<{
    hash: any;
    status: number;
    msg?: undefined;
} | {
    msg: string;
    status: number;
    hash?: undefined;
}>;
