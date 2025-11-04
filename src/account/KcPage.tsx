import "@/global.css";
import { Suspense } from "react";
import type { ClassKey } from "keycloakify/account";
import type { KcContext } from "./KcContext";
import { useI18n } from "./i18n";
import DefaultPage from "keycloakify/account/DefaultPage";
import Template from "./Template";
import { ThemeProvider } from "@/components/theme-provider";

import Account from "./pages/Account";
import Applications from "./pages/Applications";
import Sessions from "./pages/Sessions";
import Password from "./pages/Password";
import Totp from "./pages/Totp";
import Log from "./pages/Log";
import FederatedIdentity from "./pages/FederatedIdentity";

export default function KcPage(props: { kcContext: KcContext }) {
    const { kcContext } = props;

    const { i18n } = useI18n({ kcContext });

    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem storageKey="keycloak-theme">
            <Suspense>
                {(() => {
                    switch (kcContext.pageId) {
                        case "account.ftl":
                            return <Account {...{ kcContext, i18n, classes }} Template={Template} doUseDefaultCss={true} />;
                        case "applications.ftl":
                            return <Applications {...{ kcContext, i18n, classes }} Template={Template} doUseDefaultCss={true} />;
                        case "sessions.ftl":
                            return <Sessions {...{ kcContext, i18n, classes }} Template={Template} doUseDefaultCss={true} />;
                        case "password.ftl":
                            return <Password {...{ kcContext, i18n, classes }} Template={Template} doUseDefaultCss={true} />;
                        case "totp.ftl":
                            return <Totp {...{ kcContext, i18n, classes }} Template={Template} doUseDefaultCss={true} />;
                        case "log.ftl":
                            return <Log {...{ kcContext, i18n, classes }} Template={Template} doUseDefaultCss={true} />;
                        case "federatedIdentity.ftl":
                            return <FederatedIdentity {...{ kcContext, i18n, classes }} Template={Template} doUseDefaultCss={true} />;
                        default:
                            return <DefaultPage kcContext={kcContext} i18n={i18n} classes={classes} Template={Template} doUseDefaultCss={true} />;
                    }
                })()}
            </Suspense>
        </ThemeProvider>
    );
}

const classes = {} satisfies { [key in ClassKey]?: string };
