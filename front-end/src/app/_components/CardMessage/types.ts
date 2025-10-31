type Channel = 'WhatsApp' | 'Email' | 'Webchat' | string;

type ConversationStatus =
    | 'resolved'
    | 'pending_human_transfer'
    | 'pending_agent_response'
    | 'pending_chatbot'
    | string;

type MessageSender = 'user' | 'chatbot' | 'agent' | string;

export interface ContactInfo {
    name: string | null;
    phoneNumber?: string;
    email?: string;
    ipAddress?: string;
}

export interface LastMessage {
    sender: MessageSender;
    text: string;
}

export interface ConversationData {
    id: string;
    channel: Channel;
    contactInfo: ContactInfo;
    timestamp: string; 
    status: ConversationStatus;
    unread: boolean;
    topic: string;
    conversationSummary: string;
    lastMessage: LastMessage;
}
