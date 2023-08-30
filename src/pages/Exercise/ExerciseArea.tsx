import React from "react";

export interface ExerciseAreaProps {
    exerciseContents: Array<{ type: string, content: string }>,
    hintContents?: Array<{ type: string, content: string }>
}

const ExerciseArea = ({
    exerciseContents,
    hintContents
}: ExerciseAreaProps): JSX.Element => {
    return (
        <div className="exercise-display-box">
            <div className="exercise-contents-box">
                {exerciseContents.map((item, index) => {
                    let returnContent;
                    switch (item.type) {
                        case "text":
                            returnContent = <div key={index} className="description-text">
                                <pre>{item.content}</pre>
                            </div>
                            break;
                        case "image":
                            returnContent = <div></div>
                            break;
                        case "video":
                            returnContent = <div></div>
                            break;
                    }
                    return returnContent
                })}
            </div>
            <div className="hint-contents-box"></div>
        </div>
    );
}

ExerciseArea.displayName = "ExerciseArea";
export default ExerciseArea;