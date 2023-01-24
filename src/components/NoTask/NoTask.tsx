import styles from './NoTask.module.css';

import { ListChecks } from 'phosphor-react';

function NoTask() {
  return (
    <div className={styles.noTask}>
      <ListChecks size={56} />

      <strong>Você ainda não tem tarefas cadastradas</strong>
      <span>Crie tarefas e organize seus itens a fazer</span>
    </div>
  );
}

export { NoTask };
