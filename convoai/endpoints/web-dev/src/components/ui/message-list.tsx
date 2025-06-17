import * as React from "react"
import {
  useAutoScroll,
} from "@/common/hooks"
import { EMessageStatus } from "@/types"
import { cn } from "@/lib/utils"



/**
 * Represents a message item in the chat history
 * @property uid - Unique identifier for the message sender
 * @property turn_id - ID representing the turn/sequence in the conversation
 * @property text - The actual message content/transcript
 * @property status - Current status of the message (e.g. in progress, completed, interrupted)
 */
export interface IMessageListItem {
  uid: number
  turn_id: number
  text: string
  status: EMessageStatus
  metadata: {
    text: string
  }
}

export default function MessageList(props: { className?: string }) {
  const { className } = props

  const [chatHistory, setChatHistory] = React.useState<IMessageListItem[]>([]);

  React.useEffect(() => {
    const getChatHistoryFromEvent = (event: MessageEvent) => {
      const { data } = event;
      if (data.type === "message") {
        setChatHistory(data?.chatHistory || []);
      }
    };
    window.addEventListener("message", getChatHistoryFromEvent);

    return () => {
      window.removeEventListener("message", getChatHistoryFromEvent);
    };
  }, []);

  const containerRef = React.useRef<HTMLDivElement>(null)

  useAutoScroll(containerRef)

  return (
    <div
      ref={containerRef}
      className={cn("flex-grow overflow-y-auto p-4", className)}
    >
      {chatHistory.length === 0 ? (
        <div className="text-gray-500 text-sm">
          No messages yet. Start the conversation!
        </div>
      ) :
        chatHistory.map((message, index) => {
          return <div key={`${message.uid}-${message.turn_id}`}>
            {message.uid}: {message.metadata.text}
          </div>
        })}
    </div>
  )
}
