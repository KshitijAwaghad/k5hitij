import { ImageResponse } from "next/og";
import { siteData } from "@/data/site";


export const alt = `${siteData.owner.name} - ${siteData.owner.role}`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 80px",
          backgroundColor: "#090a0d",
          backgroundImage:
            "radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.08) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(16, 185, 129, 0.05) 5%, transparent 0%)",
          backgroundSize: "50px 50px, 100px 100px",
          color: "#f1f5f9",
          fontFamily: "monospace",
        }}
      >
        {/* Top Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 24,
              color: "#10b981",
              fontWeight: "bold",
            }}
          >
            &gt; {siteData.owner.handle}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 16,
              color: "#64748b",
              border: "1px solid #1e222b",
              padding: "6px 16px",
              borderRadius: 20,
              backgroundColor: "#101216",
            }}
          >
            <span style={{ color: "#10b981" }}>●</span> {siteData.owner.statusBadge}
          </div>
        </div>

        {/* Center Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 18, color: "#10b981", letterSpacing: 2 }}>
            {"// FULL-STACK DEVELOPER"}
          </div>
          <div
            style={{
              fontSize: 60,
              fontWeight: 900,
              color: "#ffffff",
              lineHeight: 1.1,
            }}
          >
            {siteData.owner.name}
          </div>
          <div
            style={{
              fontSize: 24,
              color: "#94a3b8",
              maxWidth: 900,
              lineHeight: 1.4,
            }}
          >
            {siteData.owner.headline}
          </div>
        </div>

        {/* Bottom Tech Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #1e222b",
            paddingTop: 24,
            fontSize: 16,
            color: "#64748b",
          }}
        >
          <div style={{ display: "flex", gap: 24 }}>
            <span>TypeScript</span>
            <span>•</span>
            <span>React 19</span>
            <span>•</span>
            <span>Next.js App Router</span>
            <span>•</span>
            <span>PostgreSQL</span>
          </div>
          <div style={{ color: "#10b981" }}>k5hitij.dev</div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
