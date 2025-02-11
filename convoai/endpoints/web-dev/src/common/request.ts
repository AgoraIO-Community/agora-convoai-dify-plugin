import axios from "axios"
import { base_url } from "./constant"

interface GenAgoraDataConfig {
  userId: string | number
  channel: string
}

interface StartRequestConfig {
  base_url: string
  channel: string
}

export const apiGenAgoraData = async (config: GenAgoraDataConfig) => {
  const url = `${base_url}/convoai-token/${config.channel}/${config.userId}`
  const resp: {
    data: {
      app_id: string,
      token: string,
    }
  } = await axios.get(url)
  return resp.data
}

export const apiStartService = async (
  config: StartRequestConfig,
): Promise<{
  agent_id: string
}> => {
  const url = `${base_url}/convoai/convoai-start`
  const resp: {
    data: {
      agent_id: string
    }
  } = await axios.post(url, config)
  return resp.data
}

export const apiStopService = async (agentId: string) => {
  const url = `${base_url}/convoai/convoai-stop`
  const data = {agent_id: agentId}
  const resp: {
    data: unknown
  } = await axios.post(url, data)
  return resp.data
}