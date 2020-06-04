import React, { useCallback, useEffect, useReducer, useRef } from "react";
import styled, { css } from "styled-components";
import useOnClickOutside from "use-onclickoutside";

import { BigNumber } from "@ethersproject/bignumber";
import { rgba } from "polished";
import { useMachine } from "@xstate/react";

import Machine from "./machine";

import { getSecondsForDays, getSecondsForHours, getSecondsForMinutes } from "../../utils";
import { useMountEffect } from "../../hooks";

const OuterWrapper = styled.div`
  align-items: stretch;
  background-color: #ffffff;
  border: 1px solid #ebf0ff;
  display: flex;
  flex-flow: row nowrap;
  height: 3.25rem;
  margin: 0.75rem 0rem 0.75rem 0.5rem;
  max-width: 464px;
  padding: 0.5rem 1rem;
  position: relative;

  @media (max-width: 960px) {
    margin: 0.5rem 0rem;
  }
`;

const StyledFlexRowNoWrap = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  cursor: pointer;
  flex-grow: 1;
`;

type LabelProps = {
  readonly isPlaceholder: boolean;
};

const Label = styled.span<LabelProps>`
  color: #1f2133;
  font-size: 0.9375rem;
  font-weight: 500;

  ${props =>
    props.isPlaceholder &&
    css`
      color: #ebf0ff;
    `}
`;

type DropdownWrapperType = {
  readonly isOpen: boolean;
};

const DropdownWrapper = styled.div<DropdownWrapperType>`
  align-items: stretch;
  border: 1px solid #ebf0ff;
  border-radius: 0.25rem;
  box-shadow: 0rem 1.25rem 2.5rem 0.5rem ${() => rgba("#1f2133", 0.15)};
  /* display: ${props => (props.isOpen ? "flex" : "none")}; */
  flex-flow: row nowrap;
  left: 0rem;
  max-height: 15rem;
  position: absolute;
  right: 0rem;
  top: 3.5rem;
  z-index: 100;
`;

const StyledFlexColumnNoWrap = styled.div`
  display: flex;
  flex-flow: column nowrap;
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
  background-color: #ebf0ff;
  width: 1px;
`;

type RowProps = {
  readonly isSelected: boolean;
};

const Row = styled.span<RowProps>`
  background-color: "#ffffff";
  cursor: pointer;
  font-size: 0.8125rem;
  font-weight: 400;
  padding: 0.6125rem 0.875rem;
  transition: background-color 200ms ease-in-out;
  user-select: none;

  &:active,
  &:hover {
    background-color: #f5f7fc;
  }

  @media (max-width: 960px) {
    transition: none;
  }

  ${props =>
    props.isSelected &&
    css`
      background-color: #f5f7fc;
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
    formattedDuration.push(days?.toString() + " " + days + " days");
  }

  if (hours && hours > 0) {
    formattedDuration.push(hours?.toString() + " " + hours + " hours");
  }

  if (minutes && minutes > 0) {
    formattedDuration.push(minutes?.toString() + " " + minutes + " hours");
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

const initialState: State = {
  days: 0,
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

export type Props = {
  readonly duration: {
    label?: string;
    totalSeconds?: BigNumber;
  };
  readonly onUpdateDuration?: Function;
};

/**
 * Component ported over from the official Sablier Interface at https://pay.sablier.finance
 */
function DurationInput(props: Props) {
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

  /* Alert the parent component when the user changes one of the time units */
  useEffect(() => {
    if (props.onUpdateDuration) {
      const label = formatLabel(state.days, state.hours, state.minutes);
      const totalSeconds = BigNumber.from(
        getSecondsForDays(state.days) + getSecondsForHours(state.hours) + getSecondsForMinutes(state.minutes),
      );
      props.onUpdateDuration({ label, totalSeconds });
    }
  }, [props, state]);

  /* The first time this component is mounted, set the initial state machine */
  useMountEffect(() => {
    sendToMachine("IDLE");
    dispatch({ type: "RESET" });
  }, [sendToMachine]);

  return (
    <OuterWrapper onClick={onClickWrapper} ref={wrapperRef}>
      <StyledFlexRowNoWrap>
        <Label isPlaceholder={props.duration.label === undefined}>{props.duration.label || "30 Days"}</Label>
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
                {days + " days"}
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
                {hours + " hours"}
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
                {minutes + " minutes"}
              </Row>
            );
          })}
        </StyledFlexColumnNoWrap>
      </DropdownWrapper>
    </OuterWrapper>
  );
}

export default DurationInput;
