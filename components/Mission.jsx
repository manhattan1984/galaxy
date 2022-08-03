import { Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

const MissionSection = ({ title, items }) => {
  return (
    <>
      <Typography variant="h6" my>
        {title}
      </Typography>
      {items.map((text, index) => (
        <Typography key={index} my>
          {index + 1}. {text}
        </Typography>
      ))}
    </>
  );
};

const Mission = () => {
  const { t } = useTranslation();
  const missionItems = [
    {
      title: t("mission_title_1"),
      items: [t("m_t_a"), t("m_t_b"), t("m_t_c")],
    },
    {
      title: t("mission_title_2"),
      items: [t("m_t_d"), t("m_t_e"), t("m_t_f")],
    },
    {
      title: t("mission_title_3"),
      items: [t("m_t_g"), t("m_t_h"), t("m_t_i")],
    },
  ];

  return (
    <>
      <Typography my variant="h4">
        {t("mission_statement")}
      </Typography>

      <Typography my variant="h6">
        {t("our_mission")}
      </Typography>

      <Typography my>{t("mission_body")}</Typography>

      {missionItems.map(({ title, items }) => (
        <MissionSection key={title} title={title} items={items} />
      ))}
    </>
  );
};

export default Mission;
