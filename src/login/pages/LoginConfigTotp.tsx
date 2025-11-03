import { useState } from "react";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

export default function LoginConfigTotp(props: PageProps<Extract<KcContext, { pageId: "login-config-totp.ftl" }>, I18n>) {
  const { kcContext, i18n, Template } = props;
  const { url, isAppInitiatedAction, totp, mode, messagesPerField } = kcContext;
  const { msg, msgStr, advancedMsg } = i18n;
  const [qrDialogOpen, setQrDialogOpen] = useState(false);
  const [appsListOpen, setAppsListOpen] = useState(false);
  const [manualDetailsOpen, setManualDetailsOpen] = useState(false);

  return (
    <Template {...props} headerNode={msg("loginTotpTitle")} displayMessage={!messagesPerField.existsError("totp", "userLabel")}>
      <div className="w-full max-w-4xl">
        <div className="py-2 px-4 sm:rounded-lg sm:px-6">
          <Card className="mb-6">
            <CardContent className="pt-6">
              <ol className="space-y-8 list-none counter-reset-item">
                <li className="space-y-3 relative pl-8">
                  <div className="absolute left-0 top-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                    1
                  </div>
                  <p className="text-sm font-semibold text-foreground">{msg("loginTotpStep1")}</p>
                  <Collapsible open={appsListOpen} onOpenChange={setAppsListOpen} className="ml-2">
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm" className="flex items-center gap-2 p-0 h-auto hover:bg-transparent text-foreground">
                        <svg 
                          className={`w-4 h-4 transition-transform ${appsListOpen ? 'rotate-90' : ''}`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                        <span className="text-xs font-medium">
                          {appsListOpen ? "Hide" : "Show"} apps ({totp.supportedApplications.length})
                        </span>
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-2">
                      <ul className="space-y-2 list-none">
                        {totp.supportedApplications.map((app) => (
                          <li key={app} className="flex items-start gap-2 text-xs text-foreground">
                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                            <span>{advancedMsg(app)}</span>
                          </li>
                        ))}
                      </ul>
                    </CollapsibleContent>
                  </Collapsible>
                </li>

                {mode === "manual" ? (
                  <>
                    <li className="space-y-3 relative pl-8">
                      <div className="absolute left-0 top-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                        2
                      </div>
                      <p className="text-sm font-semibold text-foreground">{msg("loginTotpManualStep2")}</p>
                      <div className="bg-muted p-4 rounded-md border">
                        <code className="text-xs font-mono break-all text-foreground">{totp.totpSecretEncoded}</code>
                      </div>
                      <Button variant="link" className="h-auto p-0" asChild>
                        <a href={totp.qrUrl}>{msg("loginTotpScanBarcode")}</a>
                      </Button>
                    </li>
                    <li className="space-y-3 relative pl-8">
                      <div className="absolute left-0 top-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                        3
                      </div>
                      <p className="text-sm font-semibold text-foreground">{msg("loginTotpManualStep3")}</p>
                      <Collapsible open={manualDetailsOpen} onOpenChange={setManualDetailsOpen} className="ml-2">
                        <CollapsibleTrigger asChild>
                          <Button variant="ghost" size="sm" className="flex items-center gap-2 p-0 h-auto hover:bg-transparent text-foreground">
                            <svg 
                              className={`w-4 h-4 transition-transform ${manualDetailsOpen ? 'rotate-90' : ''}`} 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                            <span className="text-xs font-medium">
                              {manualDetailsOpen ? "Hide" : "Show"} config details
                            </span>
                          </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-2">
                          <div className="space-y-2 bg-muted/50 p-4 rounded-md border">
                            <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-xs">
                              <span className="font-medium text-foreground">{msg("loginTotpType")}:</span>
                              <span className="text-foreground">{msg(`loginTotp.${totp.policy.type}`)}</span>
                              
                              <span className="font-medium text-foreground">{msg("loginTotpAlgorithm")}:</span>
                              <span className="text-foreground">{totp.policy.getAlgorithmKey()}</span>
                              
                              <span className="font-medium text-foreground">{msg("loginTotpDigits")}:</span>
                              <span className="text-foreground">{totp.policy.digits}</span>
                              
                              {totp.policy.type === "totp" ? (
                                <>
                                  <span className="font-medium text-foreground">{msg("loginTotpInterval")}:</span>
                                  <span className="text-foreground">{totp.policy.period}</span>
                                </>
                              ) : (
                                <>
                                  <span className="font-medium text-foreground">{msg("loginTotpCounter")}:</span>
                                  <span className="text-foreground">{totp.policy.initialCounter}</span>
                                </>
                              )}
                            </div>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    </li>
                  </>
                ) : (
                  <li className="space-y-3 relative pl-8">
                    <div className="absolute left-0 top-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                      2
                    </div>
                    <p className="text-sm font-semibold text-foreground">{msg("loginTotpStep2")}</p>
                    <div className="flex flex-col items-center gap-3">
                      <Dialog open={qrDialogOpen} onOpenChange={setQrDialogOpen}>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                            </svg>
                            {msg("loginTotpScanBarcode")}
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>{msg("loginTotpStep2")}</DialogTitle>
                          </DialogHeader>
                          <div className="flex justify-center p-6 bg-white dark:bg-muted rounded-md">
                            <img
                              src={`data:image/png;base64, ${totp.totpSecretQrCode}`}
                              alt="QR Code for TOTP setup"
                              className="max-w-full h-auto"
                            />
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                    <Button variant="link" className="h-auto p-0" asChild>
                      <a href={totp.manualUrl}>{msg("loginTotpUnableToScan")}</a>
                    </Button>
                  </li>
                )}

                <li className="space-y-2 relative pl-8">
                  <div className="absolute left-0 top-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                    {mode === "manual" ? "4" : "3"}
                  </div>
                  <p className="text-sm font-semibold text-foreground">{msg("loginTotpStep3")}</p>
                  <p className="text-xs text-muted-foreground ml-2">{msg("loginTotpStep3DeviceName")}</p>
                </li>
              </ol>
            </CardContent>
          </Card>

          <form action={url.loginAction} id="kc-totp-settings-form" method="post" className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="totp" className="text-sm font-medium text-foreground">
                {msg("authenticatorCode")} <span className="text-destructive">*</span>
              </Label>
              <Input type="text" id="totp" name="totp" autoComplete="off" className="h-10" aria-invalid={messagesPerField.existsError("totp")} />
              {messagesPerField.existsError("totp") && (
                <Alert variant="destructive">
                  <AlertDescription
                    id="input-error-otp-code"
                    aria-live="polite"
                    dangerouslySetInnerHTML={{
                      __html: kcSanitize(messagesPerField.get("totp"))
                    }}
                  />
                </Alert>
              )}
            </div>

            <input type="hidden" id="totpSecret" name="totpSecret" value={totp.totpSecret} />
            {mode && <input type="hidden" id="mode" value={mode} />}

            <div className="space-y-2">
              <Label htmlFor="userLabel" className="text-sm font-medium text-foreground">
                {msg("loginTotpDeviceName")} {totp.otpCredentials.length >= 1 && <span className="text-destructive">*</span>}
              </Label>
              <Input
                type="text"
                id="userLabel"
                name="userLabel"
                autoComplete="off"
                className="h-10"
                aria-invalid={messagesPerField.existsError("userLabel")}
              />
              {messagesPerField.existsError("userLabel") && (
                <Alert variant="destructive">
                  <AlertDescription
                    id="input-error-otp-label"
                    aria-live="polite"
                    dangerouslySetInnerHTML={{
                      __html: kcSanitize(messagesPerField.get("userLabel"))
                    }}
                  />
                </Alert>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="logout-sessions" name="logout-sessions" value="on" defaultChecked={true} />
              <Label htmlFor="logout-sessions" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {msg("logoutOtherSessions")}
              </Label>
            </div>

            <div className="flex gap-4">
              {isAppInitiatedAction ? (
                <>
                  <Button type="submit" id="saveTOTPBtn" className="flex-1">
                    {msgStr("doSubmit")}
                  </Button>
                  <Button type="submit" name="cancel-aia" value="true" variant="outline" id="cancelTOTPBtn" className="flex-1">
                    {msg("doCancel")}
                  </Button>
                </>
              ) : (
                <Button type="submit" id="saveTOTPBtn" className="w-full">
                  {msgStr("doSubmit")}
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </Template>
  );
}
