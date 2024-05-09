import { makeListDepartment } from '@/http/factories/department/makeListDepartments'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function listAll(_request: FastifyRequest, reply: FastifyReply) {
  try {
    const listDepartmentUseCase = makeListDepartment()

    const departments = await listDepartmentUseCase.execute()

    return reply.status(200).send(departments)
  } catch (error) {
    console.log(error)

    return reply.status(400).send('Internal Error')
  }
}
