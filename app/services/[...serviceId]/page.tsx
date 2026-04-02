"use client";

import PageContainer from '@/components/layout/PageContainer';
import { useParams } from 'next/navigation';
import Heading from '@/components/text/Heading';
import { useEffect, useState } from 'react';
import { subscribeToServiceLogs } from '@/firebase/firestore';

export default function ServiceIdPage() {
  const params = useParams();
  const serviceIdParam = params.serviceId;
  const serviceId = Array.isArray(serviceIdParam) ? serviceIdParam[0] : String(serviceIdParam)

  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const unsub = subscribeToServiceLogs(serviceId, (logs) => {
      console.log(logs);
    });

    return unsub;
  }, []);

  return (
    <PageContainer>
        <Heading>
            Your service
        </Heading>
        <h1>Service ID Page</h1>
        <p>Captured Slug: {serviceId}</p>
    </PageContainer>
  );
}