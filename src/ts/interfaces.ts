export interface RootState {
  loggedUser: LoggedUserProps
  chat: ChatProps
  chats: ChatProps[]
  groups: GroupProps[]
  loader: LoaderProps
  messages: MessageProps[]
  alertMessage: AlertMessageProps
  loaderSpinner: LoaderSpinnerProps
}

export interface AccountQuestionProps {
  question: string
  href: string
  hrefText: string
}

export interface ResultProps {
  id: string
  username: string
  avatar: {
    public_id: string
    secure_url: string
  }
  __typename: string
}

export interface LoggedUserProps {
  id?: string
  username?: string
  avatar?: {
    secure_url: string
  }
  verified?: boolean
  password?: string
  email?: string
  status?: number
  friends?: any
  pendingFriends?: any
  blockedUsers?: any
}

export interface AddFriendResponseProps {
  data: {
    sendFriendRequest: string
  }
}

export interface AddFriendErrorResponseProps {
  data: undefined
  errors: { Error: string }
}

export interface UserProps {
  __typename: string
  id: string
  username: string
  avatar: {
    __typename: string
    public_id: string
    secure_url: string
  }
}

export interface ChatProps {
  id?: string
  avatar?: string
  name?: string
  messages?: Array<object>
  isGroup?: boolean
  secure?: boolean
  private?: boolean
  maxUsers?: number
  ownerId?: any
  admins?: Array<object>
  users?: UserProps[]
  status?: number
  createdAt?: Date
  updatedAt?: Date
}

export interface NotificationProps {
  quantity: number
  author: string
}

export interface ChatDataProps {
  username: string
  avatar: {
    __typename: string
    secure_url: string
  }
}

export interface FormGroupProps {
  type: string
  label: string
  placeholder: string
  minLength?: number
  maxLength?: number
  required: boolean
}

export interface GroupProps {
  id: string
  image: string
}

export interface LoaderProps {
  status: boolean
  progress: number
}

export interface MessageProps {
  id?: string
  text?: string
  image?: string
  author?: {
    id: string
    __typename: string
  }
  edited?: boolean
  seen?: Object
  createdAt?: Date
  updatedAt?: Date
  __typename?: string
}

export interface AuthorProps {
  id: string
}

export interface AlertMessageProps {
  title: string
  description: string
  type: string //success, warning, info, error
  visible: boolean
}

export interface LoaderSpinnerProps {
  status: boolean
}
