import { Database } from "bun:sqlite";
import { statements } from "./statements";
import type { Period, Paste } from "@/types";
import { getExpireTime, getNowTime } from "@/utils/time";
import cuid from "cuid";

const db = new Database("test.db");
db.exec(statements.CREATE_TABLE);
db.exec(statements.CREATE_PRAGMA);

export function getPaste(id: string): Paste | null {
  const result = db.prepare(statements.RETRIEVE).get(id) as Paste | null;
  if (result) {
    if (result?.expire_at <= getNowTime()) {
      db.prepare(statements.DELETE_BY_ID).run(id);
      return null;
    }
    db.prepare(statements.VISIT).run(id);
    return result;
  }
  return null;
}

export function insertPaste(
  content: string,
  highlight: string,
  owner: string,
  expiry: Period
) {
  const pasteId = cuid();
  const expireTime = getExpireTime(expiry);
  const createdTime = getNowTime();

  db.prepare(statements.INSERT).run(
    pasteId,
    content,
    highlight,
    owner,
    expireTime,
    createdTime
  );

  return pasteId;
}

export function deletePaste(id: string): void {
  db.prepare(statements.DELETE_BY_ID).run(id);
}

export function getLatestPastes(): Paste[] {
  return db
    .prepare("SELECT * FROM pastes ORDER BY created_at DESC LIMIT 5")
    .all() as Paste[];
}
