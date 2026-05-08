import { FormEvent, useState } from 'react'

import type { CoursePayload, Tag } from '../types'

type CourseFormProps = {
  tags: Tag[]
  onSubmit: (payload: CoursePayload) => Promise<void>
}

export function CourseForm({ tags, onSubmit }: CourseFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('0')
  const [instructorId, setInstructorId] = useState('1')
  const [selectedTagIds, setSelectedTagIds] = useState<number[]>([])
  const [error, setError] = useState<string | null>(null)

  const toggleTag = (tagId: number) => {
    setSelectedTagIds((prev) =>
      prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId],
    )
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setError(null)

    try {
      await onSubmit({
        title,
        description,
        price: Number(price),
        instructor_id: Number(instructorId),
        tag_ids: selectedTagIds,
      })
      setTitle('')
      setDescription('')
      setPrice('0')
      setSelectedTagIds([])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create course')
    }
  }

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2>Add course</h2>
      <label>
        Title
        <input value={title} onChange={(e) => setTitle(e.target.value)} required />
      </label>
      <label>
        Description
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required rows={3} />
      </label>
      <label>
        Price
        <input type="number" min={0} step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} required />
      </label>
      <label>
        Instructor ID
        <input type="number" min={1} value={instructorId} onChange={(e) => setInstructorId(e.target.value)} required />
      </label>
      <fieldset>
        <legend>Tags (dropdown-like checklist)</legend>
        <div className="tags">
          {tags.map((tag) => (
            <label key={tag.id} className="tag-option">
              <input
                type="checkbox"
                checked={selectedTagIds.includes(tag.id)}
                onChange={() => toggleTag(tag.id)}
              />
              {tag.name}
            </label>
          ))}
        </div>
      </fieldset>
      {error && <p className="error">{error}</p>}
      <button type="submit">Create</button>
    </form>
  )
}