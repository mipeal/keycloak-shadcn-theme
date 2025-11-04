import type { PageProps } from "keycloakify/account/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, X } from "lucide-react";

export default function Applications(props: PageProps<Extract<KcContext, { pageId: "applications.ftl" }>, I18n>) {
  const { kcContext, i18n, Template } = props;

  const {
    url,
    applications: { applications },
    stateChecker
  } = kcContext;

  const { msg, advancedMsg } = i18n;

  return (
    <Template {...props} active="applications">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">{msg("applicationsHtmlTitle")}</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-info rounded-full" />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Authorized Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={url.applicationsUrl} method="post">
              <input type="hidden" id="stateChecker" name="stateChecker" value={stateChecker} />
              <input type="hidden" id="referrer" name="referrer" value={stateChecker} />

              <div className="overflow-x-auto rounded-lg border border-border/50">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/30 border-b border-border/30">
                      <TableHead className="min-w-[180px] py-3 px-6 font-semibold text-foreground">{msg("application")}</TableHead>
                      <TableHead className="min-w-[250px] py-3 px-6 font-semibold text-foreground">{msg("availableRoles")}</TableHead>
                      <TableHead className="min-w-[200px] py-3 px-6 font-semibold text-foreground">{msg("grantedPermissions")}</TableHead>
                      <TableHead className="min-w-[180px] py-3 px-6 font-semibold text-foreground">{msg("additionalGrants")}</TableHead>
                      <TableHead className="text-right min-w-[120px] py-3 px-6 font-semibold text-foreground">{msg("action")}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {applications.map(application => (
                      <TableRow key={application.client.clientId} className="hover:bg-accent/30 transition-colors">
                        <TableCell className="font-medium py-4 px-6 text-foreground">
                          {application.effectiveUrl ? (
                            <a
                              href={application.effectiveUrl}
                              className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {(application.client.name && advancedMsg(application.client.name)) || application.client.clientId}
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          ) : (
                            (application.client.name && advancedMsg(application.client.name)) || application.client.clientId
                          )}
                        </TableCell>

                        <TableCell className="max-w-xs py-4 px-6">
                          <div className="flex flex-wrap gap-1.5">
                            {!isArrayWithEmptyObject(application.realmRolesAvailable) &&
                              application.realmRolesAvailable.map((role) => (
                                <Badge key={role.name} variant="secondary" className="text-sm px-2.5 py-1 font-medium my-1">
                                  {role.description ? advancedMsg(role.description) : advancedMsg(role.name)}
                                </Badge>
                              ))}
                            {application.resourceRolesAvailable &&
                              Object.keys(application.resourceRolesAvailable).map(resource => (
                                <span key={resource} className="flex flex-wrap gap-1.5">
                                  {application.resourceRolesAvailable[resource].map(clientRole => (
                                    <Badge key={clientRole.roleName} variant="outline" className="text-sm px-2.5 py-1 font-medium border-primary/30 my-1">
                                      {clientRole.roleDescription
                                        ? advancedMsg(clientRole.roleDescription)
                                        : advancedMsg(clientRole.roleName)}{" "}
                                      <span className="text-muted-foreground">in</span>{" "}
                                      <strong className="text-primary">
                                        {clientRole.clientName ? advancedMsg(clientRole.clientName) : clientRole.clientId}
                                      </strong>
                                    </Badge>
                                  ))}
                                </span>
                              ))}
                            {(!application.realmRolesAvailable || isArrayWithEmptyObject(application.realmRolesAvailable)) &&
                              (!application.resourceRolesAvailable || Object.keys(application.resourceRolesAvailable).length === 0) && (
                                <span className="text-sm text-muted-foreground italic my-1 block">No roles</span>
                              )}
                          </div>
                        </TableCell>

                        <TableCell className="max-w-xs py-4 px-6">
                          {application.client.consentRequired ? (
                            <div className="flex flex-wrap gap-1.5">
                              {application.clientScopesGranted.length > 0 ? (
                                application.clientScopesGranted.map(claim => (
                                  <Badge key={claim} variant="secondary" className="text-sm px-2.5 py-1 font-medium bg-primary/10 text-primary border-primary/20 my-1">
                                    {advancedMsg(claim)}
                                  </Badge>
                                ))
                              ) : (
                                <span className="text-sm text-muted-foreground italic my-1 block">No permissions</span>
                              )}
                            </div>
                          ) : (
                            <Badge variant="default" className="text-sm px-3 py-1.5 font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 my-1">
                              {msg("fullAccess")}
                            </Badge>
                          )}
                        </TableCell>

                        <TableCell className="max-w-xs py-4 px-6">
                          <div className="flex flex-wrap gap-1.5">
                            {application.additionalGrants.length > 0 ? (
                              application.additionalGrants.map(grant => (
                                <Badge key={grant} variant="outline" className="text-sm px-2.5 py-1 font-medium border-info/30 text-info my-1">
                                  {advancedMsg(grant)}
                                </Badge>
                              ))
                            ) : (
                              <span className="text-sm text-muted-foreground italic my-1 block">None</span>
                            )}
                          </div>
                        </TableCell>

                        <TableCell className="text-right py-4 px-6">
                          {(application.client.consentRequired && application.clientScopesGranted.length > 0) ||
                            application.additionalGrants.length > 0 ? (
                            <Button
                              type="submit"
                              variant="destructive"
                              size="sm"
                              id={`revoke-${application.client.clientId}`}
                              name="clientId"
                              value={application.client.id}
                            >
                              <X className="h-4 w-4 mr-1" />
                              {msg("revoke")}
                            </Button>
                          ) : null}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Template>
  );
}

function isArrayWithEmptyObject(variable: any): boolean {
  return Array.isArray(variable) && variable.length === 1 && typeof variable[0] === "object" && Object.keys(variable[0]).length === 0;
}
