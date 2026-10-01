export type CallRecord = {
  source: { type: string; id: string };
  sourceId: string;
  kind: string;
  title: string;
  platform: string;
  status: string;
  occurredAt: string;
  durationSeconds: number;
  botName?: string;
  transcriptAvailable: boolean;
  audioAvailable: boolean;
  createdAt: string;
  detailsPath: string;
};

export type CallMetric = {
  value: string;
  label: string;
  icon: string;
  chart: string;
  iconBackground: string;
};
