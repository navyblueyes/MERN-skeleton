import React from 'react'
import { hydrate } from 'react-dom'
import App from './App'


hydrate(<App/>, document.getElementById('root'))



// Hydrate allows client to preserver SSR-markup
// Event Handlers [and some connected CSS] are handled by React
// Allows for some pre-rendering and bookmarking
