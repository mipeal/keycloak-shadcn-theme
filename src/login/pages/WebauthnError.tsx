import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";

export default function WebauthnError(props: PageProps<Extract<KcContext, { pageId: "webauthn-error.ftl" }>, I18n>) {
  const { kcContext, i18n, Template } = props;

  const { url, isAppInitiatedAction } = kcContext;

  const { msg, msgStr } = i18n;

  return (
    <Template {...props} displayMessage headerNode={msg("webauthn-error-title")}>
      <div className="w-full max-w-md">
        <div className="py-2 px-4 sm:rounded-lg sm:px-6">
          <form id="kc-error-credential-form" className="space-y-6" action={url.loginAction} method="post">
            <input type="hidden" id="executionValue" name="authenticationExecution" />
            <input type="hidden" id="isSetRetry" name="isSetRetry" />
          </form>
          
          <div className="space-y-4 mt-6">
            <Button
              tabIndex={4}
              onClick={() => {
                // @ts-expect-error: Trusted Keycloak's code
                document.getElementById("isSetRetry").value = "retry";
                // @ts-expect-error: Trusted Keycloak's code
                document.getElementById("executionValue").value = "${execution}";
                // @ts-expect-error: Trusted Keycloak's code
                document.getElementById("kc-error-credential-form").submit();
              }}
              type="button"
              className="w-full"
              name="try-again"
              id="kc-try-again"
            >
              {msgStr("doTryAgain")}
            </Button>
            
            {isAppInitiatedAction && (
              <form action={url.loginAction} id="kc-webauthn-settings-form" method="post">
                <Button
                  type="submit"
                  variant="outline"
                  className="w-full"
                  id="cancelWebAuthnAIA"
                  name="cancel-aia"
                  value="true"
                >
                  {msgStr("doCancel")}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </Template>
  );
}
