import { useState, useRef, useEffect } from "react";

interface User {
  id: string;
  username: string;
  avatarUrl?: string;
  isOnline: boolean;
  isFriend: boolean;
}

interface FriendSearchBarProps {
  onSearch?: (query: string) => void;
  results?: User[];
  isLoading?: boolean;
  onAddFriend?: (userId: string) => void;
  onMessageFriend?: (userId: string) => void;
}

function Avatar({ username, avatarUrl, isOnline }: { username: string; avatarUrl?: string; isOnline: boolean }) {
  return (
    <div className="relative shrink-0">
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={username}
          className="w-9 h-9 rounded-full object-cover"
        />
      ) : (
        <div className="w-9 h-9 rounded-full bg-indigo-500 dark:bg-indigo-600 flex items-center justify-center text-white text-sm font-semibold select-none">
          {username[0].toUpperCase()}
        </div>
      )}
      <span
        className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white dark:border-gray-900 ${
          isOnline ? "bg-emerald-500" : "bg-gray-400"
        }`}
        aria-label={isOnline ? "Online" : "Offline"}
      />
    </div>
  );
}

// Mock data for demonstration
const MOCK_USERS: User[] = [
  { id: "1", username: "alex_torres", isOnline: true, isFriend: false },
  { id: "2", username: "jamie_lee", isOnline: false, isFriend: true },
  { id: "3", username: "morgan_k", isOnline: true, isFriend: false },
  { id: "4", username: "riley_chen", isOnline: true, isFriend: true },
  { id: "5", username: "avery_smith", isOnline: false, isFriend: false },
];

export default function SearchingUser({
  onSearch,
  results,
  isLoading = false,
  onAddFriend,
  onMessageFriend,
}: FriendSearchBarProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [friendStates, setFriendStates] = useState<Record<string, boolean>>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Use mock results if none provided
  const filteredMock = query.trim()
    ? MOCK_USERS.filter((u) =>
        u.username.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const displayResults = results ?? filteredMock;
  const showDropdown = isOpen && query.trim().length > 0;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setQuery(value);
    setIsOpen(true);
    onSearch?.(value);
  }

  function handleClear() {
    setQuery("");
    setIsOpen(false);
    inputRef.current?.focus();
  }

  function handleAddFriend(userId: string) {
    setFriendStates((prev) => ({ ...prev, [userId]: true }));
    onAddFriend?.(userId);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-sm " onKeyDown={handleKeyDown}>
      {/* Search Input */}
      <div
        className={`flex items-center gap-2 px-1.5 py-2 rounded-lg border transition-colors
          bg-white dark:bg-gray-900
          border-gray-200 dark:border-gray-700
          ${isOpen && query ? "ring-2 ring-indigo-500/30 border-indigo-400 dark:border-indigo-500" : ""}
        `}
      >
        {/* Search icon */}
        <svg
          className="w-4 h-4 text-gray-400 shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
        </svg>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={() => setIsOpen(true)}
          placeholder="Search friends..."
          className="flex-1 bg-transparent text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 outline-none min-w-0"
          aria-label="Search for friends"
          aria-expanded={showDropdown}
          aria-haspopup="listbox"
          role="combobox"
          autoComplete="off"
        />

        {/* Clear button */}
        {query && (
          <button
            onClick={handleClear}
            className="shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Clear search"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <div
          role="listbox"
          aria-label="Search results"
          className="absolute z-50 mt-1.5 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg overflow-hidden"
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2 py-6 text-sm text-gray-500 dark:text-gray-400">
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Searching...
            </div>
          ) : displayResults.length === 0 ? (
            <div className="py-6 text-center text-sm text-gray-500 dark:text-gray-400">
              No users found for <span className="font-medium text-gray-700 dark:text-gray-300">"{query}"</span>
            </div>
          ) : (
            <ul className="divide-y divide-gray-100 dark:divide-gray-800 max-h-72 overflow-y-auto">
              {displayResults.map((user) => {
                const alreadyFriend = friendStates[user.id] || user.isFriend;
                return (
                  <li
                    key={user.id}
                    role="option"
                    aria-selected="false"
                    className="flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <Avatar username={user.username} avatarUrl={user.avatarUrl} isOnline={user.isOnline} />

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                        {user.username}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {user.isOnline ? "Online" : "Offline"}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {alreadyFriend ? (
                        <button
                          onClick={() => onMessageFriend?.(user.id)}
                          className="text-xs px-2.5 py-1 rounded-md font-medium bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          aria-label={`Message ${user.username}`}
                        >
                          Message
                        </button>
                      ) : (
                        <button
                          onClick={() => handleAddFriend(user.id)}
                          className="text-xs px-2.5 py-1 rounded-md font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          aria-label={`Add ${user.username} as friend`}
                        >
                          Add
                        </button>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
