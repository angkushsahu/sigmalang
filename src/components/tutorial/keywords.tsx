const keywords = {
    and: "and",
    or: "or",
    for: "for",
    if: "if",
    "else if": "else if",
    else: "else",
    function: "funk",
    class: "gang",
    null: "npc",
    print: "yap",
    return: "bounce",
    super: "og",
    this: "me",
    true: "fax",
    false: "cap",
    var: "aura",
    while: "spam"
};

export function Keywords() {
    return (
        <div>
            <p className="text-xl font-medium">Keywords</p>
            <p className="text-muted mt-2 text-sm">
                Why use boring programming words when you can sound like you've been scrolling
                short-form videos for six hours straight 📱?
            </p>
            <div className="mt-4 space-y-2 rounded-lg bg-neutral-900 p-4 text-sm text-neutral-300 ring ring-neutral-800">
                <div className="flex text-center">
                    <p className="flex-1 border-b-2 border-b-neutral-800 pr-8 pb-2">
                        Sigma Lang Keywords
                    </p>
                    <p className="flex-1 border-b-2 border-b-neutral-800 pb-2">Meaning</p>
                </div>
                {Object.entries(keywords).map(([meaning, keyword]) => (
                    <div
                        key={`Keyword-for-${keyword}`}
                        className="flex rounded-md px-3 py-2 text-center even:bg-neutral-800"
                    >
                        <p className="flex-1">{keyword}</p>
                        <p className="flex-1">{meaning}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
