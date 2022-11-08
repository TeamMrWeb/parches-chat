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
  friends?: UserProps
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
  verified: boolean
  avatar: {
    __typename: string
    public_id: string
    secure_url: string
  }
}

export interface ChatProps {
  id?: string
  avatar?: {
    public_id: string
    secure_url: string
  }
  name?: string
  messages?: MessageProps[]
  isGroup?: boolean
  secure?: boolean
  private?: boolean
  maxUsers?: number
  ownerId?: any
  admins?: UserProps[]
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
  lifeTime?: number
}

export interface LoaderSpinnerProps {
  status: boolean
}

export interface EmojiProps {
  emoji: string
  name: string
  shortname: string
  unicode: string
  html: string
  category: string
  order: string
}

export interface CategoriesIconProps {
  "People & Body": string
  "Smileys & Emotion": string
  Activities: string
  Symbols: string
  Objects: string
  "Animals & Nature": string
  "Travel & Places": string
  "Food & Drink": string
  Flags: string
}
