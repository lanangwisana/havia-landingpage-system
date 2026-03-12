export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1/havia-project/havia-brain-system/index.php/api/haviacms";

export async function getSettings() {
  const url = `${API_BASE_URL}/landingpage/settings`;
  console.log(`[HaviaCMS] Requesting content from: ${url}`);

  try {
    // console.log(`[HaviaCMS] Fetching from: ${url}`);
    const response = await fetch(url, {
      cache: "no-store",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Referer": "http://localhost:3000/",
      },
    });

    if (!response.ok) {
      console.warn(`[HaviaCMS] API returned status: ${response.status}`);
      return null;
    }

    const json = await response.json();
    return json.success ? json.data : null;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn(`[HaviaCMS] API unreachable (${message}) — using default content`);
    console.error("[HaviaCMS] Detailed error:", error);
    return null;
  }
}
