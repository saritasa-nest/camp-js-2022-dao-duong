/**
 * Check for null or undefined element.
 * @param val Optional type of value.
 */
export function assertNonNull<T>(val: T): asserts val is NonNullable<T> {
  if (val === undefined || val === null) {
    throw new Error(
      `Expected 'element' to be defined, but received ${val}`,
    );
  }
}
