import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";

export default function LoginIdpLinkConfirm(props: PageProps<Extract<KcContext, { pageId: "login-idp-link-confirm.ftl" }>, I18n>) {
  const { kcContext, i18n, Template } = props;

  const { url, idpAlias } = kcContext;

  const { msg } = i18n;

  return (
    <Template {...props} headerNode={msg("confirmLinkIdpTitle")}>
      <div className="w-full max-w-md">
        <div className="py-2 px-4 sm:rounded-lg sm:px-6">
          <form id="kc-register-form" action={url.loginAction} method="post" className="space-y-4">
            <Button
              type="submit"
              variant="outline"
              className="w-full"
              name="submitAction"
              id="updateProfile"
              value="updateProfile"
            >
              {msg("confirmLinkIdpReviewProfile")}
            </Button>
            <Button
              type="submit"
              className="w-full"
              name="submitAction"
              id="linkAccount"
              value="linkAccount"
            >
              {msg("confirmLinkIdpContinue", idpAlias)}
            </Button>
          </form>
        </div>
      </div>
    </Template>
  );
}
