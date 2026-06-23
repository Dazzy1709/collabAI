export default interface User {
  id: string,
  name: string,
  avatar: string,
  online: boolean,
  lastSeen: string
};

export default interface Messages {
  id: string,
  sendId: string,
  content: string,
  dateSent: string,
};

export default interface Chatroom {
  chatId: string,
  name: string,
  members: string[],
  aiMode: boolean,
  messages: string[]
};

export default interface DirectMessages {
  id: string,
  senderId: string,
  receiverId: string,
  messages: string[]
};