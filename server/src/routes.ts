import { FastifyInstance } from "fastify"
import { prisma } from "./lib/prisma"
import { z } from 'zod'

interface updateTaskRequest {
  title?: string
}

export async function appRoutes(app: FastifyInstance) {
  // Listar todas tarefas
  app.get('/tasks', async () => {
    const findAllTasks = await prisma.task.findMany()
    return findAllTasks
  })

  // Criar tarefa
  app.post('/task', async(req) => {
    const createTaskBody = z.object({
      title: z.string(),
    })

    const { title } = createTaskBody.parse(req.body) 

    await prisma.task.create({
      data: {
        title: title
      }
    })

    // console.log('Tarefa criada')
  })

  // Alternar status de completo
  app.patch('/task/:id/toggle', async(req) => {
    const toggleTaskParams = z.object({
      id: z.string().uuid()
    })

    const { id } = toggleTaskParams.parse(req.params)

    const findTask = await prisma.task.findUnique({
      where: {
        id: id
      }
    })

    if (findTask) {
      if (findTask.completed === false) {
        findTask.completed = true
      } 
      else {
        findTask.completed = false
      }
    }

    await prisma.task.update({
      where: {
        id: id
      },
      data: {
        completed: findTask?.completed
      }
    })

    // console.log('Tarefa atualizada')
  })

  app.patch('/task/:id/update', async(req) => {
    const updateTaskParams = z.object({
      id: z.string().uuid()
    })

    const { id } = updateTaskParams.parse(req.params)

    const findTask = await prisma.task.findUnique({
      where: {
        id: id
      }
    })

    if (findTask) {
      const { title } = req.body as updateTaskRequest

      await prisma.task.update({
        where: {
          id: findTask.id
        },
        data: {
          title: title || findTask.title
        }
      })
    }
  })

  // Excluir tarefa
  app.delete('/task/:id', async(req) => {
    const deleteTaskParams = z.object({
      id: z.string().uuid()
    })

    const { id } = deleteTaskParams.parse(req.params)

    await prisma.task.delete({
      where: {
        id: id
      }
    })

    // console.log('Tarefa excluída')
  })
}