import {  type FC, type HTMLProps } from 'react';
import { Users } from '../users/Users';
import { Editor } from '../editor/Editor';
import { ConnectionHistory } from '../connection-history/ConnectionHistory';
// import styles from './EditorSection.module.css';

type TEditorSectionProps = HTMLProps<HTMLElement>;

const EditorSection: FC<TEditorSectionProps> = () => {

  return (
    <div className="main-content">
      <div className="document-holder">
        <div className="currentusers">
          <Users />
        </div>
        <Editor />
      </div>
      <div className="history-holder">
        <ConnectionHistory />
      </div>
    </div>
  );
};

export { EditorSection };
