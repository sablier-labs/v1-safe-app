import React, { useCallback, useEffect, useReducer, useRef } from "react";
import styled, { css } from "styled-components";
import typy from "typy";
import useOnClickOutside from "use-onclickoutside";

import { BigNumber } from "bignumber.js";
import { getSecondsForDays, getSecondsForHours, getSecondsForMinutes } from "@sablier/utils";
import { rgba } from "polished";
import { useCreateStreamManager } from "@sablier/contexts";
import { useMachine } from "@xstate/react";

import Machine from "./machine";

import { useEffectWithDefaultDelay } from "../../hooks";

const OuterWrapper = styled.div`
  ${props => props.theme.borderedFlexRowNoWrap};
  align-items: stretch;
  background-color: ${props => props.theme.white};
  height: 3.25rem;
  margin: 0.75rem 0rem 0.75rem 0.5rem;
  max-width: 464px;
  padding: 0.5rem 1rem;
  position: relative;

  ${props => props.theme.mediaWidth.upToMedium`
    margin: 0.5rem 0rem;
  `}
`;

const StyledFlexRowNoWrap = styled.div`
  ${props => props.theme.flexRowNoWrap};
  align-items: center;
  cursor: ${props => (props.isDisabled ? "not-allowed" : "pointer")};
  flex-grow: 1;
`;

const Label = styled.span`
  color: ${props => props.theme.darkGunmetalBlack};
  font-family: ${props => props.theme.robotoMonoFont};
  font-size: 0.9375rem;
  font-weight: 500;

  ${props =>
    props.isPlaceholder &&
    css`
      color: ${props.theme.aliceBlue};
    `}
`;

const DropdownWrapper = styled.div`
  ${props => props.theme.borderedFlexRowNoWrap};
  align-items: stretch;
  border-radius: 0.25rem;
  box-shadow: 0rem 1.25rem 2.5rem 0.5rem ${props => rgba(props.theme.darkGunmetalBlack, 0.15)};
  display: ${props => (props.isOpen ? "flex" : "none")};
  left: 0rem;
  max-height: 15rem;
  position: absolute;
  right: 0rem;
  top: 3.5rem;
  z-index: 100;
`;

const StyledFlexColumnNoWrap = styled.div`
  ${props => props.theme.flexColumnNoWrap};
  flex-grow: 1;
  overflow-y: auto;
  /* https://stackoverflow.com/questions/16670931/hide-scroll-bar-but-while-still-being-able-to-scroll */
  -ms-overflow-style: none;
  scrollbar-width: 0rem;

  &::-webkit-scrollbar {
    height: 0rem;
    width: 0rem;
  }
`;

const Separator = styled.div`
  background-color: ${props => props.theme.aliceBlue};
  width: 1px;
`;

const Row = styled.span`
  background-color: ${props => props.theme.white};
  cursor: pointer;
  font-family: ${props => props.theme.robotoMonoFont};
  font-size: 0.8125rem;
  font-weight: 400;
  padding: 0.6125rem 0.875rem;
  transition: background-color 200ms ease-in-out;
  user-select: none;

  &:active,
  &:hover {
    background-color: ${props => props.theme.ghostWhite};
  }

  ${props => props.theme.mediaWidth.upToMedium`
    transition: none;
  `}

  ${props =>
    props.isSelected &&
    css`
      background-color: ${props.theme.ghostWhite};
      font-weight: 600;
    `}
`;

/**
 * Allows the user to select between:
 * + 0 and 365 days
 * + 0 and 24 hours
 * + 0 and 60 minutes
 */
const daysArray = [...Array(365).keys()];
const hoursArray = [...Array(24).keys()];
const minutesArray = [...Array(60).keys()];

function formatLabel(translation, days, hours, minutes) {
  const formattedDuration = [];

  if (days > 0) {
    formattedDuration.push(days.toString() + " " + translation("words.day", { count: days }));
  }

  if (hours > 0) {
    formattedDuration.push(hours.toString() + " " + translation("words.hour", { count: hours }));
  }

  if (minutes > 0) {
    formattedDuration.push(minutes.toString() + " " + translation("words.minute", { count: minutes }));
  }

  return formattedDuration.join(" ") || null;
}

const RESET = "RESET";
const UPDATE_DAYS = "UPDATE_DAYS";
const UPDATE_HOURS = "UPDATE_HOURS";
const UPDATE_MINUTES = "UPDATE_MINUTES";

const initialState = {
  days: 0,
  hours: 0,
  minutes: 0,
};

