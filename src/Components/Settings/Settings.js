import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useToggle } from "../../util/useToggle";
import { Toggle } from "../NavBar/Toggle";
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

const minStep = 3,
  maxStep = 7;

export const Settings = ({ onLogout, numTracks, setNumTracks }) => {
  const [isVisible, toggleVisibility] = useToggle(false);
  return (
    <>
      <SettingsToggle
        isVisible={isVisible}
        toggleVisibility={() => toggleVisibility()}
      />
      <AnimatePresence>
        {isVisible && (
          <motion.div
            key="modal-container"
            className="PageContainer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: spring }}
            exit={{ opacity: 0, transition: spring }}
          >
            <motion.section
              key="modal"
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
                  onClick={() => toggleVisibility()}
                  aria-label="Close Settings"
                >
                  <Icon
                    name="cancel"
                    color="var(--icon)"
                    size="var(--icon-size)"
                  />
                </button>
              </div>
              <SettingsList
                onLogout={onLogout}
                numTracks={numTracks}
                setNumTracks={setNumTracks}
              />
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const SettingsToggle = ({ isVisible, toggleVisibility }) => (
  <Toggle state={isVisible} onToggle={toggleVisibility} name="Settings">
    <Icon
      name="profile"
      size="var(--icon-size)"
      color={isVisible ? "var(--brand-primary)" : "var(--icon)"}
    />
  </Toggle>
);

const SettingsList = ({ onLogout, numTracks, setNumTracks }) => (
  <div className="SettingsContainer">
    <section className="SettingsGroup">
      <h2>Preferences</h2>
      <section className="SettingsList">
        <TableCell>
          <div className="Header">
            <p>Tracks per turn</p>
            <StepInput
              value={numTracks}
              setValue={setNumTracks}
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
        <ListItemLink url="https://github.com/JonoMacC/fast-tracks/blob/master/legal/termsandconditions.md">
          <p>Terms & Conditions</p>
        </ListItemLink>
        <ListItemLink url="https://github.com/JonoMacC/fast-tracks/blob/master/legal/privacypolicy.md">
          <p>Privacy Policy</p>
        </ListItemLink>
        <ListItemLink url="https://github.com/JonoMacC/fast-tracks/blob/master/legal/cookiepolicy.md">
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
);
