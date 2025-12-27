import React from "react";

export const metadata = {
  title: "Sports Standings App",
  description: "A multi-theme sports tournament manager",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Montserrat:wght@400;700;900&family=Space+Mono:wght@400;700&family=Bebas+Neue&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            tailwind.config = {
              theme: {
                extend: {
                  fontFamily: {
                    sans: ['Inter', 'sans-serif'],
                    sporty: ['Montserrat', 'sans-serif'],
                    header: ['Bebas Neue', 'sans-serif'],
                    mono: ['Space Mono', 'monospace'],
                  },
                  colors: {
                    // Clean Minimal
                    'clean-header': '#37013d',
                    'clean-bg': '#f8fafb',
                    'clean-blue': '#2463eb',
                    'clean-gray': '#efeeef',
                    'clean-border': '#efeeef',
                    
                    // Sporty
                    'sporty-bg': '#002f26',
                    'sporty-card': '#01201c',
                    'sporty-orange': '#ff6901',
                    
                    // Table Centric (Original)
                    'table-green': '#016733',
                    'table-purple': '#43075b',
                    'table-bg': '#f3f5f6',
                  }
                }
              }
            }
          `,
          }}
        />
      </head>

      <body>{children}</body>
    </html>
  );
}
