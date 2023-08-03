import { WS_EVENTS } from './constants';

export const isUserEvent = (message: { type: string; data: string }) => {
  const evt = JSON.parse(message.data);
  return evt.type === WS_EVENTS.USER_EVENT;
};

export const isDocumentEvent = (message: { type: string; data: string }) => {
  const evt = JSON.parse(message.data);
  return evt.type === WS_EVENTS.CONTENT_CHANGE;
};
