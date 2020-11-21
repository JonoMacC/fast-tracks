import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TableCell } from "../TableCell/TableCell";
import { Icon } from "../Icons/Icons";
import { StepInput } from "../StepInput/StepInput";
import { ListLink } from "./ListLink";
import "./Settings.css";

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 40,
};

const minStep = 3,
  maxStep = 7;

export const Settings = ({ onClose, isVisible, onLogout, ...props }) => {
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
    open: { opacity: 1, scale: 1, transition: spring },
    closed: { opacity: 0, scale: 0, transition: spring },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="PageContainer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: spring }}
          exit={{ opacity: 0, transition: spring }}
        >
          <motion.section
            variants={variants}
            initial={"closed"}
            animate={"open"}
            exit={"closed"}
            className="Settings surface"
          >
            <div className="SettingsHeader">
              <h1>Settings</h1>
              <button className="TapItem" onClick={onClose}>
                <Icon
                  name="cancel"
                  color="var(--icon)"
                  size="var(--icon-size)"
                />
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
                  <ListLink url="https://github.com/JonoMacC/fast-tracks">
                    <p>Github</p>
                  </ListLink>
                </section>
              </section>

              <section className="SettingsGroup">
                <h2>Legal</h2>
                <section className="SettingsList">
                  <ListLink url="/terms-and-conditions">
                    <p>Terms & Conditions</p>
                  </ListLink>
                  <ListLink url="/privacy-policy">
                    <p>Privacy Policy</p>
                  </ListLink>
                  <ListLink url="/cookie-use">
                    <p>Cookie Use</p>
                  </ListLink>
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
        </motion.div>
      )}
    </AnimatePresence>
  );
};
