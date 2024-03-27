import "./index.css";
import { I18nextProvider } from "react-i18next";
import i18n from "i18next";
import App from "./App";
import { createRoot } from "react-dom/client";

// Import translations
import fi_lang from "./locales/fi.json";

// Initialize i18next
i18n.init({
  interpolation: { escapeValue: false }, // React already does escaping
  lng: "fi", // Default language
  resources: {
    fi: {
      translation: fi_lang,
    },
  },
});

// Get the root element from the document
const rootElement = document.getElementById("root");

// Check if the root element exists before calling createRoot
if (rootElement) {
  createRoot(rootElement).render(
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  );
} else {
  console.error("Root element not found in the document.");
}
