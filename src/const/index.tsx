import { useState, useEffect } from "react";

// export const accountsApi = new AccountsApi(CONFIG_BC_S);
// export const transactionsAPI = new TransactionsApi(CONFIG_BC_S);
// export const smartContractAPI = new SmartContractsApi(CONFIG_BC_S);
// export const blocksAPI = new BlocksApi(CONFIG_BC_S);

export const isMobile = (() => {
  if (
    typeof navigator === "undefined" ||
    typeof navigator.userAgent !== "string"
  ) {
    return false;
  }
  return /Mobile/.test(navigator.userAgent);
})();

export function classNames(...classes: (false | null | undefined | string)[]) {
  return classes.filter(Boolean).join(" ");
}
