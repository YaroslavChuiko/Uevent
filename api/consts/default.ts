const SEVEN_DAYS = 604800000;
export const HOURS_BEFORE_EVENT = 2;

export const COOKIE_OPTIONS = {
  maxAge: SEVEN_DAYS,
  httpOnly: true,
  secure: true,
  sameSite: 'none' as const,
  domain: 'localhost',
};

export const DateFormatOptions = {
  weekday: 'short',
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
} as const;

export const DIR_UPLOADS_NAME = 'uploads';
