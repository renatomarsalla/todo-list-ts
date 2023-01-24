import { Header } from './components/Header/Header';
import { AddTask } from './components/AddTask/AddTask';
import { Task } from './components/Task/Task';
import { NoTask } from './components/NoTask/NoTask';

import './global.css';
import styles from './App.module.css';
import { useState } from 'react';

import { v4 as id } from 'uuid';

interface Tasks{
  id:string,
  content:string,
  isFinished:boolean
}

interface TasksFinished{
  id:string,
  content:string,
  isFinished:boolean
}

function App() {
  //alterei aqui, voltar para tasks
  const [tasks, setTasks] = useState<Tasks[]>([]);
  const [tasksFinished, setTaskFinished] = useState<TasksFinished[]>([]);

  function createNewTask(taskTitle:string) {
    if(taskTitle ==='' || taskTitle===' '){
      return alert('Preencha com uma tarefa válida');
    }
    setTasks([
      ...tasks,
      {
        id: id(),
        content: taskTitle,
        isFinished: false
      }
    ]);
  }

  function deleteTask(idTask:string) {
    const tasksWithoutTaskDeleted = tasks.filter(task => {
      return task.id !== idTask;
    });

    setTasks(tasksWithoutTaskDeleted);

    //filtra para aparecer as finalizadas
    const tasksFinished2 = tasksWithoutTaskDeleted.filter(task => {
      return task.isFinished === true;
    });
    setTaskFinished(tasksFinished2);
  }

  function statusTask(idTask:string) {
    //filtro a task que foi clicada
    const taskWithThisIdTask = tasks.filter(task => {
      return task.id === idTask;
    });

    //troco o status da task
    const changeStatus = taskWithThisIdTask.map(task => {
      return (task.isFinished = true);
    });

    //seto as task
    setTasks([...tasks]);

    //filtro as que estao com status true
    const tasksFinished2 = tasks.filter(task => {
      return task.isFinished === true;
    });
    //seto em um array as tasks
    setTaskFinished(tasksFinished2);
  }

  return (
    <div>
      <Header />
      <div className={styles.page}>
        <AddTask createNewTask={createNewTask} />

        <div className={styles.task}>
          <div className={styles.tasksCreatedAndFinished}>
            <div className={styles.created}>
              <span>Tarefas criadas</span>
              <span>{tasks.length}</span>
            </div>

            <div className={styles.finished}>
              <span>Concluidas</span>
              <span>{`${tasksFinished.length} de ${tasks.length}`}</span>
            </div>
          </div>
          {tasks.length === 0 && <NoTask />}
          {tasks.map(task => {
            return (
              <Task
                key={task.id}
                id={task.id}
                content={task.content}
                // isFinished={task.isFinished}
                deleteTask={deleteTask}
                statusTask={statusTask}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export { App };
