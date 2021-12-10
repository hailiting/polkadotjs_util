import account from "./account";
// import "./bridge.js";
declare global {
  interface Window {
    PolkaWallet: any;
    PolkaWalletApi: any;
    account: any;
  }
}

window.account = account;
