import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/redis/redis";

async function findInstanceUserKeys(instanceId: string) {
  const keys: string[] = [];
  let cursor = "0";

  do {
    const result = await redis.scan(cursor, {
      MATCH: `${instanceId}:*:users`,
      COUNT: 100
    });

    cursor = result.cursor;
    keys.push(...result.keys);
  } while (cursor !== "0");

  return keys;
}

async function totalInstanceUsers(keys: string[]) {
    let total = 0;
    for (const key of keys) {
        const res = await redis.sCard(key);
        total += res
    }
    return total;
}

export async function GET(request: NextRequest) {
    const params = request.nextUrl.searchParams;
    const instanceId = params.get("instanceId");
    if (instanceId == null) {
        return NextResponse.json({ error: "Bad Request" }, { status: 400 });
    }

    try {
        const keys = await findInstanceUserKeys(instanceId);
        const total = await totalInstanceUsers(keys);
        return NextResponse.json({ users: total });
    } catch {
        return NextResponse.json({ error: "failed redis query" }, { status: 500 });
    }
}