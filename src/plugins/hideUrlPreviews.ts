import { MessageTweakerPlugin } from './basePlugin.js';

export default class HideUrlPreviews extends MessageTweakerPlugin {
    protected processXHRMessages(messages: any) {
        messages = messages.map(m => {
            if (m.attachments) {
                m.attachments = m.attachments.filter(m => !m.from_url);
                if (!m.attachments) {
                    delete m.attachments;
                }
            }
            return m;
        });

        return messages;
    }

    protected processWSMessage(data: any) {
        if (data.message && data.message.attachments) {
            data.message.attachments = data.message.attachments.filter(m => !m.from_url);
            if (!data.message.attachments) {
                delete data.message.attachments;
            }
        }
        return data;
    }
}
