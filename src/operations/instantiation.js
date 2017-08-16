export const OBJECT = (initials) => {
};

export const FUNCTION = (code) => {
};

export const STRING = (chars) => {

  return struct.Primitive(TYPES.STRING, chars);
};

export const NUMBER = (v) => {

  return struct.Primitive(TYPES.NUMBER, v);
};

export const NEW = ($, ...args) => {

  return $.Reflect.construct(args, $);
};
