import { useState } from 'react'
import { $api } from '../../api/client'
import ContactEditForm from './ContactEditForm'

export default function ContactList() {
  const [editingId, setEditingId] = useState<number | null>(null)
  const { data, isPending, isError } = $api.useQuery('get', '/api/contacts/')

  if (isPending) {
    return <p>Loading contacts...</p>
  }

  if (isError) {
    return <p role="alert">Could not load contacts.</p>
  }

  if (data.length === 0) {
    return <p>No contacts yet.</p>
  }

  return (
    <ul>
      {data.map((contact) => (
        <li key={contact.id}>
          {editingId === contact.id ? (
            <ContactEditForm
              contact={contact}
              onDone={() => setEditingId(null)}
            />
          ) : (
            <>
              <strong>{contact.name}</strong>
              {contact.phone && <span> {contact.phone}</span>}
              {contact.email && <span> {contact.email}</span>}
              <button type="button" onClick={() => setEditingId(contact.id)}>
                Edit
              </button>
            </>
          )}
        </li>
      ))}
    </ul>
  )
}