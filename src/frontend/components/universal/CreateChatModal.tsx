import React, { useState, useEffect, useRef } from 'react'

interface User {
  id: string
  username: string
  online: boolean
}

interface CreateChatModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: { name: string; memberIds: string[] }) => void
  friends?: User[]
}

const MOCK_FRIENDS: User[] = [
  { id: '1', username: 'alex_johnson', online: true },
  { id: '2', username: 'maria_garcia', online: false },
  { id: '3', username: 'james_lee', online: true },
  { id: '4', username: 'priya_patel', online: true },
  { id: '5', username: 'sam_wilson', online: false },
]

const CreateChatModal: React.FC<CreateChatModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  friends = MOCK_FRIENDS,
}) => {
  const [name, setName] = useState('')
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [nameError, setNameError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 50)
  }, [isOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen])

  const handleClose = () => {
    setName('')
    setSelectedIds(new Set())
    setNameError('')
    onClose()
  }

  const toggle = (id: string) =>
    setSelectedIds(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })

  const handleSubmit = () => {
    if (!name.trim()) { setNameError('Enter a room name.'); return }
    onSubmit({ name: name.trim(), memberIds: Array.from(selectedIds) })
    handleClose()
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={(e) => { if (e.target === e.currentTarget) handleClose() }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="w-full max-w-sm bg-zinc-900 rounded-2xl border border-zinc-800 flex flex-col overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800">
          <h2 id="modal-title" className="text-sm font-semibold text-zinc-100">
            Create a room
          </h2>
          <button
            onClick={handleClose}
            className="text-zinc-500 hover:text-zinc-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded"
            aria-label="Close"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-4 space-y-4">

          {/* Room name */}
          <div>
            <input
              ref={inputRef}
              type="text"
              value={name}
              onChange={e => { setName(e.target.value); setNameError('') }}
              placeholder="Room name"
              maxLength={50}
              className={`w-full bg-zinc-800 border rounded-xl px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors ${
                nameError ? 'border-red-500' : 'border-zinc-700'
              }`}
            />
            {nameError && (
              <p className="mt-1.5 text-xs text-red-400" role="alert">{nameError}</p>
            )}
          </div>

          {/* Friends */}
          <div>
            <p className="text-xs text-zinc-500 mb-2">Add members</p>
            <ul className="space-y-0.5 max-h-48 overflow-y-auto">
              {friends.map(friend => {
                const selected = selectedIds.has(friend.id)
                return (
                  <li key={friend.id}>
                    <button
                      onClick={() => toggle(friend.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                        selected ? 'bg-indigo-600/15' : 'hover:bg-zinc-800'
                      }`}
                    >
                      {/* Avatar */}
                      <div className="relative shrink-0">
                        <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center text-xs font-medium text-zinc-300">
                          {friend.username.slice(0, 2).toUpperCase()}
                        </div>
                        <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-zinc-900 ${friend.online ? 'bg-emerald-400' : 'bg-zinc-600'}`} />
                      </div>

                      <span className="flex-1 text-sm text-zinc-200 truncate">{friend.username}</span>

                      {/* Checkbox */}
                      <span className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${
                        selected ? 'bg-indigo-600 border-indigo-600' : 'border-zinc-600'
                      }`} aria-hidden="true">
                        {selected && (
                          <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                            <path d="M1.5 4.5l2 2L7.5 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-zinc-800 flex gap-2 justify-end">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-sm text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
          >
            Create
          </button>
        </div>

      </div>
    </div>
  )
}

export default CreateChatModal
