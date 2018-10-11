"use babel"

export default {
  signalPrefix: {
    description: "Add a prefix to all signal definitions.",
    type: "string",
    default: "",
    order: 1
  },
  indentType: {
    title: "Indentation",
    description: "Indent using",
    type: "string",
    default: "Spaces",
    enum: ["Spaces", "Tabs"],
    order: 2
  },
  indentSpaceCount: {
    title: "Indentation Space Count",
    description: "Only when using spaces for indentation",
    type: "integer",
    minimum: 0,
    default: 2,
    order: 3
  }
}
