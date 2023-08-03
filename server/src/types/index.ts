// Event types
export enum WS_EVENTS {
  USER_EVENT = 'ws-user-event',
  CONTENT_CHANGE ='ws-editor-event',
};

export interface IUser {
  username: string;
}


export interface IClientMessage {
  type: WS_EVENTS;
  data: {
    user?: IUser;
    editorContent?: string;
  }
}

export interface IResponseMessage {
  type: WS_EVENTS;
  data: {
    users?: {[key: string]: { username: string; id: string }};
    editorContent?: string;
    usersActivity?: string[]
  }
}