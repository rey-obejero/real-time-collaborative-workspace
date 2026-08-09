import type { Discussion } from "./types";

export const discussions: Discussion[] = [
  {
    id: 1,
    title: "PKM v2 launch",
    preview: "Reviewing launch criteria...",
    time: "2h",
    unread: true,
    messages: [
      { sender: "Jane", text: "When is the public beta?" },
      { sender: "Me", text: "Targeting end of August." },
    ],
  },
];
