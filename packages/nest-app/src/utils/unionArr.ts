export default function unionArr<T, U = any>(
  arr: Array<T>,
  by: (item: T) => U,
) {
  const map = new Map<U, number>();
  for (const item of arr) {
    const the_by = by(item);
    if (map.has(the_by)) {
      map.set(the_by, map.get(the_by) + 1);
    } else {
      map.set(the_by, 1);
    }
  }

  return Array.from(map.entries());
}
