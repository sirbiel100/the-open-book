import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: "The Open Book | Independent Bookstore",
  description: "Discover carefully selected fiction, thoughtful nonfiction, and books recommended by readers.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
