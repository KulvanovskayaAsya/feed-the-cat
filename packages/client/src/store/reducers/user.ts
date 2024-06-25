type LoadStatus = 'success' | 'pending' | 'failed' | 'error'
type Nullable<T> = T | null

interface User {
  name: string
  birthday: string
}

type UserState = {
  item: Nullable<User>
  status: LoadStatus
}

const actions = {
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
  SET_USER_ITEM: 'SET_USER_ITEM',
  SET_STATUS: 'SET_STATUS',
}

const defaultState: UserState = {
  status: 'error',
  item: null,
}

interface ItemActionType {
  type: keyof typeof actions
  status: LoadStatus
}

export function userReducer(
  state: UserState = defaultState,
  { type, status }: ItemActionType
) {
  switch (type) {
    case actions.SET_STATUS:
      return {
        ...state,
        status,
      }
    default:
      return state
  }
}

export function setLoadingStatus(status: LoadStatus) {
  return { type: actions.SET_STATUS, status }
}
