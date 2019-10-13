// 提取指定类型的字段，生成联合类型
export type PickTypeFields<T, P> = {
    [K in keyof T]: T[K] extends P ? K : never;
}[keyof T];

// 排除指定类型的字段，生成联合类型
export type OmitTypeFields<T, P> = {
    [K in keyof T]: T[K] extends P ? never : K;
}[keyof T];

// 获取值为指定类型的集合
export type PickType<T, P> = Pick<T, PickTypeFields<T, P>>;

// 排除值为指定类型的集合
export type OmitType<T, P> = Pick<T, OmitTypeFields<T, P>>;

// 获取可选字段
export type PickOptional<T> = Pick<T, { [K in keyof T]-?: {} extends { [P in K]: T[K] } ? K : never }[keyof T]>;
