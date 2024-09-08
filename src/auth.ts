import { Elysia } from "elysia";

import { makeOwnerCookie } from "@/utils/cookie";
import cuid from "cuid";

const authPlugin = new Elysia({ name: "Service.Auth" }).derive(
  { as: "scoped" },
  ({ cookie: { ownerId }, set }) => {
    let ownerIdValue = ownerId.value;
    if (!ownerIdValue) {
      const ownerId = cuid();
      set.headers["Set-Cookie"] = makeOwnerCookie(ownerId);
      ownerIdValue = ownerId;
    }
    return {
      Auth: {
        ownerId: ownerIdValue,
      },
    };
  }
);

export default authPlugin;
