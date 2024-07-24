import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { forumController } from '@/controllers/forum'

export const getForumListThunk = createAsyncThunk(
  'forum/getForumList',
  forumController.getForumList
)
export const getTopicByIdThunk = createAsyncThunk(
  'forum/getTopicById',
  forumController.getTopicById
)
export const createTopicThunk = createAsyncThunk(
  'forum/createTopic',
  forumController.createTopic
)
export const createCommentThunk = createAsyncThunk(
  'forum/createComment',
  forumController.createComment
)

export type TComment = {
  id: string
  text: string
}

export type TTopic = {
  id: string
  title: string
  description: string
  comments: TComment[]
}

type TInitialState = {
  topicList: TTopic[]
  selectedTopic: TTopic | null
  error: string
  loading: boolean
}

const initialState: TInitialState = {
  topicList: [],
  selectedTopic: null,
  error: '',
  loading: false,
}

export const forumSlice = createSlice({
  name: 'forum',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getForumListThunk.pending, state => {
        state.loading = true
      })
      .addCase(getForumListThunk.rejected, (state, action) => {
        state.loading = false
        const { error } = action

        if (typeof error.message !== 'string') {
          return
        }

        state.error = error.message
      })
      .addCase(getForumListThunk.fulfilled, (state, action) => {
        state.topicList = action.payload
        state.loading = false
        state.error = ''
      })
      .addCase(getTopicByIdThunk.pending, state => {
        state.loading = true
      })
      .addCase(getTopicByIdThunk.rejected, (state, action) => {
        state.loading = false
        const { error } = action

        if (typeof error.message !== 'string') {
          return
        }

        state.error = error.message
      })
      .addCase(getTopicByIdThunk.fulfilled, (state, action) => {
        state.selectedTopic = action.payload
        state.loading = false
        state.error = ''
      })
      .addCase(createTopicThunk.pending, state => {
        state.loading = true
      })
      .addCase(createTopicThunk.rejected, (state, action) => {
        state.loading = false
        const { error } = action

        if (typeof error.message !== 'string') {
          return
        }

        state.error = error.message
      })
      .addCase(createTopicThunk.fulfilled, (state, action) => {
        state.topicList.push(action.payload)
        state.selectedTopic = action.payload
        state.loading = false
        state.error = ''
      })
      .addCase(createCommentThunk.fulfilled, (state, action) => {
        state.topicList
          .find(topic => topic.id === action.payload.id)
          ?.comments.push(action.payload)
        state.selectedTopic?.comments.push(action.payload)
        state.loading = false
        state.error = ''
      })
  },
})

export default forumSlice.reducer
