import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store';
import { Provider } from 'react-redux';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import GalleryScreen from './screens/GalleryScreen.jsx';
import PostScreen from './screens/PostScreen.jsx';
import JoinUsScreen from './screens/JoinUsScreen.jsx';
import AddImage from './screens/AddImage.jsx';
import AddPost from './screens/AddPost.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
      <Route path='' element={<PrivateRoute />}>
        <Route path='/profile' element={<ProfileScreen />} />
        <Route path='/post' element={<PostScreen />} />
        <Route path='/joinus' element={<JoinUsScreen />} />
        <Route path='/gallery' element={<GalleryScreen />} />
        <Route path='/gallery/add' element={<AddImage />} />
        <Route path='/post/add' element={<AddPost type='Add' />} />
        <Route path='/post/edit' element={<AddPost type='Edit' />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
