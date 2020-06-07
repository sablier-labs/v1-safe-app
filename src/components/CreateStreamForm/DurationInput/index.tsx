import React, { useCallback, useEffect, useReducer, useRef } from "react";
import styled, { css } from "styled-components";
import useOnClickOutside from "use-onclickoutside";

import { BigNumber } from "@ethersproject/bignumber";
import { useMachine } from "@xstate/react";

import Machine from "./machine";

import { getSecondsForDays, getSecondsForHours, getSecondsForMinutes } from "../../../utils";
import { useMountEffect } from "../../../hooks";
import theme from "../../../theme";

const OuterWrapper = styled.div`
  align-items: stretch;
  background-color: ${props => props.theme.colors.white};
  border: 0;
  display: flex;
  flex-flow: row nowrap;
  margin: 0px 0px 15px 0px;
  position: relative;
  width: 400px;
`;

const StyledFlexRowNoWrap = styled.div`
  align-items: center;
  background-color: rgba(0, 0, 0, 0.09);
  border-bottom: 1px solid rgba(0, 0, 0, 0.42);
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  box-sizing: border-box;
  color: rgba(0, 0, 0, 0.54);
  cursor: pointer;
  display: inline-flex;
  font-size: 16px;
  line-height: 1.1876em;
  flex-grow: 1;
  min-width: 0;
  transition: background-color 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;

  &:hover {
    background-color: rgba(0, 0, 0, 0.13);
  }
`;

const Label = styled.span`
  color: currentColor;
  font: inherit;
  font-family: ${props => props.theme.fonts.fontFamily};
  padding: 20px 12px 18px 12px;
`;

type DropdownWrapperType = {
  readonly isOpen: boolean;
};

const DropdownWrapper = styled.div<DropdownWrapperType>`
  align-items: stretch;
  background-color: ${props => props.theme.colors.white};
  border: 1px solid ${theme.colors.background};
  border-radius: 4px;
  display: ${props => (props.isOpen ? "flex" : "none")};
  flex-flow: row nowrap;
  left: 0px;
  max-height: 240px;
  position: absolute;
  right: 0px;
  top: 56px;
  z-index: 100;
`;

const StyledFlexColumnNoWrap = styled.div`
  display: flex;
  flex-flow: column nowrap;
  flex-grow: 1;
  overflow-y: auto;
  /* https://stackoverflow.com/questions/16670931/hide-scroll-bar-but-while-still-being-able-to-scroll */
  -ms-overflow-style: none;
  scrollbar-width: 0px;

  &::-webkit-scrollbar {
    height: 0px;
    width: 0px;
  }
`;

const Separator = styled.div`
  background-color: rgba(0, 0, 0, 0.12);
  width: 1px;
`;

type RowProps = {
  readonly isSelected: boolean;
};

const Row = styled.span<RowProps>`
  background-color: "#ffffff";
  cursor: pointer;
  font-family: ${theme.fonts.fontFamily};
  font-size: 13px;
  font-weight: 400;
  padding: 10px 14px;
  transition: background-color 200ms ease-in-out;
  user-select: none;

  &:active,
  &:hover {
    background-color: ${theme.colors.background};
  }

  @media (max-width: 960px) {
    transition: none;
  }

  ${props =>
    props.isSelected &&
    css`
      background-color: ${theme.colors.background};
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

function formatLabel(days?: number, hours?: number, minutes?: number): string | undefined {
  const formattedDuration: string[] = [];

  if (days && days > 0) {
    formattedDuration.push(`${days?.toString()} ${days > 1 ? "Days" : "Day"}`);
  }

  if (hours && hours > 0) {
    formattedDuration.push(`${hours?.toString()} ${hours > 1 ? "Hours" : "Hour"}`);
  }

  if (minutes && minutes > 0) {
    formattedDuration.push(`${minutes?.toString()} ${minutes > 1 ? "Minutes" : "Minute"}`);
  }

  return formattedDuration.join(" ") || undefined;
}

const RESET: string = "RESET";
const UPDATE_DAYS: string = "UPDATE_DAYS";
const UPDATE_HOURS: string = "UPDATE_HOURS";
const UPDATE_MINUTES: string = "UPDATE_MINUTES";

export type State = {
  days?: number;
  hours?: number;
  minutes?: number;
};

export type Action =
  | { type: typeof RESET; payload?: never }
  | { type: typeof UPDATE_DAYS; payload: number }
  | { type: typeof UPDATE_HOURS; payload: number }
  | { type: typeof UPDATE_MINUTES; payload: number };

declare const Action: Action;

/* Should be consistent with the default values in CreateStreamForm */
const initialState: State = {
  days: 3,
  hours: 0,
  minutes: 0,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case RESET: {
      return initialState;
    }
    case UPDATE_DAYS: {
      return {
        ...state,
        days: action.payload,
      };
    }
    case UPDATE_HOURS: {
      return {
        ...state,
        hours: action.payload,
      };
    }
    case UPDATE_MINUTES: {
      return {
        ...state,
        minutes: action.payload,
      };
    }
    default:
      throw new Error("Unexpected action type in DurationInput reducer");
  }
}

export type Duration = {
  label?: string;
  totalSeconds?: BigNumber;
};

export type Props = {
  readonly duration: Duration;
  readonly onUpdateDuration?: Function;
};

/**
 * Component ported over from the official Sablier Interface at https://pay.sablier.finance
 */
function DurationInput({ duration, onUpdateDuration }: Props) {
  const wrapperRef = useRef(null);
  const [currentMachine, sendToMachine] = useMachine(Machine);
  const [state, dispatch] = useReducer(reducer, initialState);

  useOnClickOutside(wrapperRef, () => {
    sendToMachine("IDLE");
  });

  /** Callbacks **/

  /**
   * When the transactions are being submitted, the duration input turns into read-only mode, which means the user can't
   * select another duration.
   */
  const onClickWrapper = useCallback(() => {
    if (currentMachine.value === "idle") {
      sendToMachine("COLLAPSE");
    } else if (currentMachine.value === "collapsed") {
      sendToMachine("IDLE");
    }
  }, [currentMachine.value, sendToMachine]);

  /** Side Effects **/

  /* The first time this component is mounted, set the initial state machine */
  useMountEffect(() => {
    sendToMachine("IDLE");
    dispatch({ type: "RESET" });
  }, [dispatch, sendToMachine]);

  /* Alert the parent component when the user changes one of the time units */
  useEffect(() => {
    if (onUpdateDuration) {
      const label = formatLabel(state.days, state.hours, state.minutes);
      const totalSeconds = BigNumber.from(
        getSecondsForDays(state.days) + getSecondsForHours(state.hours) + getSecondsForMinutes(state.minutes),
      );
      onUpdateDuration({ label, totalSeconds });
    }
  }, [onUpdateDuration, state]);

  return (
    <OuterWrapper onClick={onClickWrapper} ref={wrapperRef}>
      <StyledFlexRowNoWrap>
        <Label>{duration.label || "3 Days"}</Label>
      </StyledFlexRowNoWrap>
      <DropdownWrapper isOpen={currentMachine.value === "collapsed"}>
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
                {days === 1 ? "day" : "days"}
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
                {hours === 1 ? "hour" : "hours"}
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
                {minutes === 1 ? "minute" : "minutes"}
              </Row>
            );
          })}
        </StyledFlexColumnNoWrap>
      </DropdownWrapper>
    </OuterWrapper>
  );
}

export default DurationInput;
