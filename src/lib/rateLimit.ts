// Rate limiting for OTP requests/verification attempts.
//
// In production, set UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN
// (https://upstash.com — free tier is enough for this) so limits are
// shared across server instances. Without it, this falls back to an
// in-memory counter that only works correctly on a single instance —
// fine for local dev, NOT sufficient for a multi-instance production
// deployment on its own.

type Bucket = { count: number; resetAt: number };
const memoryStore = new Map<string, Bucket>();

async function checkRedis(key: string, limit: number, windowSeconds: number) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;

  const res = await fetch(`${url}/pipeline`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify([
      ["INCR", key],
      ["EXPIRE", key, windowSeconds.toString(), "NX"],
    ]),
  });
  if (!res.ok) return null;
  const [{ result: count }] = await res.json();
  return { allowed: count <= limit, remaining: Math.max(0, limit - count) };
}

function checkMemory(key: string, limit: number, windowSeconds: number) {
  const now = Date.now();
  const bucket = memoryStore.get(key);
  if (!bucket || bucket.resetAt < now) {
    memoryStore.set(key, { count: 1, resetAt: now + windowSeconds * 1000 });
    return { allowed: true, remaining: limit - 1 };
  }
  bucket.count += 1;
  return { allowed: bucket.count <= limit, remaining: Math.max(0, limit - bucket.count) };
}

/** Returns { allowed, remaining } for `key` within a sliding window. */
export async function rateLimit(key: string, limit: number, windowSeconds: number) {
  const redisResult = await checkRedis(key, limit, windowSeconds).catch(() => null);
  if (redisResult) return redisResult;
  return checkMemory(key, limit, windowSeconds);
}
