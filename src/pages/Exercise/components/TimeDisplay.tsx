import React from "react";
import { Header, Message, Icon } from 'semantic-ui-react';

const typeTable:{free:string, test:string} = {
    free: "正在练习中",
    test: "正在考试中"
}

const min2hour:Function = (t:number):string => {
    let result:string;
    if (t < 60) {
        result = t + "分钟";
    } else {
        result = Math.floor(t / 60) + "小时" + (t % 60) + "分钟";
    }
    return result;
}

export interface TimeDisplayProps {
    type: "free" | "test",
    stateInfo: {
        free?: { today:number, current:number },
        test?: { rest:number, thisExercise:number }
    }
}

const TimeDisplay = ({ type, stateInfo }: TimeDisplayProps): JSX.Element => {
    const { free, test } = stateInfo;
    let errorFlag:boolean = false;
    if (test) {
        errorFlag = test.rest <= 10;
    }
    let timeInfo;
    switch (type) {
        case "free":
            timeInfo = "今天总共已练习" + min2hour(free?.today) + "，本次练习时间已有" + min2hour(free?.current);
            break;
        case "test":
            timeInfo = "本次测试剩余" + min2hour(test?.rest) + "分钟，该题已用时" +  min2hour(test?.thisExercise);
            break;
        default:
            timeInfo = "";
    }

    return (
        <div>
            <Header as='h2' attached="top" textAlign="center" color="blue"> 
                {typeTable[type]}
            </Header>
            <Message error={errorFlag} attached='bottom'>
                {errorFlag && <Icon name='warning' />}
                {timeInfo}
            </Message>
        </div>
    );
};

TimeDisplay.displayName = "TimeDisplay";
export default TimeDisplay;
