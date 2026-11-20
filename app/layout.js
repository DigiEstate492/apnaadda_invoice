import "./globals.css";
export const metadata = { title: "Apna Adda Billing", icons: { icon: "/logo.png" } };

// Applies the saved theme before the page paints, so there is no flash of the wrong theme.
const themeScript = `try{var t=JSON.parse(localStorage.getItem("aa_theme"));if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body>{children}</body>
    </html>
  );
}
