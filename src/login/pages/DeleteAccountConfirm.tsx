import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";

export default function DeleteAccountConfirm(props: PageProps<Extract<KcContext, { pageId: "delete-account-confirm.ftl" }>, I18n>) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

  const { url, triggered_from_aia } = kcContext;

  const { msg, msgStr } = i18n;

  return (
    <Template kcContext={kcContext} i18n={i18n} doUseDefaultCss={doUseDefaultCss} classes={classes} headerNode={msg("deleteAccountConfirm")}>
      <form action={url.loginAction} method="post" className="space-y-6">
        
        {/* Warning Alert */}
        <div className="flex items-start gap-3 p-4 bg-yellow-500/20 backdrop-blur-sm border border-yellow-400/30 rounded-xl">
          <div className="shrink-0">
            <svg className="w-6 h-6 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-yellow-100">
              {msg("irreversibleAction")}
            </p>
          </div>
        </div>

        {/* Information */}
        <div className="space-y-4">
          <p className="text-white/90 text-sm">
            {msg("deletingImplies")}
          </p>
          
          <ul className="space-y-2 text-white/80 text-sm pl-1">
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-red-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span>{msg("loggingOutImmediately")}</span>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-red-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <span>{msg("errasingData")}</span>
            </li>
          </ul>
          
          <p className="text-white/90 text-sm font-medium bg-red-500/10 backdrop-blur-sm border border-red-400/30 rounded-xl p-4">
            {msg("finalDeletionConfirmation")}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
          {triggered_from_aia && (
            <Button
              type="submit"
              name="cancel-aia"
              value="true"
              className="flex-1 h-11 bg-white/5 backdrop-blur-sm border border-white/20 text-white hover:bg-white/15 hover:border-white/30 transition-all duration-200 rounded-xl"
              style={{ backdropFilter: 'blur(12px)' }}
            >
              {msgStr("doCancel")}
            </Button>
          )}
          <Button
            type="submit"
            className="flex-1 h-11 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 hover:shadow-xl text-white font-medium rounded-xl transition-all duration-200 shadow-lg border-0"
          >
            {msgStr("doConfirmDelete")}
          </Button>
        </div>
      </form>
    </Template>
  );
}
