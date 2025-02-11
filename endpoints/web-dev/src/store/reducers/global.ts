import { TDeviceSelectItem } from "@/types"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface InitialState {
  agentConnected: boolean
  selectedMicrophone: TDeviceSelectItem
}

const getInitialState = (): InitialState => {
  return {
    agentConnected: false,
    selectedMicrophone: {
      deviceId: "",
      label: "",
      value: "",
    },
  }
}

export const globalSlice = createSlice({
  name: "global",
  initialState: getInitialState(),
  reducers: {
    setAgentConnected: (state: { agentConnected: boolean }, action: PayloadAction<boolean>) => {
      state.agentConnected = action.payload
    },
    setSelectedMicrophone: (state: { selectedMicrophone: TDeviceSelectItem }, action: PayloadAction<TDeviceSelectItem>) => {
      state.selectedMicrophone = action.payload
    }
  },
})

export const {
  setAgentConnected,
  setSelectedMicrophone,
} = globalSlice.actions

export default globalSlice.reducer
