CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    avatar_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE chats (
    id SERIAL PRIMARY KEY,
    name TEXT,
    is_group BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW(),
    ai_mode BOOLEAN DEFAULT false,
);

CREATE TABLE chat_members (
    chat_id INT REFERENCES chats (id),
    user_id INT REFERENCES users (id),
    joined_at TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (chat_id, user_id)
);