/**
 *
 * @param {import('../types').RichTextNode} node
 * @returns {string}
 */
export function renderRichText(node) {
  if (!node || typeof node !== "object") return "";

  if (node.value) {
    return renderMarks(node.marks, node.value);
  }

  if (node.content && node.nodeType) {
    const content = node.content.map(renderRichText).join("");

    if (node.nodeType === "document") return content;

    if (node.nodeType === "paragraph") {
      return `<p>${content}</p>`;
    }

    if (node.nodeType.startsWith("heading")) {
      const tag = `h${node.nodeType.replace("heading-", "")}`;
      return `<${tag}>${content}</${tag}>`;
    }
  }

  return "";
}

/**
 *
 * @param {{type:string}[] | undefined} marks : ;
 * @param {string} value
 * @returns {string}
 */
function renderMarks(marks, value) {
  if (Array.isArray(marks)) {
    return marks.reduce((acc, mark) => {
      if (mark.type === "bold") {
        return `<strong>${acc}</strong>`;
      }

      if (mark.type === "italic") {
        return `<em>${acc}</em>`;
      }

      if (mark.type === "underline") {
        return `<u>${acc}</u>`;
      }

      return acc;
    }, value);
  }

  return value;
}
