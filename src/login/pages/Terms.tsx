import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";

export default function Terms(props: PageProps<Extract<KcContext, { pageId: "terms.ftl" }>, I18n>) {
  const { kcContext, i18n, Template } = props;
  const { msg, msgStr } = i18n;
  const { url } = kcContext;

  return (
    <Template
      {...props}
      displayMessage={false}
      headerNode={msg("termsTitle")}
    >
      <div className="space-y-6">
        {/* Terms Text */}
        <div 
          id="kc-terms-text" 
          className="rounded-lg bg-muted p-4 sm:p-6 text-sm text-foreground leading-relaxed max-h-[60vh] overflow-y-auto"
        >
          {msg("termsText")}
        </div>

        {/* Action Buttons */}
        <form action={url.loginAction} method="POST" className="flex flex-col sm:flex-row gap-3">
          <Button
            type="submit"
            name="accept"
            id="kc-accept"
            className="flex-1"
          >
            {msgStr("doAccept")}
          </Button>
          <Button
            type="submit"
            name="cancel"
            id="kc-decline"
            variant="outline"
            className="flex-1"
          >
            {msgStr("doDecline")}
          </Button>
        </form>
      </div>
    </Template>
  );
}
