export const COMPANY_NAME_LENGTH = { min: 4, max: 100 };
export const EVENT_NAME_LENGTH = { min: 5, max: 100 };
export const FORMAT_THEME_LENGTH = { min: 4, max: 100 };
export const LATITUDE = { min: -90, max: 90 };
export const LONGITUDE = { min: -180, max: 180 };
export const COMMENT_CONTENT_LENGTH = { min: 4, max: 60000 };

export const LOGIN_LENGTH = { min: 4, max: 20 };
export const FULL_NAME_LENGTH = { min: 4, max: 30 };
export const PASSWORD_LENGTH = { min: 8, max: 20 };
export const ROLE_ENUM = ['user', 'admin'];
export const ROLE_OPTIONS = ROLE_ENUM.map((r) => ({ id: r, name: r }));

export const PROMO_CODE_LENGTH = { min: 4, max: 50 };
export const DISCOUNT = { min: 1, max: 90 };
