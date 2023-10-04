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

export function htmlResponse(body: string, status = 200) {
  return new Response("<!DOCTYPE html>" + body, {
    status,
    headers: { "content-type": "text/html" }
  });
}
