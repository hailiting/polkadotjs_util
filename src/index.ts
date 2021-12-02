import account from "./account";

declare global {
  interface Window {
    account: any;
  }
}

window.account = account;
