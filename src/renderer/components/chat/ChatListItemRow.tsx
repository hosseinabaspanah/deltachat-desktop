import React from 'react'
import ChatListItem, {
  PlaceholderChatListItem,
  ChatListItemMessageResult,
} from './ChatListItem'
import { areEqual } from 'react-window'
import { ContactListItem } from '../contact/ContactListItem'
import { jumpToMessage, openViewProfileDialog } from '../helpers/ChatMethods'
import { Type } from '../../backend-com'

export const ChatListItemRowChat = React.memo<{
  index: number
  data: {
    selectedChatId: number | null
    chatListIds: number[]
    chatCache: {
      [id: number]: Type.ChatListItemFetchResult
    }
    onChatClick: (chatId: number) => void
    openContextMenu: (
      event: React.MouseEvent<any, MouseEvent>,
      chatListItem: Type.ChatListItemFetchResult,
      selectedChatId: number | null
    ) => void
  }
  style: React.CSSProperties
}>(({ index, data, style }) => {
  const {
    selectedChatId,
    chatListIds,
    chatCache,
    onChatClick,
    openContextMenu,
  } = data
  const chatId = chatListIds[index]
  return (
    <div style={style}>
      <ChatListItem
        isSelected={selectedChatId === chatId}
        chatListItem={chatCache[chatId] || undefined}
        onClick={onChatClick.bind(null, chatId)}
        onContextMenu={event => {
          const chat = chatCache[chatId]
          openContextMenu(event, chat, selectedChatId)
        }}
      />
    </div>
  )
}, areEqual)

export const ChatListItemRowContact = React.memo<{
  index: number
  data: todo
  style: todo
}>(({ index, data, style }) => {
  const { contactCache, contactIds, screenContext } = data
  const contactId = contactIds[index]
  return (
    <div style={style}>
      {contactCache[contactId] ? (
        <ContactListItem
          contact={contactCache[contactId]}
          showCheckbox={false}
          checked={false}
          showRemove={false}
          onClick={async _ => {
            openViewProfileDialog(screenContext, contactId)
          }}
        />
      ) : (
        <PlaceholderChatListItem />
      )}
    </div>
  )
}, areEqual)

export const ChatListItemRowMessage = React.memo<{
  index: number
  data: todo
  style: todo
}>(({ index, data, style }) => {
  const { messageResultIds, messageCache, queryStr } = data
  const msrId = messageResultIds[index]
  return (
    <div style={style}>
      {messageCache[msrId] ? (
        <ChatListItemMessageResult
          queryStr={queryStr}
          msr={messageCache[msrId]}
          onClick={() => {
            jumpToMessage(msrId)
          }}
        />
      ) : (
        <div className='pseudo-chat-list-item skeleton' />
      )}
    </div>
  )
}, areEqual)
