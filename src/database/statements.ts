export const statements = {
  // Create the table
  CREATE_TABLE: `
    CREATE TABLE IF NOT EXISTS pastes (
      id TEXT PRIMARY KEY,
      content TEXT NOT NULL,
      highlight TEXT,
      visitors INTEGER DEFAULT 1,
      owner TEXT NOT NULL,
      expire_at DATETIME NOT NULL,
      created_at DATETIME NOT NULL
    ) WITHOUT ROWID`,

  // Insert a new paste
  INSERT: `
    INSERT INTO pastes (id, content, highlight, owner, expire_at, created_at)
    VALUES (?, ?, ?, ?, ?, ?)`,

  // Retrieve a paste by id
  RETRIEVE: `
    SELECT * FROM pastes WHERE id = ? LIMIT 1`,

  // Update a paste by id
  UPDATE: `
    UPDATE pastes SET content = ?, highlight = ?, created_at = ? WHERE id = ?`,

  // Increment a paste visitor
  VISIT: `
    UPDATE pastes SET visitors = visitors + 1 WHERE id = ?`,

  // Delete a paste by id
  DELETE: `
    DELETE FROM pastes WHERE id = ?`,

  CLEAN_EXPIRED_PASTES: `
    DELETE FROM pastes WHERE expire_at < ?`,

  VACUUM: "VACUUM",

  // Creates the PRAGMA statements
  CREATE_PRAGMA: "PRAGMA journal_mode = WAL; PRAGMA synchronous = NORMAL;",
};
