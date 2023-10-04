function style(value: string | string[]) {
  if (typeof value === "string") value = [value];
  return <style dangerouslySetInnerHTML={{ __html: value.join("") }} />;
}

export function css(strings: TemplateStringsArray, ...args: unknown[]) {
  const value = strings.reduce((p, str, i) => {
    return p + str + (args[i] || "");
  }, "");

  return style(value);
}
