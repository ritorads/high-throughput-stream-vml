# Settings demoed in the app

The setup in this sandbox is the optimal stream-chat-react config for high throughput chats.
It uses the virtualized message list (based on react-virtuoso). The following settings have been tweaked:

## Fixed images height (see styles.css):

- giphy images
- attachments
- url previews

## Message list props:

- Default item height (reduces item temp jumps)
- Increased viewport bottom (renders new messages faster, no blinking)
- Scroll behavior 'auto' (suitable for high throughput)

You can also test sending/receiving messages with two users using the following urls:

https://m3j4h.csb.app/
https://m3j4h.csb.app/?alt
