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

export default function ServiceIdPage() {
  const params = useParams();
  const serviceIdParam = params.serviceId;
  const serviceId = Array.isArray(serviceIdParam) ? serviceIdParam[0] : String(serviceIdParam)
  const { user } = useUser();
  const router = useRouter();

  const [logs, setLogs] = useState<string[]>([]);
  const [numUsers, setNumUsers] = useState<number>(0);

  useEffect(() => {
    const unsub = subscribeToServiceLogs(serviceId, (firestoreLogs: any[]) => {
      const allLogs = firestoreLogs.map((log: any) => {
        const jsonStrings = log.content.split("\n").filter((j: string) => j != "");
        return jsonStrings.map((j: string) => JSON.parse(j))
      });
      
      setLogs(allLogs.reduce((acc: string[], cur: string[]) => acc.push(...cur)));
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
      console.log("Error fetching num users");
    }
  }

  async function onDelete() {
    const uid = user?.uid;
    if (!uid) {
      alert("User not authenticated");
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
        alert("Service deleted successfully!");
        router.push('/dashboard');
        // Optionally redirect or update UI here
      } else {
        alert(data.error || "Failed to delete service");
      }
    } catch (e) {
      alert("Network error while deleting service");
    }
  }

  function onUpdate() {
    router.push(`/upload?serviceId=${serviceId}`)
  }

  return (
    <PageContainer>
        <VStack align='left' gap='gap-8' className='w-full'>
          {/* introduction */}
          <VStack className='pl-16 w-full' gap="gap-3" align='left'>
            <Heading align='left'>
              your service
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
                  delete service
                </Body>
                <Button color='dark' onClick={onDelete}>
                  delete
                </Button>
              </VStack>
              <VStack gap="gap-1">
                <Body align='left'>
                  update service
                </Body>
                <Button color='dark' onClick={onUpdate}>
                  update
                </Button>
              </VStack>
            </HStack>
          </VStack>
          <Body>
            Current users: {numUsers}
            <br />
            <Button onClick={getUsers}>
              Update
            </Button>
          </Body>
          <LogViewer logs={logs} />
        </VStack>
    </PageContainer>
  );
}