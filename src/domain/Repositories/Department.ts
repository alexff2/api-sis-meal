import { Department } from '../Entities'

export interface DepartmentRepository {
  create: (department: Department) => Promise<void>
  findById: (id: number) => Promise<Department | null>
  findByName: (name: string) => Promise<Department | null>
  update: (department: Department) => Promise<void>
  maxId: () => Promise<number>
}
