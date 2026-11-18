import { useState } from 'react'
import type { SubmitEvent } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { $api } from '../../api/client'
import { ContactSchema } from './ContactSchema'

export default function ContactForm() {
  const queryClient = useQueryClient()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const createContact = $api.useMutation('post', '/api/contacts/')

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()

    const result = ContactSchema.safeParse({ name, phone, email })

    if (!result.success) {
      const next: Record<string, string> = {}
      for (const issue of result.error.issues) {
        const field = String(issue.path[0])
        if (!(field in next)) next[field] = issue.message
      }
      setErrors(next)
      return
    }

    setErrors({})

    createContact.mutate(
      { body: { name, phone, email } },
      {
        onSuccess: () => {
          setName('')
          setPhone('')
          setEmail('')
          queryClient.invalidateQueries({ queryKey: ['get', '/api/contacts/'] })
        },
      },
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h2>Add a contact</h2>

      <label htmlFor="name">Name</label>
      <input
        id="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      {errors.name && <p>{errors.name}</p>}

      <label htmlFor="phone">Phone</label>
      <input
        id="phone"
        value={phone}
        onChange={(event) => setPhone(event.target.value)}
      />
      {errors.phone && <p>{errors.phone}</p>}

      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      {errors.email && <p>{errors.email}</p>}

      <button type="submit" disabled={createContact.isPending}>
        {createContact.isPending ? 'Saving...' : 'Save contact'}
      </button>

      {createContact.isError && (
        <p role="alert">Could not save the contact.</p>
      )}
    </form>
  )
}