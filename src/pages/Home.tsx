// @ts-nocheck

import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, BrowserRouter, Routes, Route } from "react-router-dom";
import { Button, Divider, Header, TabPane, Tab, List, ListItem, ListContent, ListHeader, ListDescription, HeaderContent } from "semantic-ui-react";

import {
  requireSubjects,
  requireExerciseTypes,
  requireExerciseBasicInfoAll,
  requireDefaultRecommendationExercise
} from '../utils/ajax/exercise';
import JavaProgramExercise, { JavaProgramExerciseProps } from "./JavaProgramExercise";

import "./Home.css";

interface exerciseBasicInfoObject {
  subjectType: string,
  exerciseType: string,
  exerciseId: string,
  exerciseContent: string,
  tags: string[],
  concepts: string[]
}

interface contentObject {
  [key: string]: string;
}

interface recommendExerciseObject {
  exerciseType: string,
  exerciseId: string,
  exerciseContents: contentObject[]
}

const Home = (): JSX.Element => {
  const subjectDict = {
    "JAVA": "Java编程",
    "MATH": "数学",
    "wait_require": "请求中，请稍候..."
  }
  const exerciseTyepDict = {
    "SINGLE_CHOICE_EXERCISE": "单选题",
    "JAVA_PROGRAM_EXERCISE": "编程题",
    "FILL_IN_EXERCISE": "填空题",
    "wait_require": "请求中，请稍候..."
  };
  const exerciseTypeTrans = {
    "SINGLE_CHOICE_EXERCISE": "singleChoice",
    "JAVA_PROGRAM_EXERCISE": "javaProgram",
    "FILL_IN_EXERCISE": "fillIn",
  }
  const routeDict = {
    "SINGLE_CHOICE_EXERCISE": "/singleChoiceExercise/",
    "JAVA_PROGRAM_EXERCISE": "/javaProgramExercise/",
    "FILL_IN_EXERCISE": "/fillInExercise/",
  }

  const navigate = useNavigate();
  let token: string;
  if (localStorage.getItem("token") !== null) {
    token = localStorage.getItem("token") as string;
  } else {
    navigate("/login");
  }

  const [allSubjects, setAllsubjects] = useState<string[]>(["wait_require"]);
  const [allExerciseTypes, setAllExerciseTypes] = useState<string[]>(["wait_require"]);
  const [allExercisesBasicInfo, setAllExercisesBasicInfo] = useState<exerciseBasicInfoObject[]>([]);
  const [allRecommendExercises, setAllRecommendExercises] = useState<recommendExerciseObject[]>([]);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current) {
      // 防止请求两次
      hasFetched.current = true;
      requireDefaultRecommendationExercise(token).then(
        (res) => {
          if (res.data.flag) {
            setAllRecommendExercises(res.data.data.recommendExercises);
          } else {
            // console.log(res);
          }
        }
      )
    }
  }, [])

  useEffect(() => {
    requireSubjects(token).then(
      (res) => {
        if (res.data.flag) {
          setAllsubjects(res.data.data.subjectList);
        } else {
          // console.log(res);
        }
      }
    )
  }, [])

  useEffect(() => {
    requireExerciseTypes(token).then(
      (res) => {
        if (res.data.flag) {
          setAllExerciseTypes(res.data.data.typeList);
        } else {
          // console.log(res);
        }
      }
    );
  }, [])

  useEffect(() => {
    const fetchAllData = async () => {
      const promises = allExerciseTypes.map((exerciseType) => {
        if (exerciseType !== "wait_require") {
          return requireExerciseBasicInfoAll(token, exerciseTypeTrans[exerciseType])
            .then(res => res.data.flag ? res.data.data.exerciseBasicInfoList : []);
        }
        return [];
      });

      try {
        const results = await Promise.all(promises);
        const mergedResults = [].concat(...results);
        setAllExercisesBasicInfo(mergedResults);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchAllData();
  }, [allExerciseTypes])

  return (
    <div className='home-page'>
      <div className="default-recommendation">
        <Header as='h2' textAlign='center' color="blue">
          <HeaderContent>系统推荐习题</HeaderContent>
        </Header>
        {allRecommendExercises.length > 0 && <List divided relaxed>
          {
            allRecommendExercises.map((recommendExercise) => {
              let route = routeDict[recommendExercise.exerciseType];
              let itemHeaderString = exerciseTyepDict[recommendExercise.exerciseType];
              let itemDescriptionString = recommendExercise.exerciseContents[0].chinese;
              if (itemDescriptionString.length == 0) {
                itemDescriptionString = recommendExercise.exerciseContents[0].english;
              }
              return (
                <ListItem as={Link} key={recommendExercise.exerciseId} to={route + recommendExercise.exerciseId}>
                  <ListContent>
                    <ListHeader as='a'>{itemHeaderString}</ListHeader>
                    <ListDescription as='a'>{itemDescriptionString}</ListDescription>
                  </ListContent>
                </ListItem>
              )
            })
          }
        </List>}
      </div>

      <div>
        <Tab panes={
          allSubjects.map((subject) => {
            const exercisesBasicInfoInThisSubject = allExercisesBasicInfo.filter((exerciseBasicInfo) => {
              return exerciseBasicInfo["subjectType"] == subject;
            });
            return {
              menuItem: subjectDict[subject],
              render: () => (
                <TabPane>
                  {
                    allExerciseTypes.map((exerciseType) => {
                      let headerString = exerciseTyepDict[exerciseType];
                      let route = routeDict[exerciseType];
                      return (
                        <div key={subject + exerciseType} className="exercise-list">
                          <Header
                            as="h1"
                            block
                            textAlign="center"
                            style={{ color: "#4183c4" }}
                          >
                            {headerString}
                          </Header>
                          <List divided relaxed>
                            {exercisesBasicInfoInThisSubject.map((exerciseBasicInfo) => {
                              return (
                                (exerciseBasicInfo["exerciseType"] == exerciseType) && <List.Item key={subject + exerciseType + exerciseBasicInfo.exerciseId}>
                                  <List.Content>
                                    <Button
                                      as={Link}
                                      to={route + exerciseBasicInfo.exerciseId}
                                      style={{ cursor: "pointer", marginRight: "10px" }}
                                      color="green"
                                    // onClick={() => {
                                    // }}
                                    >
                                      开始练习
                                    </Button>
                                    <List.Header
                                      as="h2"
                                      style={{
                                        color: "brown",
                                        display: "inline-block",
                                        verticalAlign: "middle",
                                      }}
                                    >
                                      {exerciseBasicInfo.tags.join("  |  ")}
                                    </List.Header>

                                    <Divider />
                                    <List.Description>
                                      {/* <span style={{ color: "#db2828" }}>发布时间：</span>
                                      {new Date(test.releaseTime).toLocaleDateString() +
                                        " " +
                                        new Date(test.releaseTime).toLocaleTimeString()}
                                      <br />
                                      <span style={{ color: "#db2828" }}>描述：</span> */}
                                      {exerciseBasicInfo.exerciseContent}
                                    </List.Description>
                                  </List.Content>
                                </List.Item>
                              );
                            })}
                          </List>
                        </div>
                      );
                    })
                  }
                </TabPane>
              )
            }
          })
        } />
      </div>

    </div>
  );
}

Home.displayName = "Home";
export default Home;