import { useEffect, useState } from 'react'

import { createCourse, listCourses, listTags } from '../api/courses'
import type { Course, CoursePayload, Tag } from '../types'

export function useAppStore() {
  const [courses, setCourses] = useState<Course[]>([])
  const [tags, setTags] = useState<Tag[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadInitialData = async () => {
    setLoading(true)
    setError(null)
    try {
      const [coursesData, tagsData] = await Promise.all([listCourses(), listTags()])
      setCourses(coursesData)
      setTags(tagsData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected error')
    } finally {
      setLoading(false)
    }
  }

  const addCourse = async (payload: CoursePayload) => {
    const created = await createCourse(payload)
    setCourses((prev) => [created, ...prev])
  }

  useEffect(() => {
    loadInitialData()
  }, [])

  return {
    courses,
    tags,
    loading,
    error,
    addCourse,
    refresh: loadInitialData,
  }
}