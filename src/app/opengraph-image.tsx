import { ImageResponse } from "next/og";

export const alt =
  "SAUCARA — gâteaux sur mesure et pâtisseries de réception à Casablanca";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "stretch",
        background: "#F7F0E4",
        color: "#123C32",
        display: "flex",
        height: "100%",
        padding: 48,
        width: "100%",
      }}
    >
      <div
        style={{
          border: "2px solid #C4A268",
          display: "flex",
          flex: 1,
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 58,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 32,
            fontWeight: 700,
            letterSpacing: "0.22em",
          }}
        >
          SAUCARA
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontFamily: "serif",
              fontSize: 76,
              lineHeight: 0.98,
              maxWidth: 850,
            }}
          >
            Des créations pour vos plus beaux moments.
          </div>
          <div
            style={{
              color: "#765326",
              display: "flex",
              fontSize: 24,
              marginTop: 26,
            }}
          >
            Gâteaux sur mesure · Casablanca · Projet de démonstration
          </div>
        </div>
      </div>
    </div>,
    size,
  );
}
