import { useLayoutEffect } from "react";
import { resetDocumentShell } from "../../lib/resetDocumentShell";

const STATIC_PATH = "/team-ai-collab/";
const TITLE = "proGPT — Совместное пространство с ИИ для команд";

export default function TeamAiCollabLanding() {
  useLayoutEffect(() => {
    resetDocumentShell();
    document.title = TITLE;
    document.documentElement.dataset.landing = "team-ai-collab";
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
