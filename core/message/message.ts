namespace TSE {
    export enum MessagePriority {
        NORMAL,
        HIGH
    }
    export class Message {
        public code: string;

        public context: any;

        public sender: any;

        public priority: MessagePriority;

        public constructor(code: string, sender: any, context?: any, priority: MessagePriority = MessagePriority.NORMAL) {
            this.code = code;
            this.sender = sender;
            this.context = context;
            this.priority = priority;
        }

        /**
         * send message
         * @param code
         * @param sender
         * @param context
         */
        public static send(code: string, sender: any, context?: any): void {
            MessageBus.post(new Message(code, sender, context, MessagePriority.NORMAL));
        }
        /**
         * send message with priority
         * @param code
         * @param sender
         * @param context
         */
        public static sendPriority(code: string, sender: any, context?: any): void {
            MessageBus.post(new Message(code, sender, context, MessagePriority.HIGH));
        }

        public static subscribe(code: string, handler: IMessageHandler): void {
            MessageBus.addSubcription(code, handler);
        }

        public static unsubscribe(code: string, handler: IMessageHandler): void {
            MessageBus.removeSubcription(code, handler);
        }
    }
}