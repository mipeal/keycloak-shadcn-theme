import { useEffect } from "react";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";

export default function FrontchannelLogout(props: PageProps<Extract<KcContext, { pageId: "frontchannel-logout.ftl" }>, I18n>) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

  const { logout } = kcContext;

  const { msg, msgStr } = i18n;

  useEffect(() => {
    if (logout.logoutRedirectUri) {
      window.location.replace(logout.logoutRedirectUri);
    }
  }, []);

  return (
    <Template
      kcContext={kcContext}
      i18n={i18n}
      doUseDefaultCss={doUseDefaultCss}
      classes={classes}
      documentTitle={msgStr("frontchannel-logout.title")}
      headerNode={msg("frontchannel-logout.title")}
    >
      <div className="space-y-4">
        <p className="text-muted-foreground">{msg("frontchannel-logout.message")}</p>
        
        {logout.clients.length > 0 && (
          <div className="space-y-2">
            <ul className="space-y-2 list-none">
              {logout.clients.map((client, index) => (
                <li key={client.name || index} className="flex items-center gap-2 text-sm">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  <span>{client.name}</span>
                  <iframe src={client.frontChannelLogoutUrl} className="hidden" title={`Logout ${client.name}`} />
                </li>
              ))}
            </ul>
          </div>
        )}

        {logout.logoutRedirectUri && (
          <Button className="mt-4" asChild>
            <a id="continue" href={logout.logoutRedirectUri}>
              {msg("doContinue")}
            </a>
          </Button>
        )}
      </div>
    </Template>
  );
}
