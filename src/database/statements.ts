export const statements = {
  // Create the table
  CREATE_TABLE: `
    CREATE TABLE IF NOT EXISTS pastes (
      id TEXT PRIMARY KEY,
      content TEXT NOT NULL,
      highlight TEXT,
      visitors INTEGER DEFAULT 0,
      token TEXT NOT NULL,
      expire_at DATETIME NOT NULL,
      created_at DATETIME NOT NULL
    )`,

  // Insert a new paste
  INSERT: `
    INSERT INTO pastes (id, content, highlight, token, expire_at, created_at)
    VALUES (?, ?, ?, ?, ?, ?)`,

  // Retrieve a paste
  RETRIEVE: `
    SELECT * FROM pastes WHERE id = ? LIMIT 1`,

  // Increment a paste visitor
  VISIT: `
    UPDATE pastes SET visitors = visitors + 1 WHERE id = ?`,

  // Delete a paste by id
  DELETE_BY_ID: `
    DELETE FROM pastes WHERE id = ?`,

  // Delete a paste by token
  DELETE_BY_TOKEN: `
    DELETE FROM pastes WHERE token = ?`,
};
