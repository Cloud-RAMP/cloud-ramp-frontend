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

const BACKEND_URL = "ws://backend.cloudramp.org:8080";

export default function Playground({ serviceInfo, roomName }: PlaygroundProps) {
    const fullURL = `${BACKEND_URL}/${serviceInfo.id}/${roomName}`;

    let [allMessages, setAllMessages] = useState<string[]>([]);
    let [messageBoxVal, setMessageBoxVal] = useState<string>("");
    const socketRef = useRef<WebSocket | null>(null);

    function onInput(ev: any) {
        if (ev.key == "Enter") {
            onSend();
            return;
        }
        setMessageBoxVal(ev.target.value);
    }

    function onSend() {
        if (socketRef.current) {
            if (socketRef.current.CLOSED || socketRef.current.CLOSING) {
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
        const socket = new WebSocket(fullURL);
        socketRef.current = socket;

        socket.onmessage = (ev: MessageEvent) => {
            setAllMessages(prev => [...prev, ev.data]);
        };

        return () => {
            socket.close();
        };
    }, [fullURL]);

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
                    onKeyDown={onInput}
                />
                <Button color="dark" className="px-6" onClick={onSend}>
                    Send
                </Button>
            </VStack>
            <VStack className="w-full h-full" gap="gap-1">
                <Bold align="left">incoming messages</Bold>
                <Code className="min-h-32 max-h-128 h-full w-full overflow-y-scroll text-wrap overflow-x-hidden flex-1 p-2">
                    {allMessages.map(msg => (
                        <div>
                            {msg}
                        </div>
                    ))}
                </Code>
            </VStack>
        </HStack>
    )
}