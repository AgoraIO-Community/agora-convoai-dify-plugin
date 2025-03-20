import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { rtcManager } from "./manager/rtc/rtc"
import { useAppDispatch, useAppSelector } from "./common/hooks"
import { Loader2 } from "lucide-react"
import { setAgentConnected } from "./store/reducers/global"
import { apiStartService, apiStopService } from "./common/request"
import { base_url } from "./common/constant"
import MicrophoneBlock from "./components/ui/microphone"
import { IRtcUser, IUserTracks } from "./manager/rtc/types"
import { IMicrophoneAudioTrack } from "agora-rtc-sdk-ng"
import RemoteAudio from "./components/ui/remote-audio"
import { toast } from "sonner"
import { AxiosError } from "axios"

export default function CardWithForm() {
  const dispatch = useAppDispatch()
  const [channelName] = useState<string>(`${Math.random().toString(36).substring(4)}`)
  const [loading, setLoading] = useState<boolean>(false)
  const [agentId, setAgentId] = useState<string>("")
  const [audioTrack, setAudioTrack] = useState<IMicrophoneAudioTrack | undefined>(undefined)
  const [remoteuser, setRemoteUser] = useState<IRtcUser>()
  const agentConnected = useAppSelector((state) => state.global.agentConnected)
  const selectedMicrophone = useAppSelector((state) => state.global.selectedMicrophone)

  const joinRTC = async () => {
    rtcManager.on("localTracksChanged", onLocalTracksChanged)
    rtcManager.on("remoteUserChanged", onRemoteUserChanged)
    await rtcManager.createMicrophoneAudioTrack(selectedMicrophone)
    await rtcManager.join({
      channel: channelName,
      userId: 0,
    })
    await rtcManager.publish()
  }

  const leaveRTC = async () => {
    rtcManager.off("localTracksChanged", onLocalTracksChanged)
    rtcManager.off("remoteUserChanged", onRemoteUserChanged)
    await rtcManager.destroy()
  }

  const startAgent = async () => {
    const { agent_id } = await apiStartService({
      base_url: base_url,
      channel: channelName,
    })
    setAgentId(agent_id)
  }

  const stopAgent = async () => {
    await apiStopService(agentId)
    setAgentId("")
  }

  const onClick = async () => {
    setLoading(true)
    if (!agentConnected) {
      try {
        await Promise.all([
          joinRTC(),
          startAgent(),
        ])
      } catch (error:unknown) {
        setLoading(false)
        if (error instanceof AxiosError)
          if (error.response?.data?.detail)
            toast.error(`Agent start request failed: ${error.response?.data?.detail}`)
          else
            toast.error(`Agent start request failed: ${error}`)
        else
          toast.error(`Failed to start agent: ${error}`)
        return
      }
    } else {
      try {
        await Promise.all([
          leaveRTC(),
          stopAgent(),
        ])
      } catch (error:unknown) {
        dispatch(setAgentConnected(!agentConnected))
        setLoading(false)
        if (error instanceof AxiosError)
          toast.error(`Agent stop request failed: ${error.response?.data?.message}`)
        else
          toast.error(`Failed to stop agent: ${error}`)
        return
      }
    }
    dispatch(setAgentConnected(!agentConnected))
    setLoading(false)
  }

  const onRemoteUserChanged = (user: IRtcUser) => {
    console.log("[rtc] onRemoteUserChanged", user)
    setRemoteUser(user)
  }

  const onLocalTracksChanged = (tracks: IUserTracks) => {
    console.log("[rtc] onLocalTracksChanged", tracks)
    const { audioTrack } = tracks
    if (audioTrack) {
      setAudioTrack(audioTrack)
    }
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Dify & Agora Conversational AI Agent</CardTitle>
        <CardDescription>Talk to Dify, with your voice.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Agent Channel</Label>
            <Input id="name" placeholder="Name of your project" value={channelName} />
          </div>
          <div className="flex flex-col space-y-1.5">
            <MicrophoneBlock audioTrack={audioTrack} />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        {
          loading ? (
            <Button disabled>
              <Loader2 className="animate-spin" />
              Please wait
            </Button>
          ) : agentConnected ? (
            <Button onClick={onClick} variant="destructive">
              Stop
              <RemoteAudio audioTrack={remoteuser?.audioTrack} />
            </Button>
          ) : (
            <Button onClick={onClick}>
              Talk
            </Button>
          )
        }
      </CardFooter>
    </Card>
  )
}

