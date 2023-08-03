import { type FC, type HTMLProps } from 'react';
import { Users } from '../users/Users';
import { Editor } from '../editor/Editor';
import { ConnectionHistory } from '../connection-history/ConnectionHistory';
import styles from './EditorSection.module.css';

type TEditorSectionProps = HTMLProps<HTMLElement>;

const EditorSection: FC<TEditorSectionProps> = () => {
  return (
    <section aria-label="Editor" className={styles.section}>
      <Users className={styles.section__users} />
      <Editor className={styles.section__editor} />
      <ConnectionHistory className={styles.section__history} />
    </section>
  );
};

export { EditorSection };
