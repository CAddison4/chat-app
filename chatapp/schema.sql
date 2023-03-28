-- CREATE TABLE profile(
--     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
--     username TEXT NOT NULL UNIQUE,
--     avatar TEXT, 
--     bio TEXT, 
--     timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW()
-- );
DROP TABLE if exists messages;
DROP TABLE if exists chats;

CREATE TABLE chats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL, 
    username TEXT NOT NULL,
    name TEXT NOT NULL,
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    username TEXT NOT NULL,
    chat_id UUID REFERENCES chats (id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW()
);