// @ts-nocheck

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { Tab } from 'semantic-ui-react';

import { ProgramAnswerArea } from "./answerArea";

import { requierJavaProgramExerciseOneById } from '../../utils/ajax/exercise';

import "./Exercise.css";

import { TimeDisplay, CodeDisplay, TextDisplay } from './components';
import ExerciseArea from './ExerciseArea';


import { setFooter } from '../../redux/reducers/global';

export interface ExerciseProps {
    exercise: {
        contents: Array<{ type: string, content: string }>,
        hint?: Array<{ type: string, content: string }>,
        subject: string
    }
}

const Exercise = (): JSX.Element => {
    const navigate = useNavigate();

    let token: string;
    if (localStorage.getItem("token") !== null) {
        token = localStorage.getItem("token") as string;
    } else {
        navigate("/home");
    }


    const dispatch = useDispatch();
    dispatch(setFooter(false));

    const [initCode, setInitCode] = useState("");
    const [exercise, setExercise] = useState(null);


    // const stuId = useSelector(state => state.id);
    // const [activeItem, changeActive] = useState("练习");
    // const { path, url, params } = useRouteMatch();
    // const BASIC_PATH = url;

    useEffect(() => {
        requierJavaProgramExerciseOneById(token, "524223040").then(
            (res) => {
                console.log(res);
                console.log(res.data.data.exercise.initCode);
                setInitCode(res.data.data.exercise.initCode);
                setExercise(res.data.data.exercise);
            }
        );
    }, [])

    return (
        <div className='exercise-page'>
            <TimeDisplay type='free' stateInfo={{ free: { today: 100, current: 20 } }} />
            {Boolean(exercise) ? (<div className='exercise-answer-box'>
                <div className="exercise-display-box">
                    <div className="exercise-contents-box">
                        {exercise.exerciseDescriptionContents.map((item, index) => {
                            let returnContent;
                            switch (item.type) {
                                case "TEXT":
                                    returnContent = <TextDisplay key={index} english={item.english} chinese={item.chinese}/>
                                    break;
                                case "IMAGE":
                                    returnContent = <div className="display-image">{item.imageName}</div>
                                    break;
                                case "VIDEO":
                                    returnContent = <div className="display-video"></div>
                                    break;
                                case "CODE":
                                    returnContent = <CodeDisplay key={index} content={item.code}/>
                                    break;
                            }
                            return returnContent
                        })}
                    </div>
                </div>
                <ProgramAnswerArea initCode={initCode} />
            </div>) : (<div>等待</div>)}

        </div>
    );
}

Exercise.displayName = 'Exercise';
export default Exercise;