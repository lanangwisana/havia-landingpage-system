const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1/havia-project/havia-brain-system/index.php";

export async function getLandingPageSettings() {
  try {
    // Add timestamp to bypass any intermediate proxy caches
    const timestamp = new Date().getTime();
    const res = await fetch(
      `${API_BASE_URL}/api/haviacms/landingpage/settings?t=${timestamp}`,
      {
        next: { revalidate: 30 },
        headers: {
          "Cache-Control": "no-cache",
          "Content-Type": "application/json",
        },
      },
    );

    if (!res.ok) return null;

    const json = await res.json();
    if (json.success && json.data) {
      return json.data;
    }
    return json;
  } catch (error) {
    console.error("Failed to fetch landing page settings:", error);
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
    const res = await fetch(
      `${API_BASE_URL}/api/haviacms/landingpage/request`,
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
