import Code from '@/components/text/Code';
import Loader from '@/components/icons/Loader';
import VStack from '@/components/layout/VStack';
import Subheading from '@/components/text/Subheading';
import Body from '@/components/text/Body';

function stringifyLog(log: any): string {
  let out = "";
  Object.keys(log).forEach((k: string) => {
    if (k == "time") {
      out += `[${log[k]}] `;
    } else {
      out += `${k}=${log[k]} `;
    }
  });
  return out;
}

export default function LogViewer({ logs }: { logs: any[] }) {
  if (!logs || logs.length === 0) return <Loader />;
  return (
    <VStack align='left'>
        <VStack className='pl-16' gap="gap-0">
            <Subheading align='left'>
                your logs
            </Subheading>
            <Body align='left'>
                logs are incrementally updated, so you may not see updates immediately
            </Body>
        </VStack>
        {(!logs || logs.length == 0) ? (
            <Loader />
        ) : (
        <Code className="min-h-[25vh] h-[25vh] overflow-y-scroll p-2 resize-y">
          {logs.map((j: any, index: number) => (
            <div key={`logs-${index}`} className='text-wrap align-left'>
              {stringifyLog(j)}
            </div>
          ))}
        </Code>
      )}
    </VStack>
  );
}