import VStack from '@/components/layout/VStack';
import Subheading from '@/components/text/Subheading';
import Body from '@/components/text/Body';
import Loader from '@/components/icons/Loader';
import { useEffect, useState } from 'react';

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatCount(n: number): string {
  if (!n) {
    return "0";
  }
  return n.toLocaleString();
}

function BillingTile({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="flex flex-col gap-1 bg-neutral-900 border border-neutral-800 rounded p-3 min-w-32">
      <Body align="left" className="text-white text-xs uppercase tracking-widest whitespace-nowrap">
        {label}
      </Body>
      <span className="text-neutral-100 text-lg font-semibold font-mono">{value}</span>
      {sub && sub !== "0 B" && (
        <Body align="left" className="text-neutral-500 text-xs">
          {sub}
        </Body>
      )}
    </div>
  );
}

function BillingSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <VStack align="left" gap="gap-2">
      <Body align="left" className="text-black font-bold uppercase">
        {title}
      </Body>
      <div className="flex flex-wrap gap-2">{children}</div>
    </VStack>
  );
}

const DEFAULT_BILLING = {
  inboundRequests: 0,
  outboundBytes: 0,
  redisReads: 0,
  redisWrites: 0,
  redisPublishes: 0,
  firestoreReads: 0,
  firestoreReadBytes: 0,
  firestoreWrites: 0,
  firestoreWriteBytes: 0,
  outboundFetches: 0,
  outboundFetchBytes: 0,
};
const LOADER_TIMEOUT_MS = 1000;

export default function BillingViewer({ billing }: { billing: any | null }) {
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    if (billing !== null) return;
    const t = setTimeout(() => setTimedOut(true), LOADER_TIMEOUT_MS);
    return () => clearTimeout(t);
  }, [billing]);

  const safeBilling = billing ?? (timedOut ? DEFAULT_BILLING : null);

  return (
    <VStack align="left" className="w-full">
      <VStack className="pl-16" gap="gap-0">
        <Subheading align="left">your metrics</Subheading>
        <Body align="left">
          metric data is flushed periodically and may not reflect recent activity. new changes will be seen live here
        </Body>
      </VStack>

      {safeBilling == null ? (
        <Loader />
      ) : (
        <div className="pl-16 grid grid-cols-2 gap-x-16 gap-y-6">
          <BillingSection title="WebSockets">
            <BillingTile label="inbound requests" value={formatCount(safeBilling.inboundRequests)} />
            <BillingTile label="outbound bytes" value={formatBytes(safeBilling.outboundBytes)} />
          </BillingSection>

          <BillingSection title="Redis">
            <BillingTile label="reads" value={formatCount(safeBilling.redisReads)} />
            <BillingTile label="writes" value={formatCount(safeBilling.redisWrites)} />
            <BillingTile label="publishes" value={formatCount(safeBilling.redisPublishes)} />
          </BillingSection>

          <BillingSection title="Firestore">
            <BillingTile
              label="reads"
              value={formatCount(safeBilling.firestoreReads)}
              sub={formatBytes(safeBilling.firestoreReadBytes)}
            />
            <BillingTile
              label="writes"
              value={formatCount(safeBilling.firestoreWrites)}
              sub={formatBytes(safeBilling.firestoreWriteBytes)}
            />
          </BillingSection>

          <BillingSection title="HTTP">
            <BillingTile
              label="outbound fetches"
              value={formatCount(safeBilling.outboundFetches)}
              sub={formatBytes(safeBilling.outboundFetchBytes)}
            />
          </BillingSection>
        </div>
      )}
    </VStack>
  );
}