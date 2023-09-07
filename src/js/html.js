/**
 * @param {TemplateStringsArray} strings
 * @param  {...unknown} values
 * @returns {string}
 */
export function html(strings, ...values) {
  return strings.reduce((acc, cur, idx) => {
    return acc + cur + (values[idx] || "");
  }, "");
}
