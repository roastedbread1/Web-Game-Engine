namespace TSE {
    export class MessageBus {
        private static _subcriptions: { [code: string]: IMessageHandler[] } = {};

        private static _normalQueueMessagePerUpdate : number = 10;
        private static _normalMessageQueue: MessageSubscriptionNode[] = [];
        private constructor() {

        }


        public static addSubcription(code: string, handler: IMessageHandler): void {
            if (MessageBus._subcriptions[code] === undefined) {
                MessageBus._subcriptions[code] = [];
            }
            /**
             * checking wether or not handler exist
             * if it exist -> do nothing
             * else push the handler into the array
             */
            if (MessageBus._subcriptions[code].indexOf(handler) !== -1) {
                console.warn("Attempting to add a duplicate handler to code : " + code + ". Subcription not added.");
            } else {
                MessageBus._subcriptions[code].push(handler);
            }
        }


        public static removeSubcription(code: string, handler: IMessageHandler): void {
            if (MessageBus._subcriptions[code] === undefined) {
                console.warn("cannot unsubscribe handler from code: " + code + ". Because the code is not subscribed to");
                return;
            }
            /** 
             * if the node is found then splice theh array to unsubscribe
             */
            let nodeIndex = MessageBus._subcriptions[code].indexOf(handler);
            if (nodeIndex !== -1) {
                MessageBus._subcriptions[code].splice(nodeIndex, 1);
            } 
        }

        public static post(message: Message): void {
            console.log("Message posted: ", message);
            let handlers = MessageBus._subcriptions[message.code];

            if (handlers === undefined) {
                return;
            } 
            for (let h of handlers) {
                if (message.priority === MessagePriority.HIGH) {
                    h.onMessage(message);
                } else {
                    MessageBus._normalMessageQueue.push(new MessageSubscriptionNode(message, h));
                }
            }
        }

        public static update(time: number): void {
            if (MessageBus._normalMessageQueue.length === 0) {
                return;
            }

            let messageLimit = Math.min(MessageBus._normalQueueMessagePerUpdate, MessageBus._normalMessageQueue.length);

            for (let i = 0; i < messageLimit; i++) {
                let node = MessageBus._normalMessageQueue.pop();
                node.handler.onMessage(node.message);
            }
        }
    }
}