<style lang="stylus">

.row
  overflow auto

.chat
  height 75vh

.expand-transition
  transition all .2s ease
  height 30px
  padding 10px
  background-color #eee
  overflow hidden

/* .expand-enter defines the starting state for entering */
/* .expand-leave defines the ending state for leaving */
.expand-enter, .expand-leave
  height 0
  padding 0 10px
  opacity 0

#app ul
  list-style-type none

.message
  height 50px

.message img
  vertical-align middle

.message .text
  vertical-align middle
  margin-left 5px
  font-family 'Source Code Pro', "Raleway", "Helvetica Neue"
  font-size 20px

.message .datetime
  color darkgrey

#input
  margin-bottom 10%

#input input
  position fixed
  top 80%
  width 67%
  height 100px
  font-size 5rem
  padding 10px
  font-family 'Source Code Pro', "Raleway", "Helvetica Neue"

.close
  cursor pointer

</style>

<template>
  <section class="container">
    <div class="chat row">
      <ul>
        <li v-for="message in messages" 
          transition="expand"
          class="message">
            <img height="50px"
              width="50px"
              :src="message.url" />
            <span class="text">
              {{ message.text }}
            </span>

            <span class="datetime u-pull-right">
              {{ message.datetime.toTimeString() }} 
              <span class="close" 
                @click="removeMessage(message.id)">
                x
              </span>
            </span>
         </li>
       </ul>
    </div>
    <chat-input 
      :input-text.sync="newMessage"
      :submit-function="addMessage">
    </chat-input>  
  </section>
</template>

<script>
import horizon from './horizon'
import ChatInput from './components/Input.vue'
const chat = horizon('chat')

export default {
  components: {
    ChatInput
  },

  data () {
    return {
      newMessage: '',
      avatarUrl: `http://api.adorable.io/avatars/50/${new Date().getMilliseconds()}.png`,
      messages: []
    }
  },

  methods: {
    addMessage () {
      console.log('adding message')
      const text = this.newMessage.trim()
      if (text) {
        chat.store({
          text: text,
          datetime: new Date(),
          url: this.avatarUrl
        }).subscribe()
        this.newMessage = ''
      }
    },

    removeMessage (id) {
      console.log(`deleting message ${id}`)
      chat.remove(id)
        .subscribe(result => console.log(result.id))
    },

    messagesUpdate (newMessages) {
      console.log('getting messages', newMessages)
      this.messages = newMessages
    }
  },

  ready () {
    chat.order('datetime', 'descending')
    .watch()
    .subscribe(this.messagesUpdate)
  }
}
</script>

