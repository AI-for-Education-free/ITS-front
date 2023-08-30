import React, { useEffect, useState } from "react";
import { Link, useNavigate, BrowserRouter, Routes, Route } from "react-router-dom";
import { List, Button, Divider, Header } from "semantic-ui-react";

import { requierExerciseTypes, requireJavaExerciseBasicInfoAll } from '../utils/ajax/exercise';
import JavaProgramExercise, { JavaProgramExerciseProps } from "./JavaProgramExercise";

import "./Home.css";

interface exerciseBasicInfoObject {
  exerciseType: string,
  exerciseId: string,
  exerciseString: {
    english: string,
    chinese?: string
  },
  tags: string[],
  concepts: string[]
}

const Home = (): JSX.Element => {
  const tyepDict = {
    "SINGLE_CHOICE_EXERCISE": {
      "english": "single choice exercise",
      "chinese": "单选题"
    },
    "JAVA_PROGRAM_EXERCISE": {
      "english": "program exercise",
      "chinese": "编程题"
    },
    "wait_require": {
      "chinese": "请求中······",
      "english": "waiting ..."
    }
  };

  const navigate = useNavigate();
  let token: string;
  if (localStorage.getItem("token") !== null) {
    token = localStorage.getItem("token") as string;
  } else {
    navigate("/login");
  }

  const [allExerciseTypes, setAllExerciseTypes] = useState<string[]>(["wait_require"]);
  const [allExerciseBasicInfo, setAllExerciseBasicInfo] = useState<exerciseBasicInfoObject[]>([]);

  useEffect(() => {
    requierExerciseTypes(token).then(
      (res) => {
        if (res.data.flag) {
          // console.log(res.data.data.typeList);
          setAllExerciseTypes(res.data.data.typeList);
        } else {
          // console.log(res);
        }
      }
    );
  }, [])

  useEffect(() => {
    requireJavaExerciseBasicInfoAll(token).then(
      (res) => {
        if (res.data.flag) {
          // console.log(res.data.data.exerciseBasicInfoList);
          setAllExerciseBasicInfo(res.data.data.exerciseBasicInfoList);
        } else {
          // console.log(res);
        }
      }
    )
  }, [allExerciseTypes])

  return (
    <div className='home-page'>

      {/* <Routes>
        <Route path="/java/exercise/detail/">
          {
            allExerciseBasicInfo.map((exerciseBasicInfo) => {
              let exerciseId = exerciseBasicInfo.exerciseId;
              if (exerciseBasicInfo.exerciseType === "JAVA_PROGRAM_EXERCISE") {
                return (
                  <Route key={exerciseId} path={exerciseId} element={<JavaProgramExercise/>}></Route>
                );
              } else if (exerciseBasicInfo.exerciseType === "SINGLE_CHOICE_EXERCISE") {
                return (
                  <Route key={exerciseId} path={exerciseId} element={<JavaProgramExercise/>}></Route>
                );
              }
            })
          }
        </Route>
      </Routes> */}
      <div>
        {
          allExerciseTypes.map((type) => {
            let headerString;
            switch (type) {
              case "SINGLE_CHOICE_EXERCISE":
                headerString = tyepDict["SINGLE_CHOICE_EXERCISE"]["english"];
                break;
              case "JAVA_PROGRAM_EXERCISE":
                headerString = tyepDict["JAVA_PROGRAM_EXERCISE"]["english"];
                break;
              default:
                headerString = tyepDict["wait_require"]["english"];
            }

            return (
              <div key={type} className="exercise-list">
                <Header
                  as="h1"
                  block
                  textAlign="center"
                  style={{ color: "#4183c4" }}
                >
                  {headerString}
                </Header>
                <List divided relaxed>
                  {allExerciseBasicInfo
                    .filter((exerciseBasicInfo) => {
                      return exerciseBasicInfo["exerciseType"] === type;
                    })
                    .map((exerciseBasicInfo) => {
                      return (
                        <List.Item key={exerciseBasicInfo.exerciseId}>
                          <List.Content>
                            <Button
                              as={Link}
                              to={"/java/exercise/detail/" + exerciseBasicInfo.exerciseId}
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
                              {exerciseBasicInfo.exerciseString.english}
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

      </div>

    </div>
  );
}

Home.displayName = "Home";
export default Home;