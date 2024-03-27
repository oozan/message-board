import React from "react";
import { useTranslation } from "react-i18next";

const AppDescription: React.FC = () => {
  const { t } = useTranslation();

  return <p className="p-6">{t("appDescription")}</p>;
};

export default AppDescription;
