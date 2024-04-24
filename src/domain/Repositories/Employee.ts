import { Employee } from '../Entities'

export interface EmployeeRepository {
  findById: (id: number) => Promise<Employee | null>
  findByName: (name: string) => Promise<Employee | null>
  create: (employee: Employee) => Promise<void>
  update: (employee: Employee) => Promise<void>
  maxId: () => Promise<number>
}
