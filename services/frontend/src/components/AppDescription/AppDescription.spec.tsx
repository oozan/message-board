import { render } from "@testing-library/react";
import AppDescription from "./AppDescription";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      // Mocking translations based on the provided key
      const translations: { [key: string]: string } = {
        appDescription: "Your mock app description here",
        // Add more translations as needed
      };
      return translations[key];
    },
  }),
}));

describe("AppDescription component", () => {
  it("renders without errors", () => {
    render(<AppDescription />);
  });
});
