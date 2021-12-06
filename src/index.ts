import account from "./account";
// import "./bridge.js";
declare global {
  interface Window {
    PolkaWallet: any;
    account: any;
  }
}

window.account = account;
