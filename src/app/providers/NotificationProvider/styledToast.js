import { toast } from 'react-toastify';

/**
 *
 * This is our styled version of Toast
 *
 * Change some style settings of Toast to fit in our project
 * example: https://codesandbox.io/s/v0lpr78prl
 */

/**
 * @docs FrontEnd // Providers // Notification Provider
 * @desc hightOrderToast - Function that creates and returns function that has custom styles set.
 *
 * @param {Function} t    This is `toast` function that is going to be used
 * @param {object} style  This is `toast` function that is going to be used
 * @returns {function}    function with style
 */
const hightOrderToast =
  (t, style) =>
  (msg, options = {}) =>
    t(msg, {
      ...options,
      ...style,
    });

const info = hightOrderToast(toast.info, {});
const success = hightOrderToast(toast.success, {});
const warn = hightOrderToast(toast.warn, {});
const error = hightOrderToast(toast.error, {});
// this is styled example
const basic = hightOrderToast(toast, {
  // className: {
  //   color: '#fff',
  //   minHeight: '60px',
  //   borderRadius: '8px',
  //   boxShadow: '2px 2px 20px 2px rgba(0,0,0,0.3)',
  // },
  // progressClassName: {
  //   background: 'purple',
  // },
});

export default { info, success, warn, error, basic };
