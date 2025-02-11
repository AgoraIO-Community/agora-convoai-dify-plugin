import { useMultibandTrackVolume } from "@/common/hooks"
import AudioVisualizer from "./audio-visualizer"
import { IMicrophoneAudioTrack } from "agora-rtc-sdk-ng"
import { cn } from "@/lib/utils"

interface RemoteAudioProps {
    audioTrack?: IMicrophoneAudioTrack
}

export default function RemoteAudio(props: RemoteAudioProps) {
    const { audioTrack } = props
  
    const subscribedVolumes = useMultibandTrackVolume(audioTrack, 20)
  
    return (
      <div
        className={cn(
          "flex h-auto w-full flex-col items-center justify-center",
        )}
      >
        <div className="h-14 w-full">
          <AudioVisualizer
          className="bg-secondary"
            frequencies={subscribedVolumes}
            barWidth={2}
            minBarHeight={2}
            maxBarHeight={10}
            borderRadius={2}
            gap={2}
          />
        </div>
      </div>
    )
  }
  