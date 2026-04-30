import VStack from '@/components/layout/VStack';
import Subheading from '@/components/text/Subheading';
import Body from '@/components/text/Body';
import Loader from '@/components/icons/Loader';

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

export default function BillingViewer({ billing }: { billing: any | null }) {
  return (
    <VStack align="left" className="w-full">
      <VStack className="pl-16" gap="gap-0">
        <Subheading align="left">your metrics</Subheading>
        <Body align="left">
          metric data is flushed periodically and may not reflect recent activity. new changes will be seen live here
        </Body>
      </VStack>

      {!billing ? (
        <Loader />
      ) : (
        <div className="pl-16 grid grid-cols-2 gap-x-16 gap-y-6">
          <BillingSection title="WebSockets">
            <BillingTile label="inbound requests" value={formatCount(billing.inboundRequests)} />
            <BillingTile label="outbound bytes" value={formatBytes(billing.outboundBytes)} />
          </BillingSection>

          <BillingSection title="Redis">
            <BillingTile label="reads" value={formatCount(billing.redisReads)} />
            <BillingTile label="writes" value={formatCount(billing.redisWrites)} />
            <BillingTile label="publishes" value={formatCount(billing.redisPublishes)} />
          </BillingSection>

          <BillingSection title="Firestore">
            <BillingTile
              label="reads"
              value={formatCount(billing.firestoreReads)}
              sub={formatBytes(billing.firestoreReadBytes)}
            />
            <BillingTile
              label="writes"
              value={formatCount(billing.firestoreWrites)}
              sub={formatBytes(billing.firestoreWriteBytes)}
            />
          </BillingSection>

          <BillingSection title="HTTP">
            <BillingTile
              label="outbound fetches"
              value={formatCount(billing.outboundFetches)}
              sub={formatBytes(billing.outboundFetchBytes)}
            />
          </BillingSection>
        </div>
      )}
    </VStack>
  );
}