import { Department, DepartmentProps } from '../Entities'

export interface DepartmentRepository {
  findAll: () => Promise<DepartmentProps[] | []>
  findById: (id: number) => Promise<DepartmentProps | null>
  findByName: (name: string) => Promise<DepartmentProps[] | []>
  create: (department: Department) => Promise<void>
  update: (department: Department) => Promise<void>
  maxId: () => Promise<number>
}
