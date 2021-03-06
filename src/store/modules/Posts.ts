import Category from '../../models/Category';
import Post from '../../models/Post';
import Categories from '../../constants/Categories';
import PostService from '../../services/PostService';

interface UserState {
  categories: Category[];
  posts: Post[];
  error: string | null;
  refreshing: boolean;
  post: Post | null;
  selectedCategoryId: number;
}

const INITIAL_STATE: UserState = {
  categories: Categories,
  posts: [],
  error: null,
  refreshing: false,
  post: null,
  selectedCategoryId: 1,
};

const UPDATE_CATEGORIES = 'UPDATE_CATEGORIES';
const GET_ALL_POSTS = 'GET_ALL_POSTS';
const UPDATE_POSTS = 'UPDATE_POSTS';
const UPDATE_COMENTARIES = 'UPDATE_COMENTARIES';
const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE';
const SET_REFRESHING = 'SET_REFRESHING';
const POST_DETAILS = 'POST_DETAILS';

const Reducer = (state: UserState = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case UPDATE_CATEGORIES:
      return {
        ...state,
        categories: Categories,
      };
    case GET_ALL_POSTS:
      return {
        ...state,
        posts: action.payload.posts,
        selectedCategoryId: action.payload.categoryId,
      };
    case UPDATE_POSTS:
      return {
        ...state,
        posts: action.payload.posts,
        post: action.payload.post,
      };
    case UPDATE_COMENTARIES:
      return {
        ...state,
        post: {
          ...state.post,
          comments: action.payload.post.comments,
        },
      };
    case SET_ERROR_MESSAGE:
      return {
        ...state,
        error: action.error,
      };
    case SET_REFRESHING:
      return {
        ...state,
        refreshing: action.refreshing,
      };
    case POST_DETAILS:
      return {
        ...state,
        post: action.payload,
      };
    default:
      return state;
  }
};

export const updateCategories = () => (dispatch: any) => dispatch({ type: UPDATE_CATEGORIES });

export const getAllPosts = (categoryId?: number) => async (dispatch: any, getState: any) => {
  try {
    const { posts } = getState();
    const category = categoryId || posts.selectedCategoryId;

    const allPosts = await PostService.getALLPosts(category);
    dispatch({ type: GET_ALL_POSTS, payload: { posts: allPosts, categoryId: category } });
  } catch (e) {
    dispatch({ type: SET_ERROR_MESSAGE, error: e.message });
  }

  dispatch({ type: SET_REFRESHING, refreshing: false });
};

export const updatePost = (post: Post) => async (dispatch: any) => {
  try {
    dispatch({ type: UPDATE_COMENTARIES, payload: { post } });
    const posts = await PostService.updatePost(post);
    const postUpdated = posts.find((p) => p.id === post.id);
    dispatch({ type: UPDATE_POSTS, payload: { posts, post: postUpdated } });
  } catch (e) {
    dispatch({ type: SET_ERROR_MESSAGE, error: e.message });
  }
};

export const postDetails = (post: Post) => async (dispatch: any) => {
  post.comments = post.comments.sort((item, itemTwo) => item.id - itemTwo.id);
  dispatch({ type: POST_DETAILS, payload: post });
};

export const setRefreshing = (isRefreshing: boolean) => async (dispatch: any) => dispatch({
  type: SET_REFRESHING, refreshing: isRefreshing,
});

export const setErrorMessage = (error: string | null) => (dispatch: any) => dispatch(
  { type: SET_ERROR_MESSAGE, error },
);

export default {
  Reducer,
};
