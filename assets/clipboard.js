(function () {
  const faviconPath = document.querySelector('link[rel="icon"]')?.getAttribute("href") || "";
  const copyIconPath = faviconPath
    ? faviconPath.replace(/[^/]*$/, "icons/copy.svg")
    : "/icons/copy.svg";
  const checkIconPath = faviconPath
    ? faviconPath.replace(/[^/]*$/, "icons/check.svg")
    : "/icons/check.svg";

  document.querySelectorAll("pre:has(code)").forEach(pre => {
    if (pre.querySelector(".book-copy-button")) {
      return;
    }

    const button = document.createElement("button");
    button.className = "book-copy-button";
    button.type = "button";
    button.setAttribute("aria-label", "Copy code to clipboard");
    button.title = "Copy code";

    const icon = document.createElement("img");
    icon.src = copyIconPath;
    icon.alt = "";
    icon.setAttribute("aria-hidden", "true");
    button.appendChild(icon);

    button.addEventListener("click", async function () {
      const code = pre.querySelector("code");
      const content = code ? code.textContent : pre.textContent;

      if (!content) {
        return;
      }

      try {
        await navigator.clipboard.writeText(content);
        icon.src = checkIconPath;
        button.setAttribute("aria-label", "Copied");
        button.title = "Copied";
      } catch {
        icon.src = copyIconPath;
        button.setAttribute("aria-label", "Copy failed");
        button.title = "Copy failed";
      }

      window.setTimeout(function () {
        icon.src = copyIconPath;
        button.setAttribute("aria-label", "Copy code to clipboard");
        button.title = "Copy code";
      }, 1200);
    });

    pre.classList.add("book-code-block");
    pre.appendChild(button);
  });
})();
