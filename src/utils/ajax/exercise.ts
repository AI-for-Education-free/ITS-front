import axiosInstance from './index';

export const requireSubjects = (token:string) => {
  return axiosInstance({
    headers: {
      "Content-Type": "application/json",
      "token": token
    },
    method: "get",
    url: "/exercises/subject",
    responseType: "json",
  });
};

export const requireExerciseTypes = (token:string) => {
  return axiosInstance({
    headers: {
      "Content-Type": "application/json",
      "token": token
    },
    method: "get",
    url: "/exercises/type",
    responseType: "json",
  });
};

export const requireDefaultRecommendationExercise = (token:string) => {
  return axiosInstance({
    headers: {
      "Content-Type": "application/json",
      "token": token
    },
    method: "get",
    url: "/recommend/default",
    responseType: "json",
  });
}

export const requireExerciseBasicInfoAll = (token:string, exerciseType:string) => {
  return axiosInstance({
    headers: {
      "Content-Type": "application/json",
      "token": token
    },
    method: "get",
    url: "/exercises/basicInfo/all/" + exerciseType,
    responseType: "json",
  });
}

export const requireJavaProgramExerciseAll = (token:string) => {
  return axiosInstance({
    headers: {
      "Content-Type": "application/json",
      "token": token
    },
    method: "get",
    url: "/exercises/javaProgram/all",
    responseType: "json",
  });
};

export const requierJavaProgramExerciseOneById = (token:string, exerciseId:string) => {
  return axiosInstance({
    headers: {
      "Content-Type": "application/json",
      "token": token
    },
    method: "get",
    url: "/exercises/javaProgram/one/" + exerciseId,
    responseType: "json",
  });
};

export const requireSingleChoiceExerciseAll = (token:string) => {
  return axiosInstance({
    headers: {
      "Content-Type": "application/json",
      "token": token
    },
    method: "get",
    url: "/exercises/singleChoice/all",
    responseType: "json",
  });
};

export const requireSingleChoiceExerciseOneById = (token:string, exerciseId:string) => {
  return axiosInstance({
    headers: {
      "Content-Type": "application/json",
      "token": token
    },
    method: "get",
    url: "/exercises/singleChoice/one/" + exerciseId,
    responseType: "json",
  });
};

export const requireFillInExerciseOneById = (token:string, exerciseId:string) => {
  return axiosInstance({
    headers: {
      "Content-Type": "application/json",
      "token": token
    },
    method: "get",
    url: "/exercises/fillIn/one/" + exerciseId,
    responseType: "json",
  });
};


export const submitJavaProgramExerciseAnswer = (token:string, exerciseId:string, info: Record<string, any>) => {
  return axiosInstance({
    headers: {
      "Content-Type": "application/json",
      "token": token
    },
    method: "post",
    url: "/exercises/java/program/check/" + exerciseId,
    data: info,
    responseType: "json",
  });
};

export const submitSingleChoiceExerciseAnswer = (token:string, exerciseId:string, answer:string) => {
  return axiosInstance({
    headers: {
      "Content-Type": "application/json",
      "token": token
    },
    method: "post",
    url: "/exercises/singleChoice/check/" + exerciseId,
    data: {
      "submissionChoiceAnswer": answer
    },
    responseType: "json",
  });
}

export const submitFillInExerciseAnswer = (token:string, exerciseId:string, answer:Record<string, string>) => {
  return axiosInstance({
    headers: {
      "Content-Type": "application/json",
      "token": token
    },
    method: "post",
    url: "/exercises/fillIn/check/" + exerciseId,
    data: {
      "submissionFillInAnswer": answer
    },
    responseType: "json",
  });
}