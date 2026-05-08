export type Instructor = {
  id: number
  name: string
  bio?: string
  email: string
}

export type Tag = {
  id: number
  name: string
}

export type Course = {
  id: number
  title: string
  description: string
  price: number
  created_at: string
  instructor: Instructor
  tags: Tag[]
  enrolled_count: number
}

export type CoursePayload = {
  title: string
  description: string
  price: number
  instructor_id: number
  tag_ids: number[]
}

export type AuthPayload = {
  email: string
  password: string
}

export type RegisterPayload = AuthPayload & {
  name: string
}