import TextInput from "@/components/form/TextInput";
import Loader from "@/components/icons/Loader";
import VStack from "@/components/layout/VStack"
import { useState } from "react";
import Button from "@/components/Button";
import Playground from "./Playground";

type PlaygroundWrapperProps = {
    serviceInfo: any
}

export default function PlaygroundWrapper({ serviceInfo }: PlaygroundWrapperProps) {
    const [roomBuffer, setRoomBuffer] = useState<string>("");
    const [room, setRoom] = useState<string>("a");

    if (!serviceInfo) {
        return <Loader />
    }

    if (room == "") {
        return (
            <VStack>
                <TextInput label="room name" value={roomBuffer} setValue={setRoomBuffer}/>
                <Button color="dark" onClick={() => setRoom(roomBuffer)}>
                    Join room
                </Button>
            </VStack>
        )
    }

    return (
        <Playground serviceInfo={serviceInfo} roomName={room} />
    )
}   