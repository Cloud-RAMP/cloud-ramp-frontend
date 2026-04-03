"use client";

import PageContainer from '@/components/layout/PageContainer';
import { useParams } from 'next/navigation';
import Heading from '@/components/text/Heading';
import { useEffect, useState } from 'react';
import { subscribeToServiceLogs } from '@/firebase/firestore';
import Code from '@/components/text/Code';
import Body from '@/components/text/Body';
import Loader from '@/components/icons/Loader';

export default function ServiceIdPage() {
  const params = useParams();
  const serviceIdParam = params.serviceId;
  const serviceId = Array.isArray(serviceIdParam) ? serviceIdParam[0] : String(serviceIdParam)

  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const unsub = subscribeToServiceLogs(serviceId, (firestoreLogs: any[]) => {
      const allLogs = firestoreLogs.map((log: any) => {
        const jsonStrings = log.content.split("\n").filter((j: string) => j != "");
        return jsonStrings.map((j: string) => JSON.parse(j))
      });
      
      setLogs(allLogs.reduce((acc: string[], cur: string[]) => acc.push(...cur)));
    });

    return unsub;
  }, []);

  function stringifyLog(log: any): string {
    let out = "";
    Object.keys(log).forEach((k: string) => {
      if (k == "time") {
        const time = new Date(log[k]);
        out += `[${log[k]}] `;
      } else {
        out += `${k}=${log[k]} `
      }
    })
    return out;
  }

  return (
    <PageContainer>
        <Heading>
            Your service
        </Heading>
        <Body>
          info about it here
        </Body>
        <Heading>
          Logs
        </Heading>
        {logs.length != 0 ? (
        <Code className="min-h-[25vh] h-[25vh] overflow-y-scroll p-2 resize-y">
          {logs.map((j: string, index: number) => (
            <div key={`logs-${index}`} className='text-wrap align-left'>
              {stringifyLog(j)}
            </div>
          ))}
        </Code>
        ) : (
          <Loader />
        )}
    </PageContainer>
  );
}