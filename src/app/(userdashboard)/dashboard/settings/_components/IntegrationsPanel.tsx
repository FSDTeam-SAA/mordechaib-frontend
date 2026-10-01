"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { IntegrationCard } from "./IntegrationCard";

type OAuthConnectResponse = {
  success?: boolean;
  message?: string;
  url?: string;
  link?: string;
  redirectUrl?: string;
  authUrl?: string;
  data?: {
    authorizationUrl?: string;
    url?: string;
    link?: string;
    redirectUrl?: string;
    authUrl?: string;
  };
};

type ConnectionResponse = {
  success?: boolean;
  message?: string;
  connection?: boolean;
  data?: {
    connection?: boolean;
    connected?: boolean;
    isConnected?: boolean;
    active?: boolean;
    status?: string;
  };
};

const integrations = [
  [
    "Facebook",
    "Sync customer messages and schedule page posts",
    "/settings/integrations/facebook.svg",
    false,
  ],
  [
    "Instagram",
    "Manage direct messages and schedule media posts",
    "/settings/integrations/instagram.svg",
    false,
  ],
  [
    "Outlook Calendar",
    "Auto schedule meetings and check availability",
    "/settings/integrations/outlook.svg",
    false,
  ],
  [
    "Google Account",
    "Auto schedule meetings and check availability",
    "/settings/integrations/google-calendar.svg",
    false,
  ],
  [
    "Twilio",
    "Ingest voice calls, transcription, and client dialers",
    "/settings/integrations/twilio.svg",
    false,
  ],
  // [
  //   "Gmail",
  //   "Synchronize leads pipeline and client timeline",
  //   "/settings/integrations/gmail.svg",
  //   false,
  // ],
  [
    "Salesforce",
    "Migrate active enterprise contracts and deals",
    "/settings/integrations/salesforce-bg.png",
    false,
  ],
  [
    "HubSpot CRM",
    "Synchronize leads pipeline and client timeline",
    "/settings/integrations/hubspot.svg",
    false,
  ],
  [
    "Custom CRM API",
    "Synchronize leads pipeline and client timeline",
    "/settings/integrations/custom-crm.svg",
    false,
  ],
] as const;

export function IntegrationsPanel() {
  const { data: session } = useSession();
  const [isGoogleConnecting, setIsGoogleConnecting] = useState(false);
  const [isCheckingGoogle, setIsCheckingGoogle] = useState(true);
  const [isGoogleConnected, setIsGoogleConnected] = useState(false);

  useEffect(() => {
    const accessToken = session?.user.accessToken;

    if (!accessToken) {
      setIsCheckingGoogle(false);
      return;
    }

    const controller = new AbortController();

    const checkGoogleConnection = async () => {
      setIsCheckingGoogle(true);

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/google-meetings/oauth/connection`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
            signal: controller.signal,
          },
        );
        const result = (await response
          .json()
          .catch(() => ({}))) as ConnectionResponse;

        if (!response.ok) {
          throw new Error(
            result.message || "Unable to check Google Calendar connection.",
          );
        }

        const connection =
          result.data?.connection ??
          result.data?.connected ??
          result.data?.isConnected ??
          result.data?.active ??
          result.connection ??
          (result.data?.status === "active" ||
            result.data?.status === "connected");

        setIsGoogleConnected(Boolean(connection));
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError")
          return;
        setIsGoogleConnected(false);
      } finally {
        if (!controller.signal.aborted) setIsCheckingGoogle(false);
      }
    };

    void checkGoogleConnection();

    return () => controller.abort();
  }, [session?.user.accessToken]);

  const connectGoogleCalendar = async () => {
    if (isGoogleConnecting) return;

    const accessToken = session?.user.accessToken;
    if (!accessToken) {
      toast.error("Your session is missing. Please sign in again.");
      return;
    }

    // Opening the tab before the request prevents browsers from blocking it.
    const oauthWindow = window.open("about:blank", "_blank");
    if (!oauthWindow) {
      toast.error("Please allow pop-ups to connect Google Calendar.");
      return;
    }

    oauthWindow.document.title = "Connecting Google Calendar...";
    setIsGoogleConnecting(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/google-meetings/oauth/connect`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        },
      );
      const result = (await response
        .json()
        .catch(() => ({}))) as OAuthConnectResponse;
      const redirectUrl =
        result.data?.authorizationUrl ??
        result.data?.url ??
        result.data?.link ??
        result.data?.redirectUrl ??
        result.data?.authUrl ??
        result.url ??
        result.link ??
        result.redirectUrl ??
        result.authUrl;

      if (!response.ok || !redirectUrl) {
        throw new Error(result.message || "Unable to connect Google Calendar.");
      }

      oauthWindow.location.href = redirectUrl;
    } catch (error) {
      oauthWindow.close();
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to connect Google Calendar.",
      );
    } finally {
      setIsGoogleConnecting(false);
    }
  };

  return (
    <section className="overflow-hidden rounded-lg bg-white">
      <header className="border-b border-[#E4EAF8] p-4">
        <h2 className="text-xl font-medium text-[#0E1224]">Integrations</h2>
      </header>
      <div className="grid gap-4 p-4 md:grid-cols-2">
        {integrations.map(([name, description, icon, connected]) => {
          const isGoogleCalendar = name === "Google Account";

          return (
            <IntegrationCard
              key={name}
              name={name}
              description={description}
              icon={icon}
              initiallyConnected={connected}
              connected={isGoogleCalendar ? isGoogleConnected : undefined}
              isLoading={
                isGoogleCalendar && (isCheckingGoogle || isGoogleConnecting)
              }
              onConnect={
                isGoogleCalendar && !isGoogleConnected
                  ? () => void connectGoogleCalendar()
                  : undefined
              }
            />
          );
        })}
      </div>
    </section>
  );
}
