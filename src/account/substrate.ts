import { Keyring } from "@polkadot/keyring";
import { KeyringPair } from "@polkadot/keyring/types";
import { ApiPromise, WsProvider } from "@polkadot/api";
import {
  cryptoWaitReady,
  mnemonicGenerate,
  mnemonicToMiniSecret,
} from "@polkadot/util-crypto";
import AccountType from "./constants";
import { BaseMessage } from "../message/types";
import { SignerOptions } from "@polkadot/api/submittable/types";
import { Buffer } from "buffer";
const a = () => {
  console.log(111);
};

export type DOTAccount = {
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
export type DOTAccountImportConfiguration = {
  privateKey?: string;
  mnemonic?: string;
  format?: number;
  name?: string;
};
// 导入钱包
export async function importAccount({
  privateKey = undefined,
  mnemonic = undefined,
  format = 42,
  name,
}: DOTAccountImportConfiguration = {}): Promise<DOTAccount> {
  await cryptoWaitReady();
  const keyring = new Keyring({ type: "sr25519", ss58Format: format });
  let pair: KeyringPair | null = null;
  if (mnemonic) {
    pair = keyring.createFromUri(mnemonic, { name: "sr25519" });
  } else if (privateKey) {
    pair = keyring.createFromUri(privateKey, { name: "sr25519" });
  }
  if (!pair) {
    throw new Error("could not import account, error while imported keypair");
  }
  const account: DOTAccount = {
    keyring,
    private_key: privateKey,
    public_key: Buffer.from(pair.publicKey).toString("hex"),
    mnemonic,
    address: pair.address,
    address_format: format,
    type: AccountType.SUBSTRATE,
    source: "integrated",
    signer: pair,
    name: pair.address,
  };
  if (mnemonic) {
    account.private_key = `0x${Buffer.from(
      mnemonicToMiniSecret(mnemonic)
    ).toString("hex")}`;
  }
  if (name) {
    account.name = name;
  }
  return account;
}
export async function newAccount({ format = 42 } = {}): Promise<DOTAccount> {
  const mnemonic = mnemonicGenerate();
  return importAccount({
    mnemonic,
    format,
  });
}

function getVerificationBuffer(msg: BaseMessage) {
  return Buffer.from(
    `${msg.chain}\n${msg.sender}\n${msg.type}\n${msg.item_hash}`
  );
}
export function sign(account: DOTAccount, msg: BaseMessage): BaseMessage {
  const buffer = getVerificationBuffer(msg);
  let { signer } = account;
  const localMessage = msg;
  if (!(signer && signer.sign)) {
    const keyring = new Keyring({
      type: "sr25519",
    });
    if (account.mnemonic) {
      signer = keyring.createFromUri(account.mnemonic, {
        name: "sr25519",
      });
    } else if (account.private_key) {
      signer = keyring.createFromUri(account.private_key, {
        name: "sr25519",
      });
    }
  }

  if (signer) {
    const signed = `0x${Buffer.from(signer.sign(buffer)).toString("hex")}`;

    localMessage.signature = JSON.stringify({
      curve: "sr25519",
      data: signed,
    });
    return localMessage;
  }
  throw new Error("could not sign message, signer is invalid");
}

// https://github.com/figment-networks/learn-web3-dapp/blob/ff05e2bebea47757205692985d85cd987a6c4558/pages/api/polkadot/transfer.ts
// https://github.com/paritytech/parity-bridges-ui/blob/80fcb34605d1d8cf9a99a52355d1a44246b0bede/src/hooks/api/useApiCalls.ts
// https://github.com/Joystream/joystream/blob/c38e08f820cd3b7b46fab739a41fa5eac0f6ebd5/tests/network-tests/src/Api.ts
// https://github.com/meziaris/debio-backend-test/blob/445172251a786a23a3e1bfd31b7b6b09871bb7af/src/substrate/substrate.service.ts
// 交易
export async function transfer(
  mnemonic: string,
  recipientAddr: string,
  txAmount: string
) {
  console.log({ mnemonic, recipientAddr, txAmount });
  let provider: WsProvider;
  try {
    provider = new WsProvider("wss://westend-rpc.polkadot.io/");
    const api = await ApiPromise.create({ provider: provider });
    const keyring = new Keyring({ type: "sr25519" });
    const account = keyring.addFromUri(mnemonic);
    console.log(111);
    const options: Partial<SignerOptions> = {
      nonce: -1,
    };
    const [tokenDecimals] = api.registry.chainDecimals;
    const transfer = api.tx.balances.transfer(
      recipientAddr,
      (Number(txAmount) * Math.pow(10, tokenDecimals)).toString()
    );
    console.log(222);
    const hash = await transfer.signAndSend(account, { ...options });
    console.log(333);
    await provider.disconnect();
    console.log(444);
    return {
      hash: hash.toString(),
      status: 200,
    };
  } catch (error) {
    console.log(555);
    if (provider) {
      await provider.disconnect();
    }
    console.log(666);
    let errorMessage = error instanceof Error ? error.message : "Unknown Error";
    console.log(777);
    return {
      msg: errorMessage,
      status: 500,
    };
  }
}
export { a };
