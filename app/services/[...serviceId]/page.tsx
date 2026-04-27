"use client";

import PageContainer from '@/components/layout/PageContainer';
import { useParams } from 'next/navigation';
import Heading from '@/components/text/Heading';
import { useEffect, useState } from 'react';
import { subscribeToServiceLogs } from '@/firebase/firestore';
import Body from '@/components/text/Body';
import Button from '@/components/Button';
import LogViewer from './Logs';
import VStack from '@/components/layout/VStack';
import HStack from '@/components/layout/HStack';
import Subheading from '@/components/text/Subheading';
import { useUser } from '@/contexts/UserContext';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { useServiceQuery } from '@/firebase/queries';
import { fireErrorAlert, fireSuccessAlert } from '@/components/alerts';
import TextInput from '@/components/form/TextInput';
import Playground from './Playground';

export default function ServiceIdPage() {
  const params = useParams();
  const serviceIdParam = params.serviceId;
  const serviceId = Array.isArray(serviceIdParam) ? serviceIdParam[0] : String(serviceIdParam)
  const { user } = useUser();
  const router = useRouter();
  const { loading, service: serviceInfo, error } = useServiceQuery(serviceId);

  const [logs, setLogs] = useState<string[]>([]);

  const [numUsers, setNumUsers] = useState<number>(0);
  const [roomBuffer, setRoomBuffer] = useState<string>("");
  const [room, setRoom] = useState<string>("");

  useEffect(() => {
    const unsub = subscribeToServiceLogs(serviceId, (firestoreLogs: any[]) => {
      const allLogs = firestoreLogs.map((log: any) => {
        const jsonStrings = log.content.split("\n").filter((j: string) => j != "");
        return jsonStrings.map((j: string) => JSON.parse(j))
      });
      
      setLogs(allLogs.length == 0 ? [] : allLogs.reduce((acc: string[], cur: string[]) => acc.push(...cur)));
    });

    // fetch current number of users
    getUsers();

    return unsub;
  }, []);

  async function getUsers() {
    try {
      const resp = await fetch(`/api/getUsers?instanceId=${serviceId}`);
      const data = await resp.json();
      if (data.users) {
        setNumUsers(data.users)
      }
    } catch (e) {
      fireErrorAlert("Failed to fetch number of users");
    }
  }

  async function onDelete() {
    const uid = user?.uid;
    if (!uid) {
      alert("User not authenticated");
      return;
    }

    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "This will permanently delete your service.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#000000',
      cancelButtonColor: '#ffffff',
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel',
      customClass: {
        cancelButton: 'swal2-cancel-custom',
        confirmButton: 'swal2-confirm-custom',
      }
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      const resp = await fetch('/api/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ serviceId, uid }),
      });
      const data = await resp.json();
      if (resp.ok) {
        fireSuccessAlert("Service deleted");
        router.push('/dashboard');
        // Optionally redirect or update UI here
      } else {
        fireErrorAlert("Failed to delete service");
      }
    } catch (e) {
      fireErrorAlert("Failed to delete service");
    }
  }

  function onUpdate() {
    router.push(`/upload?serviceId=${serviceId}`)
  }

  return (
    <PageContainer background="tilted-square">
        <VStack align='left' gap='gap-8' className='w-full pt-16' divided={true}>
          {/* introduction */}
          <VStack className='pl-16 w-full' gap="gap-3" align='left'>
            <Heading align='left'>
              your service{serviceInfo && ": " + serviceInfo.serviceName}
            </Heading>
            <Body align='left'>
              id: {serviceId}
            </Body>
            <Body align='left'>
                here you can view details about your service, including logs and current viewers
                <br />
                you can also manage your service, mostly deletion and interacting in the playground
            </Body>
          </VStack>

          {/* playground */}
          <VStack className='w-full' align='left'>
            <HStack className='w-full'>
              <VStack className='pl-16 flex-1' gap="gap-0">
                  <Subheading align='left'>
                      playground
                  </Subheading>
                  <Body align='left'>
                      send/receive live data from your application in the playground!
                  </Body>
              </VStack>
              {(room != "" ) && (
                <Button className='flex-0 mr-16' color='dark' onClick={() => setRoom("")}>
                  Leave
                </Button>
              )}
            </HStack>
            <HStack className='w-full justify-center'>
              {room == "" ? (
                <VStack>
                  <TextInput label="room name" value={roomBuffer} setValue={setRoomBuffer}/>
                  <Button color="dark" onClick={() => setRoom(roomBuffer)}>
                    Join playground
                  </Button>
                </VStack>
              ) : (
                <Playground serviceInfo={serviceInfo} roomName={room} />
              )}
            </HStack>
          </VStack>

          {/* logs */}
          <LogViewer logs={logs} />

          {/* settings */}
          <VStack className='w-full' align='left'>
            <VStack className='pl-16' gap="gap-0">
                <Subheading align='left'>
                    settings
                </Subheading>
                <Body align='left'>
                    modify the state of your application here. more configuration to come in future updates!
                </Body>
            </VStack>
            <HStack className='w-full justify-evenly'>
              <VStack gap="gap-1">
                <Body align='left'>
                  delete your service
                </Body>
                <Button color='dark' onClick={onDelete}>
                  Delete
                </Button>
              </VStack>
              <VStack gap="gap-1">
                <Body align='left'>
                  update your code
                </Body>
                <Button color='dark' onClick={onUpdate}>
                  Update
                </Button>
              </VStack>
            </HStack>
          </VStack>
        </VStack>
    </PageContainer>
  );
}