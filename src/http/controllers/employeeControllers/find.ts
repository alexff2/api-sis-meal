import { EmployeeProps } from '@/domain/Entities'
import { makeFindByDepartment } from '@/http/factories/employee/makeFindByDepartment'
import { makeFindById } from '@/http/factories/employee/makeFindById'
import { makeFindByName } from '@/http/factories/employee/makeFindByName'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function find(request: FastifyRequest, reply: FastifyReply) {
  try {
    const findEmployeeQuerySchema = z.object({
      type: z.enum(['name', 'department', 'code']),
      search: z.string(),
    })

    const { type, search } = findEmployeeQuerySchema.parse(request.query)

    let result: EmployeeProps[] | []

    result = []

    if (type === 'code') {
      const findById = makeFindById()

      const resultFindById = await findById.execute(Number(search))
      result = resultFindById ? [resultFindById] : []
    }

    if (type === 'name') {
      const findByName = makeFindByName()

      result = await findByName.execute(search)
    }

    if (type === 'department') {
      const findByDepartment = makeFindByDepartment()

      result = await findByDepartment.execute(Number(search))
    }

    return reply.status(200).send(result)
  } catch (error) {
    console.log(error)

    return reply.status(400).send('Internal Error')
  }
}
