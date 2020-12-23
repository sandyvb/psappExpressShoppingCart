import React, { Suspense, lazy } from 'react'
import { Route, Switch } from 'react-router-dom'

//https://reactjs.org/docs/code-splitting.html#route-based-code-splitting
// import Navbar from './Navbar'
// import Warning from './components/Warning'
// import Home from './pages/Home'
// import Videos from './pages/Videos'
// import Photos from './pages/Photos'
// import MyList from './pages/MyList'
// import Contact from './pages/Contact'
// import Usc2257 from '../modules/components/Usc2257'
// import Custrec from '../modules/components/Custrec'
// import About from './pages/About'
// import Terms from './pages/Terms'
// import Faqs from './pages/Faqs'
// import Membership from './pages/Membership'
// import Dvd from './pages/Dvd'
// import Bitcoin from './pages/Bitcoin'
// import Detail from './pages/Detail'
// import Error from './pages/Error'
// import Footer from './Footer'
// import Contest from './pages/Contest'

import ListContextProvider from './contexts/ListContext'

const Navbar = lazy(() => import('./Navbar'))
const Warning = lazy(() => import('./components/Warning'))
const Home = lazy(() => import('./pages/Home'))
const Videos = lazy(() => import('./pages/Videos'))
const Photos = lazy(() => import('./pages/Photos'))
const MyList = lazy(() => import('./pages/MyList'))
const Contact = lazy(() => import('./pages/Contact'))
const Usc2257 = lazy(() => import('../modules/components/Usc2257'))
const Custrec = lazy(() => import('../modules/components/Custrec'))
const About = lazy(() => import('./pages/About'))
const Terms = lazy(() => import('./pages/Terms'))
const Faqs = lazy(() => import('./pages/Faqs'))
const Membership = lazy(() => import('./pages/Membership'))
const Dvd = lazy(() => import('./pages/Dvd'))
// const Bitcoin = lazy(() => import('./pages/Bitcoin'))
const Detail = lazy(() => import('./pages/Detail'))
const Error = lazy(() => import('./pages/Error'))
const Footer = lazy(() => import('./Footer'))
// const Contest = lazy(() => import('./pages/Contest'))

// FIX FOR ROUTER PROBLEMS WHEN DEPLOYING APP!
// https://dev.to/crishanks/deploy-host-your-react-app-with-cpanel-in-under-5-minutes-4mf6

const App = () => {
  return (
    <div>
      <ListContextProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <Navbar />
          <main>
            <Switch>
              <Route path="/" component={Warning} exact />
              <Route path="/home" component={Home} />
              {/* <Route path="/contest" component={Contest} /> */}
              <Route path="/videos" component={Videos} />
              <Route path="/photos" component={Photos} />
              <Route path="/mylist" component={MyList} />
              <Route path="/contact" component={Contact} />
              <Route path="/usc2257" component={Usc2257} />
              <Route path="/custrec" component={Custrec} />
              <Route path="/about" component={About} />
              <Route path="/terms" component={Terms} />
              <Route path="/faqs" component={Faqs} />
              <Route path="/membership" component={Membership} />
              <Route path="/dvd" component={Dvd} />
              {/* <Route path="/bitcoin" component={Bitcoin} /> */}
              <Route path="/:id" component={Detail} />
              <Route component={Error} />
            </Switch>
          </main>
          <Footer />
        </Suspense>
      </ListContextProvider>
    </div>
  )
}

export default App
