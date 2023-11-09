export function addStyle(
  element: HTMLElement,
  CSSStyle: Partial<CSSStyleDeclaration>,
): void {
  const style = element.style;

  for (let key in CSSStyle) {
    const styleItem = CSSStyle[key];
    if (styleItem) {
      style[key] = styleItem;
    }
  }
}
