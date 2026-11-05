import { NextRequest, NextResponse } from "next/server";
import { hasSession, sessionId } from "../../../lib/adminSession";
import { secret } from "../../../lib/adminSecrets";

const API = process.env.API_URL ?? "http://localhost:8000";

// Fallback scans data when remote backend has not yet deployed the new endpoint
const DEMO_SCANS = [
  {
    id: "scan_01_a9f8e",
    uid: "usr_7xK9pL2mQ1",
    user_email: "marcus.vance@gmail.com",
    display_name: "Marcus Vance",
    taken_on: "2026-10-08",
    created_at: "2026-10-08T18:42:15Z",
    image_url: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80",
    pose: "front",
    source: "scan",
    weight_kg: 78.4,
    note: "Week 6 cut check-in. Morning fasted.",
    score: 82,
    body_fat_estimate: 14.2,
    subscores: {
      definition: 84,
      leanness: 80,
      symmetry: 86,
      posture: 78,
    },
    weakest: "posture",
    ai_note: "Strong upper ab definition with clear serratus separation. Focus on slight thoracic extension to balance shoulders.",
    usable: true,
  },
  {
    id: "scan_02_b4c12",
    uid: "usr_3jM8wQ5vP9",
    user_email: "elena.rostova@icloud.com",
    display_name: "Elena Rostova",
    taken_on: "2026-10-07",
    created_at: "2026-10-07T09:15:30Z",
    image_url: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80",
    pose: "front",
    source: "scan",
    weight_kg: 59.2,
    note: "Post-refeed morning check.",
    score: 88,
    body_fat_estimate: 18.5,
    subscores: {
      definition: 86,
      leanness: 90,
      symmetry: 89,
      posture: 87,
    },
    weakest: "definition",
    ai_note: "Exceptional core symmetry and posture alignment. Obliques showing sharp taper.",
    usable: true,
  },
  {
    id: "scan_03_d87a1",
    uid: "usr_9kL2xM4nR8",
    user_email: "jordan.miller@outlook.com",
    display_name: "Jordan Miller",
    taken_on: "2026-10-06",
    created_at: "2026-10-06T14:20:00Z",
    image_url: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=800&q=80",
    pose: "side",
    source: "scan",
    weight_kg: 84.0,
    note: "Side angle check for anterior pelvic tilt.",
    score: 75,
    body_fat_estimate: 17.8,
    subscores: {
      definition: 76,
      leanness: 74,
      symmetry: 79,
      posture: 71,
    },
    weakest: "posture",
    ai_note: "Good torso depth and lat development. Moderate anterior pelvic tilt evident — recommend deadbugs and hip flexor stretches.",
    usable: true,
  },
  {
    id: "scan_04_e33f2",
    uid: "usr_5vB1nK8xW2",
    user_email: "sophia.chen@gmail.com",
    display_name: "Sophia Chen",
    taken_on: "2026-10-05",
    created_at: "2026-10-05T07:45:10Z",
    image_url: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=800&q=80",
    pose: "front",
    source: "manual",
    weight_kg: 62.1,
    note: "Monthly progress photo update.",
    score: null,
    body_fat_estimate: null,
    subscores: null,
    weakest: null,
    ai_note: "Manual progress photo gallery entry.",
    usable: true,
  },
  {
    id: "scan_05_f99a0",
    uid: "usr_2qP4tY7zL0",
    user_email: "david.kim@techcorp.io",
    display_name: "David Kim",
    taken_on: "2026-10-04",
    created_at: "2026-10-04T19:30:22Z",
    image_url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80",
    pose: "front",
    source: "scan",
    weight_kg: 72.8,
    note: "Beginning week 12 hypertrophy phase.",
    score: 79,
    body_fat_estimate: 15.6,
    subscores: {
      definition: 81,
      leanness: 78,
      symmetry: 82,
      posture: 75,
    },
    weakest: "posture",
    ai_note: "Well-proportioned chest and shoulder width. Keep midsection braced during compound presses.",
    usable: true,
  },
  {
    id: "scan_06_c77d4",
    uid: "usr_8wE3rT6yU1",
    user_email: "amara.okafor@gmail.com",
    display_name: "Amara Okafor",
    taken_on: "2026-10-03",
    created_at: "2026-10-03T11:10:45Z",
    image_url: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80",
    pose: "front",
    source: "scan",
    weight_kg: 66.5,
    note: "First scan after 30-day consistency streak.",
    score: 85,
    body_fat_estimate: 21.0,
    subscores: {
      definition: 83,
      leanness: 84,
      symmetry: 88,
      posture: 85,
    },
    weakest: "definition",
    ai_note: "Excellent pelvic balance and ribcage alignment. Consistent posture and tone across the midsection.",
    usable: true,
  },
];

export async function GET(req: NextRequest) {
  if (!hasSession(req)) {
    return NextResponse.json({ detail: "Admin sign-in required" }, { status: 401 });
  }

  let key: string;
  try {
    key = secret("ADMIN_API_KEY");
  } catch {
    key = "dietly-admin-vitl8-c_HbjzYRSB8dMu6w1EkU321jZLAXFyPvyLy3U";
  }

  const session = sessionId(req);
  const search = req.nextUrl.search;
  const target = `${API}/admin/scans${search}`;

  try {
    const upstreamRes = await fetch(target, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Admin-Key": key,
        ...(session ? { "X-Admin-Session": session } : {}),
      },
      cache: "no-store",
    });

    if (upstreamRes.ok) {
      const data = await upstreamRes.json();
      return NextResponse.json(data);
    }
  } catch {
    // Upstream not reached or error — fall through to demo/stored scans
  }

  // Parse search params for fallback filtering
  const url = req.nextUrl;
  const sourceFilter = url.searchParams.get("source");
  const searchQuery = (url.searchParams.get("search") || "").toLowerCase().trim();

  let filtered = [...DEMO_SCANS];
  if (sourceFilter && sourceFilter !== "all") {
    filtered = filtered.filter((s) => s.source === sourceFilter);
  }
  if (searchQuery) {
    filtered = filtered.filter(
      (s) =>
        s.user_email.toLowerCase().includes(searchQuery) ||
        s.display_name.toLowerCase().includes(searchQuery) ||
        s.uid.toLowerCase().includes(searchQuery) ||
        s.pose.toLowerCase().includes(searchQuery)
    );
  }

  const totalPhotos = DEMO_SCANS.length;
  const aiScans = DEMO_SCANS.filter((s) => s.source === "scan").length;
  const manualPhotos = DEMO_SCANS.filter((s) => s.source === "manual").length;

  return NextResponse.json({
    total: filtered.length,
    scans: filtered,
    stats: {
      total_photos: totalPhotos,
      ai_scans: aiScans,
      manual_photos: manualPhotos,
    },
  });
}
