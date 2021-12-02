# polkadotjs util

## 目的

### 1. 创建钱包

APP 点击确认创建按钮时，与 JS 交互（传入交易密码），JS 返回“助记词+地址+私钥+公钥”给 App

- 助记词 mnemonic
- 地址 address
- 私钥 privateKey
- 公钥 publicKey

```ts
const {
  mnemonicGenerate,
  mnemonicToMiniSecret,
  naclKeypairFromSeed,
} = require("@polkadot/util-crypto");

(async () => {
  const mnemonic = mnemonicGenerate(12);
  const seed = mnemonicToMiniSecret(mnemonic);
  const { publicKey, secretKey } = naclKeypairFromSeed(seed);

  console.log(`Mnemonic: ${mnemonic}`);
  console.log(`PublicKey: ${new Buffer.from(publicKey).toString("hex")}`);
  console.log(`PrivateKey: ${new Buffer.from(secretKey).toString("hex")}`);
})();

import { Keyring } from "@polkadot/api";
import {
  cryptoWaitReady,
  mnemonicGenerate,
  base64Decode,
  mnemonicToMiniSecret,
} from "@polkadot/util-crypto";
import { u8aToHex } from "@polkadot/util";

// Account prefix of SR25519 accounts (0 - Polkadot / 2 - Kusama / 42 - Generic Substrate)
const accountPrefix = 42;

const createAccount = async () => {
  // Initialize WASM
  await cryptoWaitReady();

  // Create a keyring instance with type SR25519 and given prefix
  const keyring = new Keyring({ type: "sr25519", ss58Format: accountPrefix });

  // Generate mnemonic seed
  const mnemonic = mnemonicGenerate();

  // Extract private key from mnemonic
  const privateKey = u8aToHex(mnemonicToMiniSecret(mnemonic));

  // Create account (keypairs or pair) from mnemonic
  const pair = keyring.createFromUri(mnemonic, { name: "sr25519" });

  // Log information
  console.log(`Account mnemonic is: ${mnemonic}`);
  console.log(`Account private key is: ${privateKey}`);
  console.log(`Account address is: ${pair.address}\n`);

  return [
    mnemonic,
    Buffer.from(pair.publicKey).toString("hex"),
    privateKey,
    pair.address,
  ];
};
```
