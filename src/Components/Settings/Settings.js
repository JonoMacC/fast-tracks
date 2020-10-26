import React, { useContext, useEffect } from "react";
import { motion, AnimateSharedLayout } from "framer-motion";

import { AuthContext } from "../../contexts/AuthContext";
import { TableCell } from "../TableCell/TableCell";
import { Icon } from "../Icons/Icons";
import { StepInput } from "../StepInput/StepInput";

import "./Settings.css";
import { InfoListItem } from "./InfoListItem";

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 40,
};

const minStep = 3,
  maxStep = 7;

export const Settings = (props) => {
  // const history = useHistory();
  // Subscribe to authentication context
  const [auth, setAuthData] = useContext(AuthContext);

  // Reset server-side authorization
  // Reset client-side authorization
  const onLogout = async () => {
    const response = await fetch(`/api/logout`);
    if (response.ok) {
      // clear browser cache
      window.localStorage.setItem("authData", null);

      // clear authorization context
      setAuthData(null);
    }
  };

  useEffect(() => {
    console.log("auth updated", auth.data);
  }, [auth]);

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

  return (
    <motion.section
      variants={{
        open: { opacity: 1, y: 0 },
        closed: { opacity: 0, y: "-100vh" },
      }}
      initial={false}
      animate={props.isVisible ? "open" : "closed"}
      transition={spring}
      className="Settings surface"
      isopen={props.isVisible.toString()}
    >
      <h1>Settings</h1>

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
                <Icon name="next" color="var(--icon)" size="var(--icon-size)" />
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
                    CONDITIONS, which represent an agreement between you and the
                    author of the app "Jon MacCaull".
                  </p>
                  <p>
                    You agree to not hold the author liable for any damages or
                    loss occurring either directly or indirectly through the use
                    of the app.
                  </p>
                </InfoListItem>
                <InfoListItem title="Privacy Policy"></InfoListItem>
                <InfoListItem title="Cookie Use"></InfoListItem>
              </motion.ul>
            </AnimateSharedLayout>
          </section>
        </section>
      </div>

      <button className="Btn large label" onClick={onLogout}>
        Logout
      </button>
    </motion.section>
  );
};
