import { fireErrorAlert } from "@/components/alerts";
import Button from "@/components/Button";
import HStack from "@/components/layout/HStack";
import VStack from "@/components/layout/VStack";
import Body from "@/components/text/Body";
import Bold from "@/components/text/Bold";
import Code from "@/components/text/Code";
import { useEffect, useState, useRef } from "react";

type PlaygroundProps = {
    serviceInfo: any
    roomName: string
}

// const BACKEND_URL = "wss://backend.cloudramp.org:8080";
const BACKEND_URL = "wss://cloud-ramp-578278759386.us-central1.run.app";

export default function Playground({ serviceInfo, roomName }: PlaygroundProps) {
    const fullURL = `${BACKEND_URL}/${serviceInfo.id}/${roomName}`;

    let [allMessages, setAllMessages] = useState<string[]>([]);
    let [messageBoxVal, setMessageBoxVal] = useState<string>("");
    const socketRef = useRef<WebSocket | null>(null);

    function onSend() {
        if (socketRef.current) {
            if (socketRef.current.readyState !== WebSocket.OPEN) {
                fireErrorAlert("Socket closed, cannot send message");
                return;
            }

            try {
                socketRef.current.send(messageBoxVal);
                setMessageBoxVal("");
            } catch {
                fireErrorAlert("Failed to send message");
            }
        } else {
            fireErrorAlert("Connection not established");
        }
    }

    useEffect(() => {
        let isCurrent = true;
        const socket = new WebSocket(fullURL);

        socket.onopen = () => {
            if (isCurrent) socketRef.current = socket;
        };

        socket.onmessage = (ev: MessageEvent) => {
            if (!isCurrent) return;
            setAllMessages(prev => [...prev, ev.data]);
        };

        socket.onerror = (err) => {
            console.error("WebSocket error", err);
        };

        socket.onclose = () => {
            if (isCurrent) socketRef.current = null;
        };

        return () => {
            isCurrent = false;
            socketRef.current = null;
            socket.close();
        };
    }, []);


    if (!serviceInfo || !serviceInfo.id) {
        return (
            <Body>
                Failed to load playground!
            </Body>
        )
    }

    return (
        <HStack className="w-full justify-evenly px-16 items-start">
            <VStack className="min-w-54 h-full" gap="gap-1">
                <Bold align="left">send messages</Bold>
                <textarea
                    id="playground-message-sender"
                    className="bg-outline/10 w-full border-outline border min-h-32 p-2"
                    value={messageBoxVal}
                    onChange={e => setMessageBoxVal(e.target.value)}
                    onKeyDown={e => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            onSend();
                        }
                    }}
                />
                <Button color="dark" className="px-6" onClick={onSend}>
                    Send
                </Button>
            </VStack>
            <VStack className="w-full h-full" gap="gap-1">
                <Bold align="left">incoming messages</Bold>
                <Code className="min-h-32 max-h-128 h-full w-full max-w-full overflow-y-scroll text-wrap overflow-x-hidden flex-1 p-2">
                    {allMessages.map((msg, idx) => (
                        <div key={`server-message-${idx}`} className="text-wrap">
                            {msg}
                        </div>
                    ))}
                </Code>
            </VStack>
        </HStack>
    )
}