export function createCursor(startY: number) {
  let y = startY;

  return {
    getY: () => y,
    moveDown: (amount: number) => {
      y -= amount;
    },
  };
}
