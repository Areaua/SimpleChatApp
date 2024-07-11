// core/module-1/actions.js

export const deleteMessage = (chatId, messageIndex) => ({
    type: 'DELETE_MESSAGE',
    payload: { chatId, messageIndex },
  });