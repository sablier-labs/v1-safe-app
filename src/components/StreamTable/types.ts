import { StreamStatus } from "./Status";
import { Token } from "../../typings";

export type HumanReadableStream = {
  humanDeposit: string;
  humanStartTime: string;
  humanStopTime: string;
  id: number;
  humanRecipient: string;
  humanSender: string;
  status: StreamStatus;
  token: Token;
};

export type TableRowData = HumanReadableStream & {
  humanStartTimeOrder: number;
  humanStopTimeOrder: number;
  cancelStream: Function;
};
