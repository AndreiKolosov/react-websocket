export const isUserEvent = (message: { type: string; data: string }) => {
  const evt = JSON.parse(message.data);
  return evt.type === 'userevent';
};

export const isDocumentEvent = (message: { type: string; data: string }) => {
  const evt = JSON.parse(message.data);
  return evt.type === 'contentchange';
};
