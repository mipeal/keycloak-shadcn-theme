import type { PageProps } from "keycloakify/account/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { LogOut } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const formatDate = (dateString: string | undefined): string => {
  if (!dateString) return "-";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  } catch {
    return dateString;
  }
};

export default function Sessions(props: PageProps<Extract<KcContext, { pageId: "sessions.ftl" }>, I18n>) {
  const { kcContext, i18n, Template } = props;

  const { url, stateChecker, sessions } = kcContext;
  const { msg } = i18n;

  return (
    <Template {...props} active="sessions">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">{msg("sessionsHtmlTitle")}</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-info rounded-full" />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Active Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <TooltipProvider>
              <div className="overflow-x-auto rounded-lg border border-border/50">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/30 border-b border-border/30">
                      <TableHead className="min-w-[120px] py-3 px-6 font-semibold text-foreground">{msg("ip")}</TableHead>
                      <TableHead className="min-w-[160px] py-3 px-6 font-semibold text-foreground">{msg("started")}</TableHead>
                      <TableHead className="min-w-[160px] py-3 px-6 font-semibold text-foreground">{msg("lastAccess")}</TableHead>
                      <TableHead className="min-w-[160px] py-3 px-6 font-semibold text-foreground">{msg("expires")}</TableHead>
                      <TableHead className="min-w-[200px] py-3 px-6 font-semibold text-foreground">{msg("clients")}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sessions.sessions.map((session, index: number) => (
                      <TableRow key={index} className="hover:bg-accent/30 transition-colors">
                        <TableCell className="font-mono text-sm py-4 px-6 text-foreground">{session.ipAddress}</TableCell>
                        <TableCell className="py-4 px-6 text-foreground">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="text-sm whitespace-nowrap">{formatDate(session?.started)}</span>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-xs">{session?.started || "-"}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TableCell>
                        <TableCell className="py-4 px-6 text-foreground">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="text-sm whitespace-nowrap">{formatDate(session?.lastAccess)}</span>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-xs">{session?.lastAccess || "-"}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TableCell>
                        <TableCell className="py-4 px-6 text-foreground">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="text-sm whitespace-nowrap">{formatDate(session?.expires)}</span>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-xs">{session?.expires || "-"}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TableCell>
                        <TableCell className="py-4 px-6">
                          <div className="flex flex-wrap gap-1">
                            {session.clients.map((client: string, clientIndex: number) => (
                              <Badge key={clientIndex} variant="secondary" className="text-xs my-1 text-foreground">
                                {client}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TooltipProvider>
          </CardContent>
        </Card>

        <form action={url.sessionsUrl} method="post">
          <input type="hidden" id="stateChecker" name="stateChecker" value={stateChecker} />
          <Button
            id="logout-all-sessions"
            type="submit"
            variant="destructive"
            className="w-full sm:w-auto"
          >
            <LogOut className="h-4 w-4 mr-2" />
            {msg("doLogOutAllSessions")}
          </Button>
        </form>
      </div>
    </Template>
  );
}
