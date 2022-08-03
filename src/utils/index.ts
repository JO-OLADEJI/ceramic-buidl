import { getAddress } from "@ethersproject/address";

const isAddress = (value: any): string | false => {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
};

export const shortenAddress = (
  address: string | undefined,
  chars = 4
): string => {
  if (address) {
    const parsed = isAddress(address);
    if (!parsed) {
      throw Error(`Invalid 'address' parameter '${address}'.`);
    }
    return `${parsed.substring(0, chars + 2)}...${parsed.substring(
      42 - chars
    )}`;
  }
  return "";
};
