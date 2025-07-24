export function getVisualBoundingBox(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  let minX = rect.left;
  let minY = rect.top;
  let maxX = rect.right;
  let maxY = rect.bottom;

  const children: Element[] = Array.from(element.children);
  for (const child of children) {
    const style = window.getComputedStyle(child);
    if (
      style.display === 'none' ||
      style.visibility === 'hidden' ||
      style.opacity === '0'
    ) {
      continue;
    }

    const childRect = child.getBoundingClientRect();

    minX = Math.min(minX, childRect.left);
    minY = Math.min(minY, childRect.top);
    maxX = Math.max(maxX, childRect.right);
    maxY = Math.max(maxY, childRect.bottom);

    children.push(...Array.from(child.children));
  }

  return {
    left: minX,
    top: minY,
    right: maxX,
    bottom: maxY,
    width: maxX - minX,
    height: maxY - minY,
  };
}
