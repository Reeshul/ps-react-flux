import dispatcher from '../appDispatcher';
import * as courseApi from '../api/courseApi';
import actionTypes from './actionTypes';

export const saveCourse = (course) => {
  courseApi.saveCourse(course).then((savedCourse) => {
    // Hey dispatcher! Tell all the stores that a course was just created
    dispatcher.dispatch({
      actionType: course.id
        ? actionTypes.UPDATE_COURSE
        : actionTypes.CREATE_COURSE,
      COURSE: savedCourse,
    });
  });
};

export const loadCourses = () => {
  courseApi.getCourses().then((courses) => {
    dispatcher.dispatch({
      actionType: actionTypes.LOAD_COURSES,
      courses: courses,
    });
  });
};

export const deleteCourse = (id) => {
    return courseApi.deleteCourse(id).then(() => {
      dispatcher.dispatch({
        actionType: actionTypes.DELETE_COURSE,
        id: id
      });
    });
  }