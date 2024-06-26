import Header from "@/components/Header";
import "@/app/globals.css";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Presloviny",
  description: "Home page",
  icons: {
    icon: "/favicon.ico",
  },
};

function RootLayout({ children }) {
  return (
    <html lang="cs">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6377849943758730"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className="bg-slate-100 dark:bg-slate-950 w-full">
        <header>
          <Header />
        </header>
        <main className="min-h-screen w-full flex flex-col justify-start items-center pt-14">
          {children}
        </main>
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  );
}

export default RootLayout;