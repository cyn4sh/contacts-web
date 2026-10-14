import { $api } from '../../api/client'

export default function ContactList() {
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
          <strong>{contact.name}</strong>
          {contact.phone && <span> {contact.phone}</span>}
          {contact.email && <span> {contact.email}</span>}
        </li>
      ))}
    </ul>
  )
}