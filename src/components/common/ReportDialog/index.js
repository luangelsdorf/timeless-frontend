import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Close from '@mui/icons-material/Close';
import React from 'react';
import styles from './ReportDialog.module.scss';
import { getDuration } from 'src/util/helpers';

export default function ReportDialog({ handleClose, open, report }) {
  return (
    <Dialog fullScreen keepMounted open={open} onClose={handleClose}>
      <div className={styles.bar}>
        <div>
          <div>
            <IconButton edge="start" color="inherit" onClick={handleClose}>
              <Close />
            </IconButton>
            <DialogTitle>Resultados do Relatório</DialogTitle>
          </div>
        </div>
      </div>
      <DialogContent>
        <div className={styles.content}>
          {
            report.length !== 0 ? (
              report.map(rep => {
                return (
                  <div>
                    <h1>{`Relatório - ${rep.reportCategory.name}`}</h1>
                    <div>
                      Analisando um total de
                      <strong> {rep.totalTask}</strong> tarefa(s), das quais
                      <strong> {rep.completedTasks}</strong> estão <span className={styles.completed}>completas</span> e
                      <strong> {rep.incompletedTasks}</strong> estão <span className={styles.incompleted}>incompletas</span>
                    </div>
                    <h2>Dados Pomodoro</h2>
                    <div>Tempo gasto em foco: {getDuration(rep.focusMinutes)}</div>
                    <div>Tempo gasto em descanso: {getDuration(rep.restMinutes + rep.longRestMinutes)}</div>
                    <div>Tarefa mais executada: {rep.longTask ? rep.longTask.name : 'Nenhuma'}</div>
                    <div>Tempo gasto na tarefa mais executada: {getDuration(rep.timeInLongTask)}</div>

                    <h2>Dados Tarefa Simples</h2>
                    <div>Tempo dedicado à tarefas simples: {getDuration(rep.taskTime)}</div>
                  </div>
                )
              })
            ) : null
          }
        </div>
      </DialogContent>
    </Dialog>
  )
}
