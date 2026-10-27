import { useState } from 'react'
import type { SubmitEvent } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { $api } from '../../api/client'

export default function ContactForm() {
  const queryClient = useQueryClient()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')

  const createContact = $api.useMutation('post', '/api/contacts/')

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
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
    <form onSubmit={handleSubmit}>
      <h2>Add a contact</h2>

      <label htmlFor="name">Name</label>
      <input
        id="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        required
      />

      <label htmlFor="phone">Phone</label>
      <input
        id="phone"
        value={phone}
        onChange={(event) => setPhone(event.target.value)}
      />

      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />

      <button type="submit" disabled={createContact.isPending}>
        {createContact.isPending ? 'Saving...' : 'Save contact'}
      </button>

      {createContact.isError && (
        <p role="alert">Could not save the contact.</p>
      )}
    </form>
  )
}