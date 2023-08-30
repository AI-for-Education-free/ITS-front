// @ts-nocheck

import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { Tab } from 'semantic-ui-react';

import { ProgramAnswerArea } from "./Exercise/answerArea";

import { requierJavaProgramExerciseOneById } from '../utils/ajax/exercise';

import "./Exercise/Exercise.css";

import { TimeDisplay, CodeDisplay, TextDisplay } from './Exercise/components';
import ExerciseArea from './Exercise/ExerciseArea';


import { setFooter } from '../redux/reducers/global';


export interface JavaProgramExerciseProps {
    exerciseId: string
};

interface exerciseContentObject {
    contentType: string,
    chinese?: string,
    english?: string,
    code?: string,
    imageName?: string,
    style?:string
}

interface exerciseObject {
    exerciseContents: exerciseContentObject[],
    initCode: string
}

const JavaProgramExercise = (): JSX.Element => {
    const navigate = useNavigate();
    let token: string;
    if (localStorage.getItem("token") !== null) {
        token = localStorage.getItem("token") as string;
    } else {
        navigate("/login");
    }

    const dispatch = useDispatch();
    dispatch(setFooter(false));

    const { exerciseId } = useParams();

    const [exercise, setExercise] = useState<exerciseObject | null>(null);

    useEffect(() => {
        requierJavaProgramExerciseOneById(token, exerciseId).then((res) => {
            console.log(res.data.data.exercise);
            setExercise(res.data.data.exercise);
        })
    }, []);

    return (
        <div className='exercise-page'>
            {/* <TimeDisplay type='free' stateInfo={{ free: { today: 100, current: 20 } }} /> */}
            {Boolean(exercise) ? (<div className='exercise-answer-box'>
                <div className="exercise-display-box">
                    <div className="exercise-contents-box">
                        {exercise?.exercise.exerciseContents.map((exerciseContent, index) => {
                            let returnContent;
                            switch (exerciseContent.contentType) {
                                case "TEXT":
                                    returnContent = <TextDisplay key={index} english={exerciseContent.english} chinese={exerciseContent.chinese}/>
                                    break;
                                case "IMAGE":
                                    returnContent = <div className="display-image" key={index}>
                                        <img src={"/" + exerciseContent.imageName} alt="requesting ..." />
                                    </div>
                                    break;
                                case "VIDEO":
                                    returnContent = <div className="display-video"></div>
                                    break;
                                case "CODE":
                                    returnContent = <CodeDisplay key={index} content={exerciseContent.code}/>
                                    break;
                            }
                            return returnContent
                        })}
                    </div>
                </div>
                <ProgramAnswerArea initCode={exercise?.initCode} />
            </div>) : (<div>waiting ...</div>)}

        </div>
    );
}


export default JavaProgramExercise;