import { unstable_noStore as noStore } from "next/cache";

// Clean up the API_BASE_URL to prevent duplicated path segments
const getBaseUrl = () => {
  let url = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1/havia-project/havia-brain-system/index.php";
  // Remove trailing slash if exists
  url = url.replace(/\/$/, "");
  // Remove /api/haviacms if it's already included in the env var to prevent duplication in the fetch calls
  url = url.replace(/\/api\/haviacms$/, "");
  return url;
};

const API_BASE_URL = getBaseUrl();
const FETCH_TIMEOUT_MS = 8000; // 8 second timeout

/**
 * Fetch with automatic timeout using AbortController.
 * Prevents hanging requests when the backend is unreachable.
 */
async function fetchWithTimeout(url: string, options: RequestInit = {}, timeoutMs = FETCH_TIMEOUT_MS): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    return res;
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function getLandingPageSettings() {
  noStore();
  const timestamp = new Date().getTime();
  const fetchUrl = `${API_BASE_URL}/api/haviacms/landingpage/settings?t=${timestamp}`;

  console.log(`[CMS Fetch] Requesting: ${fetchUrl}`);

  // Retry up to 2 attempts
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const res = await fetchWithTimeout(
        fetchUrl,
        {
          cache: "no-store",
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
            "Pragma": "no-cache",
            "Expires": "0",
            "Content-Type": "application/json",
          },
        },
      );

      if (!res.ok) {
        console.warn(`[CMS Fetch] Attempt ${attempt}: Error status ${res.status} for ${fetchUrl}`);
        if (attempt === 2) return null;
        continue;
      }

      const json = await res.json();
      return json?.success && json?.data ? json.data : json;
    } catch (error: any) {
      const isTimeout = error?.name === "AbortError";
      console.error(`[CMS Fetch] Attempt ${attempt} ${isTimeout ? "TIMED OUT" : "FAILED"}:`, error?.message || error);
      if (attempt === 2) return null;
    }
  }

  return null;
}

// Backward-compatible alias
export const getSettings = getLandingPageSettings;

export async function submitPortfolioRequest(data: {
  name: string;
  contact: string;
  interest: string;
}) {
  try {
    const fetchUrl = `${API_BASE_URL}/api/haviacms/landingpage/request`;
    const res = await fetch(
      fetchUrl,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    const json = await res.json();
    return json;
  } catch (error) {
    console.error("Failed to submit portfolio request:", error);
    return { success: false, message: "Network error. Please try again." };
  }
}

export async function getProjectPagination(page: number = 1, categoryId: string | number = 'all') {
  noStore();
  try {
    const timestamp = new Date().getTime();
    const fetchUrl = `${API_BASE_URL}/api/haviacms/landingpage/settings?page=${page}&category_id=${categoryId}&t=${timestamp}`;

    console.log(`[Project Fetch] Requesting: ${fetchUrl}`);

    const res = await fetchWithTimeout(fetchUrl, {
      cache: "no-store",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) return { success: false, message: `Error status: ${res.status}` };
    return await res.json();
  } catch (error: any) {
    const isTimeout = error?.name === "AbortError";
    console.error(`[Project Fetch] ${isTimeout ? "TIMED OUT" : "Failure"}:`, error?.message || error);
    return { success: false, message: isTimeout ? "Request timed out" : "Network error" };
  }
}
