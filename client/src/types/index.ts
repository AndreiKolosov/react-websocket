export type TWebSocketMessage = {
  type: string;
  payload: {
    users?: { [key: string]: { username: string; id: string } };
    editorContent?: string;
    usersActivity: string[];
  };
}
