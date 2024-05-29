// @ts-nocheck

import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { Input, Button, Segment, Message, Icon } from 'semantic-ui-react';


import { requireFillInExerciseOneById, submitFillInExerciseAnswer } from '../utils/ajax/exercise';

import "./Exercise/Exercise.css";
import { exerciseContentObject } from './JavaProgramExercise';

import { CodeDisplay, TextDisplay } from './Exercise/components';

import { setFooter } from '../redux/reducers/global';

interface fillInCorrectAnswer {
  [key: string]: string;
}

interface exerciseObject {
  exerciseContents: exerciseContentObject[],
  correctAnswer: fillInCorrectAnswer
}

const FillInExercise = (): JSX.Element => {
  const navigate = useNavigate();
  let token: string;
  if (localStorage.getItem("token") !== null) {
    token = localStorage.getItem("token") as string;
  } else {
    navigate("/login");
  }

  // const dispatch = useDispatch();
  // dispatch(setFooter(false));

  const { exerciseId } = useParams();

  const [exercise, setExercise] = useState<exerciseObject | null>(null);
  const [correctAnswerKeys, setCorrectAnswerKeys] = useState<fillInCorrectAnswer | null>(null);
  const [currentAnswer, setCurrentAnswer] = useState<fillInCorrectAnswer | null>(null);
  const [checkResult, setCheckResult] = useState<int>(2);

  useEffect(() => {
    requireFillInExerciseOneById(token, exerciseId).then((res) => {
      setExercise(res.data.data.exercise);
      setCorrectAnswerKeys(Object.keys(res.data.data.exercise.correctAnswer));
      const emptyAnswer = {};
      for (let k in res.data.data.exercise.correctAnswer) {
        emptyAnswer[k] = "";
      }
      setCurrentAnswer(emptyAnswer);
    })
  }, []);

  return (
    <div className='exercise-page'>
      {(Boolean(exercise) && Boolean(correctAnswerKeys) && Boolean(currentAnswer)) ? (<div className='exercise-answer-box'>
        <div className="exercise-display-box">
          <div className="exercise-contents-box">
            {exercise?.exercise.exerciseContents.map((exerciseContent, index) => {
              let returnContent;
              switch (exerciseContent.contentType) {
                case "TEXT":
                  returnContent = <TextDisplay key={index} english={exerciseContent.english} chinese={exerciseContent.chinese} />
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
                  returnContent = <CodeDisplay key={index} content={exerciseContent.code} />
                  break;
              }
              return returnContent
            })}
          </div>
        </div>

        <div className='fillInBody'>
          {
            correctAnswerKeys.map((k) => {
              return <Input
                className='fillInOneEmpty'
                key={k}
                placeholder={"请填入第" + (parseInt(k, 10) + 1) + "个空的内容"}
                value={currentAnswer[k]}
                onChange={(e, { value }) => {
                  const changedAnswer = {};
                  for (let k_ in currentAnswer) {
                    changedAnswer[k_] = currentAnswer[k_];
                  }
                  changedAnswer[k] = value;
                  setCurrentAnswer(changedAnswer);
                }}
              />
            })
          }
        </div>

        <div style={{
          marginTop: "5px",
          width: "450px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          <div>
            <Button
              icon
              labelPosition="right"
              color="green"
              onClick={() => {
                submitFillInExerciseAnswer(localStorage.getItem("token"), exerciseId, currentAnswer).then(
                  (res) => {
                    setCheckResult(res.data.data.checkResult);
                  }
                );
              }}
            >
              <Icon name="arrow up" color="black" />
              提交
            </Button>
          </div>

          <Segment>
            <Message.Header style={{ "textAlign": "center" }}>提交结果</Message.Header>
            {(checkResult !== 2) ? <Message success={checkResult} negative={!checkResult}>
              {checkResult ?
                (<><span>正确</span><Icon name="check circle" color="green" size="large" /></>) :
                <><span>错误</span><Icon name="times circle" color="red" size="large" /></>}
            </Message> : <Message>
              <><Icon name="wait" color="blue" size="large" /><span>等待提交</span></>
            </Message>}
          </Segment>
        </div>

      </div>) : (<div>waiting ...</div>)}

    </div>
  );
}


export default FillInExercise;