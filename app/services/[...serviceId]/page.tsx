"use client";

import PageContainer from '@/components/layout/PageContainer';
import { useParams } from 'next/navigation';
import Heading from '@/components/text/Heading';

export default function ServiceIdPage() {
  const params = useParams();
  const serviceId = params.serviceId;

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