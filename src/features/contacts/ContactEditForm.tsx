import { useState } from 'react'
import type { SubmitEvent } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { $api } from '../../api/client'
import { ContactSchema } from './ContactSchema'

interface ContactEditFormProps {
  contact: {
    id: number
    name: string
    phone?: string
    email?: string
  }
  onDone: () => void
}

export default function ContactEditForm({
  contact,
  onDone,
}: ContactEditFormProps) {
  const queryClient = useQueryClient()
  const [name, setName] = useState(contact.name)
  const [phone, setPhone] = useState(contact.phone ?? '')
  const [email, setEmail] = useState(contact.email ?? '')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const updateContact = $api.useMutation('patch', '/api/contacts/{id}/')

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

    updateContact.mutate(
      {
        params: { path: { id: String(contact.id) } },
        body: { name, phone, email },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['get', '/api/contacts/'] })
          onDone()
        },
      },
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <label htmlFor="edit-name">Name</label>
      <input
        id="edit-name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      {errors.name && <p>{errors.name}</p>}

      <label htmlFor="edit-phone">Phone</label>
      <input
        id="edit-phone"
        value={phone}
        onChange={(event) => setPhone(event.target.value)}
      />
      {errors.phone && <p>{errors.phone}</p>}

      <label htmlFor="edit-email">Email</label>
      <input
        id="edit-email"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      {errors.email && <p>{errors.email}</p>}

      <button type="submit" disabled={updateContact.isPending}>
        {updateContact.isPending ? 'Saving...' : 'Save changes'}
      </button>
      <button type="button" onClick={onDone}>
        Cancel
      </button>

      {updateContact.isError && (
        <p role="alert">Could not update the contact.</p>
      )}
    </form>
  )
}