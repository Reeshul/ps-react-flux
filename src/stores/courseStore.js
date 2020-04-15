import { EventEmitter } from 'events';
import Dispatcher from '../appDispatcher';
import actionTypes from '../actions/actionTypes';

const CHANGE_EVENT = 'change';

let newArrayOfCourses = [];

class CourseStore extends EventEmitter {
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  getCourses() {
    return newArrayOfCourses;
  }

  getCourseBySlug(slug) {
    return newArrayOfCourses.find((course) => course.slug === slug);
  }
}

const store = new CourseStore();

Dispatcher.register((action) => {
  switch (action.actionType) {
    case actionTypes.DELETE_COURSE:
      newArrayOfCourses = newArrayOfCourses.filter(
        (course) => course.id !== parseInt(action.id, 10)
      );
      store.emitChange();
      break;
    case actionTypes.CREATE_COURSE:
      newArrayOfCourses.push(action.course);
      store.emitChange();
      break;
    case actionTypes.UPDATE_COURSE:
      newArrayOfCourses = newArrayOfCourses.map((course) =>
        course.id === action.course.id ? action.course : course
      );
      store.emitChange();
      break;
    case actionTypes.LOAD_COURSES:
      newArrayOfCourses = action.courses;
      store.emitChange();
      break;
    default:
    // nothing to do here
  }
});

export default store;
