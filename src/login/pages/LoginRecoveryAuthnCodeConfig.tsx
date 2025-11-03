import { clsx } from "keycloakify/tools/clsx";
import { useScript } from "keycloakify/login/pages/LoginRecoveryAuthnCodeConfig.useScript";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function LoginRecoveryAuthnCodeConfig(props: PageProps<Extract<KcContext, { pageId: "login-recovery-authn-code-config.ftl" }>, I18n>) {
  const { kcContext, i18n, Template } = props;

  const { recoveryAuthnCodesConfigBean, isAppInitiatedAction } = kcContext;

  const { msg, msgStr } = i18n;

  const olRecoveryCodesListId = "kc-recovery-codes-list";

  useScript({ olRecoveryCodesListId, i18n });

  return (
    <Template {...props} headerNode={msg("recovery-code-config-header")}>
      <div className={clsx("pf-c-alert", "pf-m-warning", "pf-m-inline", "my-4")} aria-label="Warning alert">
        <div className="pf-c-alert__icon">
          <i className="pficon-warning-triangle-o" aria-hidden="true" />
        </div>
        <h4 className="pf-c-alert__title">
          <span className="pf-screen-reader">Warning alert:</span>
          {msg("recovery-code-config-warning-title")}
        </h4>
        <div className="pf-c-alert__description">
          <p>{msg("recovery-code-config-warning-message")}</p>
        </div>
      </div>

      <ol id={olRecoveryCodesListId} className="space-y-2 my-6 font-mono">
        {recoveryAuthnCodesConfigBean.generatedRecoveryAuthnCodesList.map((code, index) => (
          <li key={index}>
            <span>{index + 1}:</span> {code.slice(0, 4)}-{code.slice(4, 8)}-{code.slice(8)}
          </li>
        ))}
      </ol>

      {/* actions */}
      <div className="flex flex-wrap gap-4 my-4">
        <Button variant="link" className="h-auto p-0" type="button" id="printRecoveryCodes">
          <i className="pficon-print mr-2" aria-hidden="true" /> {msg("recovery-codes-print")}
        </Button>
        <Button variant="link" className="h-auto p-0" type="button" id="downloadRecoveryCodes">
          <i className="pficon-save mr-2" aria-hidden="true" /> {msg("recovery-codes-download")}
        </Button>
        <Button variant="link" className="h-auto p-0" type="button" id="copyRecoveryCodes">
          <i className="pficon-blueprint mr-2" aria-hidden="true" /> {msg("recovery-codes-copy")}
        </Button>
      </div>

      {/* confirmation checkbox */}
      <div className="flex items-center space-x-2 my-4">
        <Checkbox
          id="kcRecoveryCodesConfirmationCheck"
          name="kcRecoveryCodesConfirmationCheck"
          onCheckedChange={(checked) => {
            const saveBtn = document.getElementById("saveRecoveryAuthnCodesBtn") as HTMLButtonElement;
            if (saveBtn) saveBtn.disabled = !checked;
          }}
        />
        <Label htmlFor="kcRecoveryCodesConfirmationCheck" className="text-sm font-medium text-white/90">
          {msg("recovery-codes-confirmation-message")}
        </Label>
      </div>

      <form action={kcContext.url.loginAction} className="space-y-6" id="kc-recovery-codes-settings-form" method="post">
        <input type="hidden" name="generatedRecoveryAuthnCodes" value={recoveryAuthnCodesConfigBean.generatedRecoveryAuthnCodesAsString} />
        <input type="hidden" name="generatedAt" value={recoveryAuthnCodesConfigBean.generatedAt} />
        <input type="hidden" id="userLabel" name="userLabel" value={msgStr("recovery-codes-label-default")} />

        <div className="flex items-center space-x-2">
          <Checkbox id="logout-sessions" name="logout-sessions" value="on" defaultChecked={true} />
          <Label htmlFor="logout-sessions" className="text-sm font-medium text-white/90">
            {msg("logoutOtherSessions")}
          </Label>
        </div>

        <div className="flex gap-4">
          {isAppInitiatedAction ? (
            <>
              <Button type="submit" className="flex-1" id="saveRecoveryAuthnCodesBtn" disabled>
                {msgStr("recovery-codes-action-complete")}
              </Button>
              <Button variant="outline" className="flex-1" type="submit" id="cancelRecoveryAuthnCodesBtn" name="cancel-aia" value="true">
                {msg("recovery-codes-action-cancel")}
              </Button>
            </>
          ) : (
            <Button type="submit" className="w-full" id="saveRecoveryAuthnCodesBtn" disabled>
              {msgStr("recovery-codes-action-complete")}
            </Button>
          )}
        </div>
      </form>
    </Template>
  );
}
