import { createSlice } from "@reduxjs/toolkit";
import {
  getAllMessagesAction,
  getConversationsAction,
} from "./actions/messageActions";

const initialState = {
  pending: false,
  messages: [],
  conversations: [],
  currentConversation: "",
  currentChatUser: "",
};

const messengerSlice = createSlice({
  name: "messenger",
  initialState,
  reducers: {
    addConversationAction: (state, action) => {
      state.conversations.unshift(action.payload);
    },
    addMessageAction: (state, action) => {
      state.messages.push(action.payload);
    },

    setCurrentChatAction: (state, action) => {
      state.currentConversation = action.payload.conversation;
      state.currentChatUser = action.payload.chatUser;
    },

    setSeenStateAction: (state, action) => {
      const user_id = action.payload.user_id;
      const conversation_id = action.payload.conversation_id;
      const conversations = state.conversations.map((conv) => {
        if (conversation_id === conv._id) {
          const seen = conv.seen.map((seen) => {
            if (seen.userId === user_id) {
              seen.state = true;
            }
            return seen;
          });
          conv.seen = seen;
        }
        return conv;
      });

      state.conversations = conversations;
    },

    signOutMessengerCleanUp: (state) => {
      state.pending = false;
      state.messages = [];
      state.conversations = [];
      state.currentConversation = "";
      state.currentChatUser = "";
    },

    cleanOutMessengerBox: (state) => {
      state.messages = [];
      state.currentConversation = "";
      state.currentChatUser = "";
    },
  },
  extraReducers: {
    [getConversationsAction.pending]: (state) => {
      state.pending = true;
    },
    [getConversationsAction.fulfilled]: (state, action) => {
      state.conversations = action.payload;
      state.pending = false;
    },
    [getAllMessagesAction.pending]: (state) => {
      state.pending = true;
    },
    [getAllMessagesAction.fulfilled]: (state, action) => {
      state.messages = action.payload;
    },
  },
});

export const {
  addMessageAction,
  setCurrentChatAction,
  setSeenStateAction,
  signOutMessengerCleanUp,
  cleanOutMessengerBox,
  addConversationAction,
} = messengerSlice.actions;
const messengerReducer = messengerSlice.reducer;

export default messengerReducer;
