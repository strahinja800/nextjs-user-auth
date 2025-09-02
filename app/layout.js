import "./globals.css";

export const metadata = {
  title: "Nextjs Auth",
  description: "Nextjs authentication with next-auth",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
