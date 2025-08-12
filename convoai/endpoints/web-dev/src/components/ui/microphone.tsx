"use client"

import * as React from "react"
import { useAppDispatch, useAppSelector, useMultibandTrackVolume } from "@/common/hooks"
import AudioVisualizer from "@/components/ui/audio-visualizer"
import AgoraRTC, { IMicrophoneAudioTrack } from "agora-rtc-sdk-ng"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Mic, MicOff } from "lucide-react"
import { setSelectedMicrophone } from "@/store/reducers/global"
import { TDeviceSelectItem } from "@/types"

export const MicIconByStatus = (
  props: React.SVGProps<SVGSVGElement> & { active?: boolean; color?: string },
) => {
  const { active, color, ...rest } = props
  if (active) {
    return <Mic color={color || "#3D53F5"} {...rest} />
  }
  return <MicOff color={color || "#667085"} {...rest} />
}

export default function MicrophoneBlock(props: {
  audioTrack?: IMicrophoneAudioTrack
}) {
  const { audioTrack } = props
  const [audioMute, setAudioMute] = React.useState(false)
  const [mediaStreamTrack, setMediaStreamTrack] =
    React.useState<MediaStreamTrack>()

  React.useEffect(() => {
    audioTrack?.on("track-updated", onAudioTrackupdated)
    if (audioTrack) {
      setMediaStreamTrack(audioTrack.getMediaStreamTrack())
    }

    return () => {
      audioTrack?.off("track-updated", onAudioTrackupdated)
    }
  }, [audioTrack])

  React.useEffect(() => {
    audioTrack?.setMuted(audioMute)
  }, [audioTrack, audioMute])

  const subscribedVolumes = useMultibandTrackVolume(mediaStreamTrack, 10)

  const onAudioTrackupdated = (track: MediaStreamTrack) => {
    console.log("[test] audio track updated", track)
    setMediaStreamTrack(track)
  }

  const onClickMute = () => {
    setAudioMute(!audioMute)
  }

  return (
    <CommonDeviceWrapper
      title=""
      Icon={MicIconByStatus}
      onIconClick={onClickMute}
      isActive={!audioMute}
      select={<MicrophoneSelect audioTrack={audioTrack} />}
    >
      <div className="flex flex-1 flex-col items-center justify-center self-stretch rounded-md">
        <AudioVisualizer
          className="bg-primary"
          barWidth={2}
          minBarHeight={2}
          maxBarHeight={20}
          frequencies={subscribedVolumes}
          borderRadius={2}
          gap={2}
        />
      </div>
    </CommonDeviceWrapper>
  )
}

export function CommonDeviceWrapper(props: {
  children: React.ReactNode
  title: string
  Icon: (
    props: React.SVGProps<SVGSVGElement> & { active?: boolean },
  ) => React.ReactNode
  onIconClick: () => void
  isActive: boolean
  select?: React.ReactNode
}) {
  const { Icon, onIconClick, isActive, select, children } = props

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 flex-1">
          <Button
            variant="outline"
            className="border-secondary bg-transparent"
            onClick={onIconClick}
          >
            <Icon className="h-5 w-5" active={isActive} />
            {children}
          </Button>
          <div className="flex flex-1 w-[100px]">
            {select}
          </div>
        </div>
      </div>
    </div>
  )
}

export const DeviceSelect = (props: {
  items: TDeviceSelectItem[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
}) => {
  const { items, value, onChange, placeholder } = props

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="flex-1">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {items.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export const MicrophoneSelect = (props: {
  audioTrack?: IMicrophoneAudioTrack
}) => {
  const dispatch = useAppDispatch()
  const selectedMicrophone = useAppSelector((state) => state.global.selectedMicrophone)
  const { audioTrack } = props
  const [items, setItems] = React.useState<TDeviceSelectItem[]>([
  ])


  React.useEffect(() => {
    AgoraRTC.getMicrophones().then((arr) => {
      setItems(
        arr.map((item) => ({
          label: item.label,
          value: item.label,
          deviceId: item.deviceId,
        })),
      )
      dispatch(setSelectedMicrophone({
        label: arr[0].label,
        deviceId: arr[0].deviceId,
        value: arr[0].label,
      }))
    })
  }, [dispatch])

  const onChange = async (value: string) => {
    const target = items.find((item) => item.value === value)
    if (target) {
      dispatch(setSelectedMicrophone(target))
      if (audioTrack) {
        await audioTrack.setDevice(target.deviceId)
      }
    }
  }

  return <DeviceSelect items={items} value={selectedMicrophone.label} onChange={onChange} />
}
