import axiosInstance from './index';

export const requierExerciseTypes = (token:string) => {
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

export const requireJavaExerciseBasicInfoAll = (token:string) => {
  return axiosInstance({
    headers: {
      "Content-Type": "application/json",
      "token": token
    },
    method: "get",
    url: "/exercises/java/basicInfo/all",
    responseType: "json",
  });
}


export const requierJavaProgramExerciseAll = (token:string) => {
  return axiosInstance({
    headers: {
      "Content-Type": "application/json",
      "token": token
    },
    method: "get",
    url: "/exercises/java/program/all",
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
    url: "/exercises/java/program/one/" + exerciseId,
    responseType: "json",
  });
};

export const requierJavaSingleChoiceExerciseAll = (token:string) => {
  return axiosInstance({
    headers: {
      "Content-Type": "application/json",
      "token": token
    },
    method: "get",
    url: "/exercises/java/singleChoice/all",
    responseType: "json",
  });
};

export const requierJavaSingleChoiceExerciseOneById = (token:string, exerciseId:string) => {
  return axiosInstance({
    headers: {
      "Content-Type": "application/json",
      "token": token
    },
    method: "get",
    url: "/exercises/java/SingleChoice/one/" + exerciseId,
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