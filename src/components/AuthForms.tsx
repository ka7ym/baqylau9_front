import { FormEvent, useState } from 'react'

import { isValidEmail, minLength } from '../utils/validation'

type AuthFormProps = {
  title: string
  includeName?: boolean
  onSubmit: (payload: { name?: string; email: string; password: string }) => Promise<void>
}

export function AuthForm({ title, includeName = false, onSubmit }: AuthFormProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setError(null)

    if (includeName && !minLength(name, 2)) {
      setError('Name must be at least 2 characters')
      return
    }

    if (!isValidEmail(email)) {
      setError('Email format is invalid')
      return
    }

    if (!minLength(password, 6)) {
      setError('Password must be at least 6 characters')
      return
    }

    setBusy(true)
    try {
      await onSubmit(includeName ? { name, email, password } : { email, password })
      setName('')
      setEmail('')
      setPassword('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected error')
    } finally {
      setBusy(false)
    }
  }

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2>{title}</h2>
      {includeName && (
        <label>
          Name
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
        </label>
      )}
      <label>
        Email
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="mail@example.com" />
      </label>
      <label>
        Password
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="******" />
      </label>
      {error && <p className="error">{error}</p>}
      <button type="submit" disabled={busy}>
        {busy ? 'Please wait...' : title}
      </button>
    </form>
  )
}