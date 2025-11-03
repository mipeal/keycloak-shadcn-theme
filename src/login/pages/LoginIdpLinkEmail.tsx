import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";

export default function LoginIdpLinkEmail(props: PageProps<Extract<KcContext, { pageId: "login-idp-link-email.ftl" }>, I18n>) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

  const { url, realm, brokerContext, idpAlias } = kcContext;

  const { msg } = i18n;

  return (
    <Template kcContext={kcContext} i18n={i18n} doUseDefaultCss={doUseDefaultCss} classes={classes} headerNode={msg("emailLinkIdpTitle", idpAlias)}>
      <p id="instruction1" className="instruction">
        {msg("emailLinkIdp1", idpAlias, brokerContext.username, realm.displayName)}
      </p>
      <p id="instruction2" className="instruction flex items-center gap-1 flex-wrap">
        {msg("emailLinkIdp2")}{" "}
        <Button variant="link" className="h-auto p-0 text-blue-300 hover:text-blue-200" asChild>
          <a href={url.loginAction}>{msg("doClickHere")}</a>
        </Button>{" "}
        {msg("emailLinkIdp3")}
      </p>
      <p id="instruction3" className="instruction flex items-center gap-1 flex-wrap">
        {msg("emailLinkIdp4")}{" "}
        <Button variant="link" className="h-auto p-0 text-blue-300 hover:text-blue-200" asChild>
          <a href={url.loginAction}>{msg("doClickHere")}</a>
        </Button>{" "}
        {msg("emailLinkIdp5")}
      </p>
    </Template>
  );
}
