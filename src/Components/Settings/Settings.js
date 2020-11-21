import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TableCell } from "./TableCell";
import { Icon } from "../Icons";
import { StepInput } from "./StepInput";
import { ListItemLink } from "./ListItemLink";
import "./Settings.css";

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 40,
};

const variants = {
  open: { opacity: 1, scale: 1, transition: spring },
  closed: { opacity: 0, scale: 0, transition: spring },
};

export const Settings = ({
  onClose,
  isVisible,
  onLogout,
  stepUp,
  stepDown,
  numTracks,
  minStep,
  maxStep,
}) => (
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
            <button
              className="TapItem"
              onClick={onClose}
              aria-label="Close Settings"
            >
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
                      value={numTracks}
                      stepUp={stepUp}
                      stepDown={stepDown}
                      min={minStep}
                      max={maxStep}
                    />
                  </div>
                </TableCell>
              </section>
            </section>

            <section className="SettingsGroup">
              <h2>About</h2>
              <section className="SettingsList">
                <TableCell>
                  <p>Version 0.1.0</p>
                </TableCell>
                <ListItemLink url="https://github.com/JonoMacC/fast-tracks">
                  <p>Github</p>
                </ListItemLink>
              </section>
            </section>

            <section className="SettingsGroup">
              <h2>Legal</h2>
              <section className="SettingsList">
                <ListItemLink url="/terms-and-conditions">
                  <p>Terms & Conditions</p>
                </ListItemLink>
                <ListItemLink url="/privacy-policy">
                  <p>Privacy Policy</p>
                </ListItemLink>
                <ListItemLink url="/cookie-use">
                  <p>Cookie Use</p>
                </ListItemLink>
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
