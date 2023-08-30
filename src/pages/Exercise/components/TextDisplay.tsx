import React from "react";
import { Tab } from 'semantic-ui-react';

export interface TextDisplayProps {
    english?: string;
    chinese?: string;
}

const TextDisplay = ({ english, chinese }: TextDisplayProps): JSX.Element => {
    let panes = [
        { menuItem: 'english', render: () => <Tab.Pane>{english}</Tab.Pane> },
        { menuItem: '中文', render: () => <Tab.Pane>{chinese}</Tab.Pane> },
    ];

    return (
        <div className="display-text">
            <pre style={{ "whiteSpace": "pre-wrap" }}><Tab panes={panes} /></pre>
        </div>
    );
}

TextDisplay.displayName = "TextDisplay";
export default TextDisplay;