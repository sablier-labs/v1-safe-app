import React from "react";
import { Select, Text } from "@gnosis.pm/safe-react-components";

import { SelectContainer } from "./index";

type IntegerOption = {
  id: string;
  label: string;
};

const integerOptions = (max: number): IntegerOption[] => {
  return Array.from(Array(max).keys()).map((index: number) => {
    return { id: index.toString(), label: index.toString() };
  });
};

const daysOption: IntegerOption[] = integerOptions(366);
const hoursOption: IntegerOption[] = integerOptions(24);
const minutesOption: IntegerOption[] = integerOptions(60);

export type StreamLength = {
  days: string;
  hours: string;
  minutes: string;
};

const StreamLengthInput = ({
  streamLength,
  onStreamLengthChange,
  error,
}: {
  streamLength: StreamLength;
  onStreamLengthChange: Function;
  error?: string;
}) => {
  return (
    <>
      <Text size="md" color="error">
        {error}
      </Text>
      <SelectContainer>
        <Select
          items={daysOption}
          activeItemId={streamLength.days}
          onItemClick={(id: string): void => onStreamLengthChange(id, "days")}
        />
        <Text strong size="lg">
          Days
        </Text>
      </SelectContainer>

      <SelectContainer>
        <Select
          items={hoursOption}
          activeItemId={streamLength.hours}
          onItemClick={(id: string): void => onStreamLengthChange(id, "hours")}
        />
        <Text strong size="lg">
          Hours
        </Text>
      </SelectContainer>

      <SelectContainer>
        <Select
          items={minutesOption}
          activeItemId={streamLength.minutes}
          onItemClick={(id: string): void => onStreamLengthChange(id, "minutes")}
        />
        <Text strong size="lg">
          Minutes
        </Text>
      </SelectContainer>
    </>
  );
};

export default StreamLengthInput;
