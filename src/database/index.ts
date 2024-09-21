import { Database } from "bun:sqlite";
import { statements } from "./statements";

import type { Period, Paste } from "@/types";

import { getExpireTime, getNowTime } from "@/utils/time";
import cuid from "cuid";

export class PasteManager {
  private db: Database;

  constructor(path = "test.db") {
    this.db = new Database(path);
    this.initializeDatabase();
  }

  private initializeDatabase(): void {
    this.db.exec(statements.CREATE_TABLE);
    this.db.exec(statements.CREATE_PRAGMA);
    setInterval(() => {
      const now = getNowTime();
      this.db.prepare(statements.CLEAN_EXPIRED_PASTES).run(now);
      this.db.prepare(statements.VACUUM).run();
    }, 1000 * 60 * 60 * 24);
  }

  public getPaste(id: string): Paste | null {
    const result = this.db.prepare(statements.RETRIEVE).get(id) as Paste | null;
    if (result) {
      if (result.expire_at <= getNowTime()) {
        this.deletePaste(id);
        return null;
      }
      this.db.prepare(statements.VISIT).run(id);
      return result;
    }
    return null;
  }

  public insertPaste(
    content: string,
    highlight: string,
    owner: string,
    expiry: Period
  ): string {
    const pasteId = cuid();
    const expireTime = getExpireTime(expiry);
    const createdTime = getNowTime();
    this.db
      .prepare(statements.INSERT)
      .run(pasteId, content, highlight, owner, expireTime, createdTime);
    return pasteId;
  }

  public updatePaste(id: string, content: string, highlight: string): void {
    const createdTime = getNowTime();
    this.db.prepare(statements.UPDATE).run(content, highlight, createdTime, id);
  }

  public deletePaste(id: string): void {
    this.db.prepare(statements.DELETE).run(id);
  }

  public getAllPastesByOwner(
    owner: string,
    limit: number,
    offset: number
  ): Paste[] {
    const result = this.db
      .prepare(statements.RETRIEVE_ALL_BY_OWNER)
      .all(owner, getNowTime(), limit, offset) as Paste[];
    return result;
  }

  public getPasteCountByOwner(owner: string): number {
    const now = getNowTime();
    const result = this.db
      .prepare(statements.RETRIEVE_PASTE_COUNT_BY_OWNER)
      .get(owner, now) as { count: number };

    return result.count;
  }
}
