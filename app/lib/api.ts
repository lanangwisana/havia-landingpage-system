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

export async function getLandingPageSettings() {
  try {
    // Add timestamp to bypass any intermediate proxy caches
    const timestamp = new Date().getTime();
    const fetchUrl = `${API_BASE_URL}/api/haviacms/landingpage/settings?t=${timestamp}`;
    
    console.log(`[CMS Fetch] Requesting: ${fetchUrl}`);

    const res = await fetch(
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
      console.warn(`[CMS Fetch] Error status: ${res.status} for ${fetchUrl}`);
      return null;
    }

    const json = await res.json();
    return json?.success && json?.data ? json.data : json;
  } catch (error) {
    console.error("[CMS Fetch] Critical Failure:", error);
    return null;
  }
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
