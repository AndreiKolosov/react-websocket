import { type FC, type HTMLProps } from 'react';
import { Users } from '../users/Users';
import { Document } from '../document/Document';
import { History } from '../history/History';
// import styles from './EditorSection.module.css';

type TEditorSectionProps = HTMLProps<HTMLElement>;

const EditorSection: FC<TEditorSectionProps> = () => {
  return (
    <div className="main-content">
      <div className="document-holder">
        <div className="currentusers">
          <Users />
        </div>
        <Document />
      </div>
      <div className="history-holder">
        <History />
      </div>
    </div>
  );
};

export { EditorSection };
