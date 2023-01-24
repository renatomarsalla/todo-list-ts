import styles from './AddTask.module.css';

import { PlusCircle } from 'phosphor-react';
import { ChangeEvent, useState } from 'react';

interface NewTask{
  createNewTask:(newTask:string)=>void
}

function AddTask({ createNewTask }:NewTask) {
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    createNewTask(newTaskTitle);
    setNewTaskTitle('');
  }

  function handleGetTextInput(event:ChangeEvent<HTMLInputElement>) {
    setNewTaskTitle(event.target.value);
  }

  return (
    <div className={styles.addTask}>
      <input type="text" onChange={handleGetTextInput} value={newTaskTitle} />
      <button onClick={handleCreateNewTask}>
        Criar
        <PlusCircle size={20} />
      </button>
    </div>
  );
}

export { AddTask };
