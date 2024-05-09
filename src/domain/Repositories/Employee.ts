import { Employee, EmployeeProps } from '../Entities'

export interface EmployeeRepository {
  findById: (id: number) => Promise<EmployeeProps | null>
  findByName: (name: string) => Promise<EmployeeProps[] | []>
  findByDepartment: (departmentId: number) => Promise<EmployeeProps[] | []>
  create: (employee: Employee) => Promise<void>
  update: (employee: Employee) => Promise<void>
  maxId: () => Promise<number>
}
