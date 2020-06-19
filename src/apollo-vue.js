import Vue from "vue"
import VueApollo from 'vue-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory';


const httpLink = new HttpLink({
    // You should use an absolute URL here
    uri: 'https://countries-274616.ew.r.appspot.com'
  })
  
  const apolloClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    connectToDevTools: true
  })

  Vue.use(VueApollo)
  
  const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
    defaultOptions: {
      $loadingKey: 'loading'
    }
  })

  export { apolloClient, apolloProvider }