// @ts-nocheck

import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { Radio, Form, Segment, FormField } from 'semantic-ui-react';


import { requireSingleChoiceExerciseOneById } from '../utils/ajax/exercise';

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

  const dispatch = useDispatch();
  dispatch(setFooter(false));

  const { exerciseId } = useParams();

  const [exercise, setExercise] = useState<exerciseObject | null>(null);
  const [selectedValue, setSelectedValue] = useState<int>(0);

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
      </div>) : (<div>waiting ...</div>)}

    </div>
  );
}


export default SingleChoiceExercise;