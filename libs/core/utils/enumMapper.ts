type EnumValue = string | number | symbol;
interface EnumObject {
  [key: EnumValue]: EnumValue;
}

export type EnumMapper<T extends EnumValue, R extends EnumValue> = Readonly<Record<T, R>>;

/** Check later. */
export function enumMapper<T extends EnumObject, R extends EnumObject>(enum1: T, enum2: R): R {
  const resultEnum: EnumObject = {};

  Object.keys(enum1).forEach(key => {
    resultEnum[key] = enum2[key];
  });
  return resultEnum as R;
}
