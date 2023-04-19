-- CREATE TABLE profile(
--     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
--     username TEXT NOT NULL UNIQUE,
--     avatar TEXT, 
--     bio TEXT, 
--     timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW()
-- );
DROP TABLE if exists messages;
drop table if exists chats;

CREATE TABLE chats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    user_id TEXT NOT NULL,
    username TEXT NOT NULL,
    INDEX user_id_index (user_id)
);

CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    chat_id UUID REFERENCES chats (id) ON DELETE CASCADE,
    content_type VARCHAR(10) NOT NULL, -- "text" or "image"
    content TEXT NOT NULL,
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    user_id TEXT NOT NULL,
    username TEXT NOT NULL,
    INDEX user_id_index (user_id)
);
