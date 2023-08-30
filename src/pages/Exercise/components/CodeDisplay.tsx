import React from "react";
import ReactMarkdown from 'react-markdown';

export interface CodeDisplayProps {
    content?: string;
}

const CodeDisplay = ({
    content
}: CodeDisplayProps): JSX.Element => {
    content = content;
    return (
        <pre className="display-code"><code style={{"whiteSpace": "pre-wrap"}}>{content}</code></pre>
    );
}

CodeDisplay.displayName = "CodeDisplay";
export default CodeDisplay;