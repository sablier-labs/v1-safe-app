export const TX_TABLE_ID = "id";
export const TX_TABLE_RECIPIENT_ID = "recipient";
export const TX_TABLE_DEPOSIT_ID = "humanDeposit";
export const TX_TABLE_START_TIME_ID = "humanStartTime";
export const TX_TABLE_END_TIME_ID = "humanStopTime";
export const TX_TABLE_ACTION_ID = "action";

export type Column = {
  id: string;
  order: boolean;
  disablePadding: boolean;
  label: string;
  custom: boolean;
  align?: "right" | "inherit" | "left" | "center" | "justify" | undefined;
  width?: number;
  style?: any;
  static?: boolean;
};

export const generateColumns = () => {
  const nonceColumn: Column = {
    id: TX_TABLE_ID,
    disablePadding: false,
    label: "Stream ID",
    custom: false,
    order: false,
    width: 10,
  };

  const recipientColumn: Column = {
    id: TX_TABLE_RECIPIENT_ID,
    order: false,
    disablePadding: false,
    label: "To",
    custom: false,
    width: 180,
  };

  const depositColumn: Column = {
    id: TX_TABLE_DEPOSIT_ID,
    order: false,
    disablePadding: false,
    label: "Value",
    custom: false,
    width: 120,
    static: true,
  };

  const startColumn: Column = {
    id: TX_TABLE_START_TIME_ID,
    disablePadding: false,
    order: true,
    label: "Start Time",
    custom: false,
  };

  const endColumn: Column = {
    id: TX_TABLE_END_TIME_ID,
    disablePadding: false,
    order: true,
    label: "End Time",
    custom: false,
  };

  const actionColumn: Column = {
    id: TX_TABLE_ACTION_ID,
    order: false,
    disablePadding: false,
    label: "",
    custom: true,
    align: "right",
  };

  return [nonceColumn, recipientColumn, depositColumn, startColumn, endColumn, actionColumn];
};
