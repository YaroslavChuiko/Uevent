const templates = {
  EMAIL_CONFIRM: {
    subject: 'Please confirm your email',
    file: 'email-confirm.pug',
  },
  PASSWORD_CONFIRM: {
    subject: 'Please confirm your password reset',
    file: 'password-confirm.pug',
  },
  EVENT_PUBLISHED: {
    subject: 'A new event that might be interesting to you',
    file: 'event-published.pug',
  },
  NEW_EVENT_VISITOR: {
    subject: 'A new user has subscribed to your event',
    file: 'new-visitor-notification.pug',
  },
  EVENT_SUBSCRIPTION: {
    subject: 'You have subscribed to an event',
    file: 'event-subscription.pug',
  },
  EVENT_REMINDER: {
    subject: 'Your event will start soon',
    file: 'event-reminder.pug',
  },
};

export default templates;
