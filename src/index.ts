import account from "./account";
import "./bridge.js";
declare global {
  interface Window {
    account: any;
  }
}

window.account = account;
