export type TWebSocketMessage = {
  type: string;
  payload: {
    users?: { [key: string]: { username: string; type: string } };
    editorContent?: string;
    usersActivity: string[];
  };
}
