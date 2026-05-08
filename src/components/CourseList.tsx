import type { Course } from '../types'

type CourseListProps = {
  courses: Course[]
}

export function CourseList({ courses }: CourseListProps) {
  return (
    <section className="card">
      <h2>Courses</h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Instructor</th>
              <th>Tags</th>
              <th>Students</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id}>
                <td>{course.title}</td>
                <td>{course.instructor.name}</td>
                <td>{course.tags.map((tag) => tag.name).join(', ') || '—'}</td>
                <td>{course.enrolled_count}</td>
                <td>${course.price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}