import React, { useContext } from "react";
import { motion, AnimateSharedLayout } from "framer-motion";
import { AuthContext } from "../../contexts/AuthContext";
import { TableCell } from "../TableCell/TableCell";
import { Icon } from "../Icons/Icons";
import { StepInput } from "../StepInput/StepInput";
import { InfoListItem } from "./InfoListItem";
import "./Settings.css";

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 40,
};

const minStep = 3,
  maxStep = 7;

export const Settings = ({ toggleSettings, isVisible, ...props }) => {
  // const history = useHistory();
  // Subscribe to authentication context
  const [, setAuthData] = useContext(AuthContext);

  // Reset client-side authorization
  const onLogout = () => {
    // clear browser cache
    window.localStorage.setItem("authData", null);

    // clear authorization context
    setAuthData(null);
  };

  // Settings decrement function, determines behavior for
  // settings stepper input
  const stepBack = () => {
    const tracksToDraw =
      props.numTracks > minStep ? props.numTracks - 1 : props.numTracks;
    props.setNumTracks(tracksToDraw);
  };

  // Settings increment function, determines behavior for
  // settings stepper input
  const stepForward = () => {
    const tracksToDraw =
      props.numTracks < maxStep ? props.numTracks + 1 : props.numTracks;
    props.setNumTracks(tracksToDraw);
  };

  const variants = {
    open: { opacity: 1, scale: 1 },
    closed: { opacity: 0, scale: 0 },
  };

  return (
    <div className="PageContainer" isopen={isVisible.toString()}>
      <motion.section
        variants={variants}
        initial={false}
        animate={isVisible ? "open" : "closed"}
        transition={spring}
        className="Settings surface"
      >
        <div className="SettingsHeader">
          <h1>Settings</h1>
          <button className="TapItem" onClick={toggleSettings}>
            <Icon name="cancel" color="var(--icon)" size="var(--icon-size)" />
          </button>
        </div>

        <div className="SettingsContainer">
          <section className="SettingsGroup">
            <h2>Preferences</h2>

            <section className="SettingsList">
              <TableCell>
                <div className="Header">
                  <p>Tracks per turn</p>
                  <StepInput
                    value={props.numTracks}
                    minStep={minStep}
                    maxStep={maxStep}
                    stepBack={stepBack}
                    stepForward={stepForward}
                  />
                </div>
              </TableCell>
            </section>
          </section>

          <section className="SettingsGroup">
            <h2>About</h2>
            <section className="SettingsList">
              <TableCell>
                <p>Version 0.0.0</p>
              </TableCell>

              <TableCell>
                <a
                  className="Header"
                  href="https://github.com/JonoMacC/fast-tracks"
                >
                  <p>Github</p>
                  <Icon
                    name="next"
                    color="var(--icon)"
                    size="var(--icon-size)"
                  />
                </a>
              </TableCell>
            </section>
          </section>

          <section className="SettingsGroup">
            <h2>Legal</h2>
            <section className="SettingsList">
              <AnimateSharedLayout>
                <motion.ul className="InfoList">
                  <InfoListItem title="Terms & Conditions">
                    <p>
                      By using the app, "Fast Tracks", you agree to the TERMS &
                      CONDITIONS, which represent an agreement between you and
                      the author of the app "Jon MacCaull".
                    </p>
                    <p>
                      You agree to not hold the author liable for any damages or
                      loss occurring either directly or indirectly through the
                      use of the app.
                    </p>
                  </InfoListItem>
                  <InfoListItem title="Privacy Policy"></InfoListItem>
                  <InfoListItem title="Cookie Use"></InfoListItem>
                </motion.ul>
              </AnimateSharedLayout>
            </section>
          </section>
          <button
            className="Btn large label rounded"
            onClick={onLogout}
            style={{ marginTop: "auto" }}
          >
            Logout
          </button>
        </div>
      </motion.section>
    </div>
  );
};
