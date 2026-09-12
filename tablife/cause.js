function getCause(title) {

    title = title.toLowerCase();

    if(title.includes("youtube"))
        return "Time Well Wasted";

    if(title.includes("react"))
        return "False Ambition";

    if(title.includes("chatgpt"))
        return "Question Answered";

    if(title.includes("github"))
        return "Dependency Issues";

    if(title.includes("stackoverflow"))
        return "Copied Without Understanding";

    if(title.includes("amazon"))
        return "Financial Reality";

    return "Lost Relevance";
}