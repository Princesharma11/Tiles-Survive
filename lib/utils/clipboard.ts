/* ------------------------------------------------------------------ */
/*  Robust clipboard copy — works in iframes / insecure contexts.      */
/*  1. Async Clipboard API (secure contexts)                           */
/*  2. Legacy execCommand fallback (hidden textarea + select + copy)   */
/*  Returns false when the browser blocks everything, so the UI can    */
/*  fall back to a manually-selectable input.                          */
/* ------------------------------------------------------------------ */

export async function copyText(text: string): Promise<boolean> {
  try {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* NotAllowedError in iframes without clipboard-write — fall through */
  }

  try {
    if (typeof document === "undefined") return false;
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.top = "-9999px";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    ta.setSelectionRange(0, text.length);
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}
