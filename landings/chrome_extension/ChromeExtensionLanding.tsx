import { useEffect, useLayoutEffect } from "react";
import { resetDocumentShell } from "../../lib/resetDocumentShell";
import { AppProvider } from "./lib/app-context";
import { Header } from "./components/header";
import { Landing } from "./components/landing";
import "./styles.css";

const LANDING_ID = "chrome-extension";
const FONTS_URL =
  "https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500;700&display=swap";

function useChromeExtensionFonts() {
  useEffect(() => {
    const id = "chrome-extension-fonts";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = FONTS_URL;
    document.head.appendChild(link);
  }, []);
}

export default function ChromeExtensionLanding() {
  useLayoutEffect(() => {
    resetDocumentShell();
    document.documentElement.dataset.landing = LANDING_ID;

    return () => {
      document.documentElement.classList.remove("dark");
      delete document.documentElement.dataset.landing;
    };
  }, []);

  useChromeExtensionFonts();

  return (
    <AppProvider>
      <div className="chrome-extension-root min-h-screen">
        <Header />
        <Landing />
      </div>
    </AppProvider>
  );
}
