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



// https://github.com/TEN-framework/ten_ai_base/blob/main/interface/ten_ai_base/transcription.py
/**
 * Represents the current status of a message in the system
 *
 * IN_PROGRESS (0): Message is still being processed/streamed
 * END (1): Message has completed normally
 * INTERRUPTED (2): Message was interrupted before completion
 */
export enum EMessageStatus {
  IN_PROGRESS = 0,
  END = 1,
  INTERRUPTED = 2,
}