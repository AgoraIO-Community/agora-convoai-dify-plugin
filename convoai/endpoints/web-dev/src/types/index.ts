export interface IOptions {
  channel: string;
  userName: string;
  userId: number;
  appId: string;
  token: string;
}

export type TDeviceSelectItem = {
  label: string
  value: string
  deviceId: string
}

export enum EMessageType {
  AGENT = "agent",
  USER = "user",
}

export enum EMessageDataType {
  TEXT = "text",
  IMAGE = "image",
}

export interface IChatItem {
  userId: number | string;
  userName?: string;
  text: string;
  data_type: EMessageDataType;
  type: EMessageType;
  isFinal?: boolean;
  time: number;
}