function reducer(state, { type, payload }) {
  switch (type) {
    case RESET: {
      return initialState;
    }
    case UPDATE_DAYS: {
      return {
        ...state,
        days: payload,
      };
    }
    case UPDATE_HOURS: {
      return {
        ...state,
        hours: payload,
      };
    }
    case UPDATE_MINUTES: {
      return {
        ...state,
        minutes: payload,
      };
    }
    default:
      throw new Error(`Unexpected action type in DurationInput reducer: '${type}'.`);
  }
}

function DurationInput({ duration, onUpdateDuration, readOnly }) {
  const wrapperRef = useRef(null);
  const [currentMachine, sendToMachine] = useMachine(Machine);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isOpen: isCreateStreamOpen } = useCreateStreamManager();

  useOnClickOutside(wrapperRef, () => {
    sendToMachine("IDLE");
  });

  /** Callbacks **/

  /**
   * When the transactions are being submitted, the duration input turns into read-only mode, which means the user can't
   * select another duration.
   */
  const onClickWrapper = useCallback(() => {
    if (!readOnly) {
      if (currentMachine.value === "idle") {
        sendToMachine("COLLAPSE");
      } else if (currentMachine.value === "collapsed") {
        sendToMachine("IDLE");
      }
    }
  }, [currentMachine.value, readOnly, sendToMachine]);

  /** Side Effects **/

  /* Alert the parent component when the user changes one of the time units */
  useEffect(() => {
    if (typy(onUpdateDuration).isTruthy) {
      const label = formatLabel(state.days, state.hours, state.minutes);
      const totalSeconds = new BigNumber(
        getSecondsForDays(state.days) + getSecondsForHours(state.hours) + getSecondsForMinutes(state.minutes),
      );
      onUpdateDuration({ label, totalSeconds });
    }
  }, [onUpdateDuration, state]);

  /* When the sidebar closes, hide the dropdown and reset the state */
  useEffectWithDefaultDelay({
    condition: !isCreateStreamOpen,
    func: () => {
      sendToMachine("IDLE");
      dispatch({ type: "RESET" });
    },
  });

  return (
    <OuterWrapper onClick={onClickWrapper} ref={wrapperRef}>
      <StyledFlexRowNoWrap>
        <Label isPlaceholder={typy(duration, "label").isFalsy}>{typy(duration, "label").safeString || "30 Days"}</Label>
      </StyledFlexRowNoWrap>
      <DropdownWrapper isOpen={typy(currentMachine, "value").safeString === "collapsed"}>
        <StyledFlexColumnNoWrap>
          {daysArray.map(days => {
            return (
              <Row
                isSelected={days === state.days}
                key={days}
                onClick={e => {
                  e.preventDefault();
                  if (days !== state.days) {
                    dispatch({ type: UPDATE_DAYS, payload: days });
                  }
                }}
              >
                {days}
                &nbsp;
                {translation("words.day", { count: days }).toLowerCase()}
              </Row>
            );
          })}
        </StyledFlexColumnNoWrap>
        <Separator />
        <StyledFlexColumnNoWrap>
          {hoursArray.map(hours => {
            return (
              <Row
                isSelected={hours === state.hours}
                key={hours}
                onClick={e => {
                  e.preventDefault();
                  if (hours !== state.hours) {
                    dispatch({ type: UPDATE_HOURS, payload: hours });
                  }
                }}
              >
                {hours}
                &nbsp;
                {translation("words.hour", { count: hours }).toLowerCase()}
              </Row>
            );
          })}
        </StyledFlexColumnNoWrap>
        <Separator />
        <StyledFlexColumnNoWrap>
          {minutesArray.map(minutes => {
            return (
              <Row
                isSelected={minutes === state.minutes}
                key={minutes}
                onClick={e => {
                  e.preventDefault();
                  if (minutes !== state.minutes) {
                    dispatch({ type: UPDATE_MINUTES, payload: minutes });
                  }
                }}
              >
                {minutes}
                &nbsp;
                {translation("words.minute", { count: minutes }).toLowerCase()}
              </Row>
            );
          })}
        </StyledFlexColumnNoWrap>
      </DropdownWrapper>
    </OuterWrapper>
  );
}

// DurationInput.propTypes = {
//   duration: PropTypes.shape({
//     label: PropTypes.string,
//     totalSeconds: PropTypes.shape({}),
//   }),
//   onUpdateDuration: PropTypes.func.isRequired,
//   readOnly: PropTypes.bool,
// };

// DurationInput.defaultProps = {
//   duration: null,
//   readOnly: false,
// };

export default DurationInput;
