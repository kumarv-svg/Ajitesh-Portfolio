
(() => {
  const elements = document.querySelectorAll('*');
  const overflowing = [];
  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.right > 395) {
      overflowing.push({
        tag: el.tagName,
        id: el.id,
        className: el.className,
        right: Math.round(rect.right),
        width: Math.round(rect.width)
      });
    }
  });
  console.log('OVERFLOWING_COUNT:', overflowing.length);
  overflowing.slice(0, 15).forEach(o => console.log('OVERFLOW:', JSON.stringify(o)));
})();
