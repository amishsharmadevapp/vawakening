
"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, User } from "lucide-react"; 
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from '@/context/LanguageContext'; // Import useLanguage

import { vyasCounselor, type VyasCounselorInput, type VyasCounselorOutput } from "@/ai/flows/vyas-counselor";

type Message = {
  id: string;
  text: string;
  sender: "user" | "ai";
};

export default function AiCounselorPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage(); // Get language context

  useEffect(() => {
    document.title = t('page_title_ai_guide');
  }, [t, language]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response: VyasCounselorOutput = await vyasCounselor({ message: userMessage.text });
      const aiMessageText = response.response;

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiMessageText,
        sender: "ai",
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("AI Error:", error);
      toast({
        variant: "destructive",
        title: t('ai_guide_error_title') || "Error",
        description: t('ai_guide_error_desc') || "Failed to get response from Vyas. Please try again.",
      });
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: t('ai_guide_error_message') || "Sorry, I encountered an error. Please try again.",
        sender: "ai",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-grow flex-col items-center justify-center p-4 bg-background text-foreground">
      <Card className="shadow-xl overflow-hidden w-full max-w-3xl h-[85vh] flex flex-col">
        <CardHeader className="bg-muted/50">
          <div className="flex items-center gap-3">
            <div className="p-1 bg-primary text-primary-foreground rounded-full flex items-center justify-center w-8 h-8">
              <Image
                src="https://raw.githubusercontent.com/amishsharmadevapp/vivekafound/main/VYAS-removebg-preview.png"
                alt="Vyas Icon"
                width={20}
                height={20}
                className="rounded-full" 
              />
            </div>
            <div>
              <CardTitle className="font-headline text-2xl text-primary">{t('ai_guide_card_title') || "Chat with Vyas"}</CardTitle>
              <CardDescription>{t('ai_guide_card_desc') || "Your AI spiritual guide for wisdom and reflection."}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 flex-grow overflow-hidden">
          <div className="flex flex-col h-full">
            <ScrollArea className="flex-grow p-4 md:p-6 space-y-4" ref={scrollAreaRef}>
              {messages.length === 0 && (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                      <Image
                        src="https://raw.githubusercontent.com/amishsharmadevapp/vivekafound/main/VYAS-removebg-preview.png"
                        alt="Vyas AI Counselor"
                        width={100}
                        height={100}
                        className="mb-4 rounded-full"
                        data-ai-hint="AI guide"
                        priority
                      />
                      <p className="text-muted-foreground">
                          {t('ai_guide_welcome_message') || "Namaste 🙏 I am Vyas. How may I assist on your journey today?"}
                      </p>
                  </div>
              )}
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-end gap-2 ${
                    message.sender === "user" ? "justify-end" : ""
                  }`}
                >
                  {message.sender === "ai" && (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://raw.githubusercontent.com/amishsharmadevapp/vivekafound/main/VYAS-removebg-preview.png" alt="Vyas" />
                      <AvatarFallback>V</AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`max-w-[70%] rounded-lg p-3 text-sm shadow ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {message.text.split('\n').map((line, index) => (
                      <span key={index}>
                        {line}
                        {index < message.text.split('\n').length - 1 && <br />}
                      </span>
                    ))}
                  </div>
                  {message.sender === "user" && (
                    <Avatar className="h-8 w-8">
                     <AvatarFallback><User size={18}/></AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              {isLoading && (
                  <div className="flex items-center gap-2 p-3">
                      <Avatar className="h-8 w-8">
                          <AvatarImage src="https://raw.githubusercontent.com/amishsharmadevapp/vivekafound/main/VYAS-removebg-preview.png" alt="Vyas" />
                          <AvatarFallback>V</AvatarFallback>
                      </Avatar>
                      <div className="bg-muted p-3 rounded-lg shadow">
                          <span className="italic text-muted-foreground">{t('ai_guide_loading_message') || "Vyas is thinking..."}</span>
                      </div>
                  </div>
              )}
            </ScrollArea>
            <form
              onSubmit={handleSendMessage}
              className="border-t p-4 bg-background flex items-center gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t('ai_guide_input_placeholder') || "Share your thoughts or questions with Vyas..."}
                className="flex-grow"
                disabled={isLoading}
                aria-label="Chat input"
              />
              <Button type="submit" disabled={isLoading || !input.trim()} className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Send className="h-5 w-5" />
                <span className="sr-only">{t('ai_guide_send_button_sr') || "Send"}</span>
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
