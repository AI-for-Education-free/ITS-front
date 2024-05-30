// @ts-nocheck

import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { Radio, Form, Segment, FormField, Button, Message, Icon, TextArea, List, ListItem, ListContent, ListDescription, Divider } from 'semantic-ui-react';

import { requireSingleChoiceExerciseOneById, submitSingleChoiceExerciseAnswer } from '../utils/ajax/exercise';

import "./Exercise/Exercise.css";
import { exerciseContentObject } from './JavaProgramExercise';

import { CodeDisplay, TextDisplay } from './Exercise/components';

import { setFooter } from '../redux/reducers/global';

type optionsObject = exerciseContentObject[][];

interface exerciseObject {
  exerciseContents: exerciseContentObject[],
  options: optionsObject;
}


const SingleChoiceExercise = (): JSX.Element => {
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
  const [selectedValue, setSelectedValue] = useState<int>(0);
  const [checkResult, setCheckResult] = useState<int>(2);
  const [chatRecord, setChatRecord] = useState<Record<string, string>[]>([]);
  const [currentUserInput, setCurrentUserInput] = useState<string>("");

  useEffect(() => {
    requireSingleChoiceExerciseOneById(token, exerciseId).then((res) => {
      setExercise(res.data.data.exercise);
    })
  }, []);

  return (
    <div className='exercise-page'>
      {Boolean(exercise) ? (<div className='exercise-answer-box'>
        <Form>
          <FormField>
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
          </FormField>

          <Form.Group>
            {exercise.options.map((optionContents, index) => {
              const optionContent = optionContents[0];
              let optionString = optionContent.chinese;
              if (optionString.length == 0) {
                optionString = optionContent.english;
              }
              return (
                <Form.Field key={index}>
                  <Segment compact>
                    <Radio
                      label={optionString}
                      name={exerciseId}
                      value={index}
                      checked={selectedValue === index}
                      onChange={(e, { value }) => {
                        setSelectedValue(value);
                      }}
                    />
                  </Segment>
                </Form.Field>
              );
            })}
          </Form.Group>
        </Form>

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
                submitSingleChoiceExerciseAnswer(localStorage.getItem("token"), exerciseId, String.fromCharCode(65 + selectedValue)).then(
                  (res) => {
                    setCheckResult(res.data.data.checkResult);
                  }
                );
              }}
            >
              <Icon name="arrow up" color="black" />
              提交答案
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
      <Divider />
      <div>
        {/* <Form style={{
          marginTop: "20px",
        }}>
          <List relaxed>
            {
              chatRecord.map((record) => {
                let floatedValue;
                if (record.role === "user") {
                  floatedValue = "left";
                } else {
                  floatedValue = "right";
                }
                return (
                  <ListItem>
                    <ListContent floated={floatedValue}>
                      <ListDescription as='a'>{record.content}</ListDescription>
                    </ListContent>
                  </ListItem>
                );
              })
            }
          </List>
          <TextArea
            placeholder='请输入想询问的问题'
            style={{ minHeight: 40 }}
            value={currentUserInput}
            onChange={(e, { value }) => {
              setCurrentUserInput(value);
            }}
          />
          <Button
            icon
            labelPosition="right"
            color="green"
            onClick={() => {
              // submitSingleChoiceExerciseAnswer(localStorage.getItem("token"), exerciseId, String.fromCharCode(65 + selectedValue)).then(
              //   (res) => {
              //     setCheckResult(res.data.data.checkResult);
              //   }
              // );
              const userChat = {
                "role": "user",
                "content": currentUserInput
              }
              setChatRecord([...chatRecord, userChat]);
              setCurrentUserInput("");
            }}
            style={{
              marginTop: "10px",
            }}
            floated="right"
          >
            <Icon name="arrow up" color="black" />
            询问大语言模型
          </Button>
        </Form> */}
      </div>
    </div>
  );
}


export default SingleChoiceExercise;