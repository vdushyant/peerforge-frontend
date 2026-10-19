import { useEffect, useRef, useState, type FormEvent } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ExternalLink, MessageCircle, Send, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { queryKeys } from "@/lib/queryKeys";
import { getSessionMessagesApi, sendSessionMessageApi, updateMeetingLinkApi } from "../api/sessionApi";
import type { Session } from "../types/session";

interface SessionConversationPanelProps {
  session: Session;
  isMentor: boolean;
}

export default function SessionConversationPanel({ session, isMentor }: SessionConversationPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [meetingLink, setMeetingLink] = useState(session.meetingLink ?? "");
  const [linkFeedback, setLinkFeedback] = useState("");
  const queryClient = useQueryClient();
  const endOfMessages = useRef<HTMLDivElement>(null);
  const messagesQuery = useQuery({
    queryKey: queryKeys.session.messages(session.id),
    queryFn: () => getSessionMessagesApi(session.id),
    enabled: isOpen,
    refetchInterval: isOpen ? 15_000 : false,
  });

  const sendMutation = useMutation({
    mutationFn: () => sendSessionMessageApi(session.id, message.trim()),
    onSuccess: () => {
      setMessage("");
      void queryClient.invalidateQueries({ queryKey: queryKeys.session.messages(session.id) });
    },
  });
  const linkMutation = useMutation({
    mutationFn: () => updateMeetingLinkApi(session.id, meetingLink.trim()),
    onSuccess: (updated) => {
      setMeetingLink(updated.meetingLink ?? "");
      setLinkFeedback("Meeting link saved.");
      void queryClient.invalidateQueries({ queryKey: queryKeys.session.me });
      void queryClient.invalidateQueries({ queryKey: queryKeys.session.mentor });
    },
    onError: () => setLinkFeedback("Could not save the meeting link. Use a valid HTTPS link."),
  });

  useEffect(() => {
    if (isOpen) endOfMessages.current?.scrollIntoView({ behavior: "smooth" });
  }, [isOpen, messagesQuery.data]);

  function submitMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (message.trim() && !sendMutation.isPending) sendMutation.mutate();
  }

  function submitMeetingLink(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLinkFeedback("");
    if (meetingLink.trim() && !linkMutation.isPending) linkMutation.mutate();
  }

  return (
    <section className="mt-3 rounded-xl border border-white/[0.08] bg-[#091116] p-3">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-100">
          <MessageCircle className="h-4 w-4 text-emerald-200" />
          Coordinate with {isMentor ? session.clientName : session.mentorName}
        </div>
        <Button type="button" variant="outline" size="sm" onClick={() => setIsOpen((open) => !open)}>
          {isOpen ? "Close" : "Messages"}
        </Button>
      </div>

      {session.meetingLink && (
        <a href={session.meetingLink} target="_blank" rel="noreferrer" className="mt-3 flex items-center gap-2 rounded-lg border border-emerald-100/10 bg-emerald-200/[0.05] px-3 py-2 text-sm text-emerald-100 hover:bg-emerald-200/[0.09]">
          <Video className="h-4 w-4" /> Open session meeting <ExternalLink className="ml-auto h-3.5 w-3.5" />
        </a>
      )}

      {isMentor && session.status === "CONFIRMED" && (
        <form onSubmit={submitMeetingLink} className="mt-3 space-y-2">
          <label htmlFor={`meeting-link-${session.id}`} className="text-xs font-medium text-slate-400">Meeting link (HTTPS)</label>
          <div className="flex gap-2">
            <Input id={`meeting-link-${session.id}`} type="url" value={meetingLink} onChange={(event) => setMeetingLink(event.target.value)} placeholder="https://meet.google.com/..." maxLength={500} className="min-w-0 border-white/10 bg-white/[0.03] text-white" />
            <Button type="submit" variant="outline" disabled={!meetingLink.trim() || linkMutation.isPending}>{linkMutation.isPending ? "Saving…" : "Save"}</Button>
          </div>
          {linkFeedback && <p className="text-xs text-slate-400" role="status">{linkFeedback}</p>}
        </form>
      )}

      {isOpen && (
        <div className="mt-3 border-t border-white/[0.07] pt-3">
          <div className="max-h-64 space-y-2 overflow-y-auto pr-1" aria-live="polite">
            {messagesQuery.isLoading && <p className="py-5 text-center text-xs text-slate-500">Loading messages…</p>}
            {messagesQuery.isError && <p className="py-5 text-center text-xs text-rose-300">Could not load this conversation.</p>}
            {messagesQuery.data?.length === 0 && <p className="py-5 text-center text-xs text-slate-500">No messages yet. Send a note to coordinate your session.</p>}
            {messagesQuery.data?.map((item) => (
              <div key={item.id} className={`flex ${item.sentByMe ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] rounded-xl px-3 py-2 ${item.sentByMe ? "bg-emerald-300/[0.12] text-emerald-50" : "bg-white/[0.06] text-slate-200"}`}>
                  <p className="mb-1 text-[10px] text-slate-400">{item.sentByMe ? "You" : item.senderName} · {new Date(item.createdAt).toLocaleString("en-IN", { dateStyle: "short", timeStyle: "short" })}</p>
                  <p className="whitespace-pre-wrap break-words text-sm">{item.message}</p>
                </div>
              </div>
            ))}
            <div ref={endOfMessages} />
          </div>
          <form onSubmit={submitMessage} className="mt-3 flex items-end gap-2">
            <label className="sr-only" htmlFor={`message-${session.id}`}>Write a message</label>
            <textarea id={`message-${session.id}`} value={message} onChange={(event) => setMessage(event.target.value.slice(0, 2000))} rows={2} maxLength={2000} placeholder="Write a message…" className="min-h-10 flex-1 resize-y rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white outline-none placeholder:text-slate-500 focus:border-emerald-200/30" />
            <Button type="submit" disabled={!message.trim() || sendMutation.isPending} aria-label="Send message"><Send className="h-4 w-4" /></Button>
          </form>
          {sendMutation.isError && <p className="mt-2 text-xs text-rose-300" role="alert">Message could not be sent. Please try again.</p>}
        </div>
      )}
    </section>
  );
}
