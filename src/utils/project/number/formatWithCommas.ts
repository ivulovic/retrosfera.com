import toFixed from './formatToFixed';

const SEPARATORS = {
  THOUSAND: ',',
  DECIMAL: '.',
};

export interface IInitialOptions {
  withSign: boolean;
  maxDecimals?: number | undefined;
}

const initialOptions: IInitialOptions = {
  withSign: false,
  maxDecimals: undefined,
};

function containsOnlyZeros(str: any) {
  let isOnlyZero = true;
  const arr: Array<string> = [...str];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== '0') {
      isOnlyZero = false;
    }
  }
  return isOnlyZero;
}

export default function formatWithCommas(x: any, options = initialOptions) {
  const { withSign, maxDecimals } = options;
  var parts = x.toString().split(SEPARATORS.DECIMAL);
  if (parts[0].includes('e')) {
    return toFixed(parts[0]);
  }
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, SEPARATORS.THOUSAND);
  if (!parts[1]) {
    parts[1] = '00';
  }
  if (parts[1] && parts[1].length === 1) {
    parts[1] += '0';
  }
  if (maxDecimals !== undefined) {
    parts[1] = parts[1].slice(0, maxDecimals);
  }
  if (parts[0] === '-0' && containsOnlyZeros(parts[1])) {
    parts[0] = '0';
  }
  let prefix = '';
  if (withSign) {
    if (Math.sign(x) === 1) {
      prefix = '+';
    }
  }
  return prefix + parts.filter(x => !!x).join(SEPARATORS.DECIMAL);
}
