export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0b1220",   // darker than before
        panel: "#121a2f",        // clearly separated panels
        panelBorder: "#1f2a44",
        textPrimary: "#e5e7eb",  // readable white
        textMuted: "#9ca3af",    // muted but visible
        primary: "#22c55e",
        danger: "#ef4444",
      },
    },
  },
};
