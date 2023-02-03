const SEVEN_DAYS = 604800000;

export const COOKIE_OPTIONS = {
  maxAge: SEVEN_DAYS,
  httpOnly: true,
  secure: true,
  sameSite: 'none' as const,
  domain: 'localhost',
};

export const DIR_UPLOADS_NAME = "uploads";

