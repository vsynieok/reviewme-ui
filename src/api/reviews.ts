import config from "@/constants/config";
import Review from "./models/Review";
import EntitySet from "./models/EntitySet";

const REVIEWS_API = `${process.env.API_BASE_URL}/api/reviews`;

export async function getByPage(page: number, limit: number) {
  const req = await fetch(`${REVIEWS_API}?page=${page}&limit=${limit}`);
  if (req.ok) {
    return (await req.json()) as EntitySet<Review>;
  }
}

export async function add(review: Review) {
  const req = await fetch(REVIEWS_API, {
    method: "POST",
    body: JSON.stringify(review),
    headers: { "Content-Type": "application/json" },
  });
  if (req.ok) {
    return (await req.json()) as Review;
  }
}

export async function remove(id: string) {
  const req = await fetch(`${REVIEWS_API}/${id}`, { method: "DELETE" });
  return req.ok;
}
