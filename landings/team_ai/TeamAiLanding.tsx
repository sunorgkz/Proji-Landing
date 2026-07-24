import { useLayoutEffect } from "react";
import { resetDocumentShell } from "../../lib/resetDocumentShell";

const STATIC_PATH = "/team-ai/";
const TITLE = "proGPT — Командный ИИ для совместной работы";

export default function TeamAiLanding() {
  useLayoutEffect(() => {
    resetDocumentShell();
    document.title = TITLE;
    document.documentElement.dataset.landing = "team-ai";
    document.body.style.margin = "0";
    document.body.style.overflow = "hidden";

    return () => {
      delete document.documentElement.dataset.landing;
      document.body.style.margin = "";
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <iframe
      title={TITLE}
      src={STATIC_PATH}
      style={{ width: "100%", height: "100dvh", border: 0, display: "block" }}
    />
  );
}
