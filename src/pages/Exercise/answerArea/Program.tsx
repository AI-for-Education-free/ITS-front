// @ts-nocheck
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Button, Icon, Segment, Message } from "semantic-ui-react";
import CodeMirror from '@uiw/react-codemirror';
import { historyField } from '@codemirror/commands';
import { StreamLanguage } from '@codemirror/language';
import { java } from '@codemirror/lang-java';
import { xcodeLight } from '@uiw/codemirror-theme-xcode';
import { autocompletion } from '@codemirror/autocomplete';

import { submitJavaProgramExerciseAnswer } from '../../../utils/ajax/exercise';


const stateFields = { history: historyField };

export interface ProgramAnswerAreaProps {
  initCode?: string;
}

const ProgramAnswerArea = ({ initCode }: ProgramAnswerAreaProps): JSX.Element => {
  let locationObject: Location = useLocation();
  let pathName = locationObject.pathname;
  let pathNameList: string[] = pathName.split("/");
  let exerciseId: string = pathNameList[pathNameList.length - 1];

  const serializedState = localStorage.getItem('myEditorState');
  let preCodeValue = localStorage.getItem('myValue');
  // const [codeValue, setCodeValue] = useState(Boolean(preCodeValue) ? preCodeValue : initCode)
  const [codeValue, setCodeValue] = useState(initCode)
  const [checkResult, setCheckResult] = useState({ "correct": "no result" });
  return (
    <div className='answer-area-box'>
      <CodeMirror
        style={{ "border": "black 1px solid" }}
        value={codeValue}
        autoFocus={true}
        initialState={serializedState
          ? {
            json: JSON.parse(serializedState || ''),
            fields: stateFields,
          }
          : undefined}
        height="500px"
        // theme={xcodeLight}
        extensions={[
          java(),
          autocompletion({
            activateOnTyping: true,
            selectOnOpen: true,
            defaultKeymap: true
          })
        ]}
        onChange={(value, viewUpdate) => {
          localStorage.setItem('myValue', value);
          setCodeValue(value);
          const state = viewUpdate.state.toJSON(stateFields);
          localStorage.setItem('myEditorState', JSON.stringify(state));
        }}
        basicSetup={{
          autocompletion: true,
          // 光标代码高亮
          highlightActiveLine: true
        }}
        extraKeys={{ "Tab": "autocomplete" }}
      />
      <div style={{
        marginTop: "5px",
        width: "100%",
        display: "flex",
        justifyContent: "right",
      }}>
        <Button
          icon
          labelPosition="left"
          color="blue"
          onClick={() => {
            setCodeValue(initCode);
          }}
        >
          <Icon name="redo" color="black" />
          复原
        </Button>
        <Button
          icon
          labelPosition="right"
          color="green"
          onClick={() => {
            submitJavaProgramExerciseAnswer(localStorage.getItem("token"), exerciseId, { "submissionCode": codeValue }).then(
              (res) => {
                setCheckResult(res.data.data.result);
              }
            );
          }}
        >
          <Icon name="arrow up" color="black" />
          提交
        </Button>
      </div>
      <Segment>
        <Message.Header style={{ "textAlign": "center" }}>控制台输出</Message.Header>
        <Message>
          <pre>{checkResult.userOutput}</pre>
          {Boolean(checkResult.hint == "compileException") && <pre style={{ "color": "red" }}>{"compileException\n" + checkResult.compileException.message}</pre>}
          {Boolean(checkResult.hint == "runtimeException") && <pre style={{ "color": "red" }}>{`runtimeException
line: ${checkResult.runtimeException.cause.stackTrace[0].lineNumber - 1}
message: ${checkResult.runtimeException.cause.message}`}</pre>}
        </Message>
      </Segment>
      <Segment>
        <Message.Header style={{ "textAlign": "center" }}>测试结果</Message.Header>
        {checkResult.correct !== "no result" && <Message success={checkResult.correct} negative={!checkResult.correct}>
          {checkResult.correct ?
            (<><span>正确</span><Icon name="check circle" color="green" size="large" /></>) :
            <><span>错误</span><Icon name="times circle" color="red" size="large" /></>}
        </Message>}
        {Boolean(checkResult.hints) && checkResult.hints.map((hint, index) => {
          console.log(hint);
          return (
            <Message key={index} negative>
              <p style={{ display: "inline-block", marginRight: "8px" }}>
                {hint.chinese}
              </p>
              <Icon name="times circle" color="red"></Icon>
            </Message>
          );
        })}
      </Segment>
    </div>
  )
};

ProgramAnswerArea.displayName = "ProgramAnswerArea";
export default ProgramAnswerArea;