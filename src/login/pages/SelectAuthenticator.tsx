import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export default function SelectAuthenticator(props: PageProps<Extract<KcContext, { pageId: "select-authenticator.ftl" }>, I18n>) {
  const { kcContext, i18n, Template } = props;
  const { url, auth } = kcContext;
  const { msg, advancedMsg, advancedMsgStr } = i18n;

  return (
    <Template {...props} displayInfo={false} headerNode={msg("loginChooseAuthenticator")}>
      <div className="w-full max-w-md">
        <div className="py-2 px-4 sm:rounded-lg sm:px-6">
          <form id="kc-select-credential-form" action={url.loginAction} method="post" className="space-y-3">
            {auth.authenticationSelections.map((authenticationSelection, i) => (
              <Button
                key={i}
                type="submit"
                name="authenticationExecution"
                value={authenticationSelection.authExecId}
                variant="outline"
                className="w-full h-auto p-4 flex items-start gap-4 hover:bg-accent overflow-hidden"
              >
                {authenticationSelection.iconCssClass && (
                  <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 mt-0.5">
                    <i className={`${authenticationSelection.iconCssClass} text-primary text-xl`} aria-hidden="true" />
                  </div>
                )}
                <div className="flex-1 min-w-0 overflow-hidden text-left space-y-1 pr-2">
                  <div 
                    className="font-medium text-foreground break-words overflow-wrap-anywhere"
                    title={advancedMsgStr(authenticationSelection.displayName)}
                  >
                    {advancedMsg(authenticationSelection.displayName)}
                  </div>
                  <div 
                    className="text-sm text-muted-foreground break-words overflow-wrap-anywhere"
                    title={advancedMsgStr(authenticationSelection.helpText)}
                  >
                    {advancedMsg(authenticationSelection.helpText)}
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
              </Button>
            ))}
          </form>
        </div>
      </div>
    </Template>
  );
}
