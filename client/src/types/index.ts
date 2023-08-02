export type TWebSocketMessage = {
  type: string;
  data?: {
    users?: { [key: string]: { username: string; type: string } };
    editorContent?: string;
    userActivity: string[];
  };
}
