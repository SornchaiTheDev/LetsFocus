import {
  GiMeditation,
  GiArcher,
  GiPrism,
  GiBeamsAura,
  GiBiceps,
  GiBullseye,
  GiBurningMeteor,
  GiDonut,
  GiFlyingFlag,
  GiRevolt,
} from "react-icons/gi";
const Icons = ({ alias }) => {
  if (alias === "focus_1_hour") {
    return <GiArcher size="3rem" color="white" />;
  }
  if (alias === "focus_3_hours") {
    return <GiMeditation size="3rem" color="white" />;
  }
  if (alias === "focus_for_3_days") {
    return <GiPrism size="3rem" color="white" />;
  }
  if (alias === "focus_for_1_week") {
    return <GiBiceps size="3rem" color="white" />;
  }
  if (alias === "focus_for_1_month") {
    return <GiBeamsAura size="3rem" color="white" />;
  }
  if (alias === "focus_more_than_5_hours_a_week") {
    return <GiBullseye size="3rem" color="white" />;
  }
  if (alias === "focus_more_than_8_hours_a_week") {
    return <GiBurningMeteor size="3rem" color="white" />;
  }
  if (alias === "focus_more_than_12_hours_a_week") {
    return <GiRevolt size="3rem" color="white" />;
  }
  if (alias === "rest_for_1_hour") {
    return <GiDonut size="3rem" color="white" />;
  }

  if (alias === "completed_10_tasks") {
    return <GiFlyingFlag size="3rem" color="white" />;
  } else {
    return <></>;
  }
};

function IconsComp({ alias, received }) {
  return (
    <>
      {received ? (
        <div style={{ zIndex: 9999 }}>
          <Icons alias={alias} />
        </div>
      ) : (
        <Icons alias={alias} />
      )}
    </>
  );
}

export default IconsComp;
