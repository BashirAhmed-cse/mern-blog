import { Button, TextInput } from 'flowbite-react';
import { useSelector, useDispatch } from 'react-redux';

import {
  signOutUserStart,
  signOutUserFailure,
  signOutUserSuccess
} from '../redux/user/userSlice';

const DashProfile = () => {
    const {currentUser} = useSelector(state=>state.user)
    const dispatch = useDispatch();

    const handleSignOut = async () => {
      try {
          dispatch(signOutUserStart())
          const res = await fetch('/api/auth/signout');
          const data = await res.json();
          if (data.success === false) {
              dispatch(signOutUserFailure(data.message));
              return;
          }
          dispatch(signOutUserSuccess(data));
      } catch (error) {
          dispatch(signOutUserFailure(error.message));
      }
  }

  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
        <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
        <form className='flex flex-col gap-4'>
            <div className='w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'>
            <img src={currentUser.profilePicture} alt="profile photo" 
           className='rounded-full w-full h-full object-cover border-8 border-[lightgray]'
           />
            </div>
           <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.username}/>
           <TextInput type='email' id='email' placeholder='email' defaultValue={currentUser.email}/>
           <TextInput type='password' id='password' placeholder='password'/>
            <Button type='submit' gradientDuoTone='purpleToBlue' outline>Update</Button>
        </form>
        <div className='text-red-500 flex justify-between mt-3'>
            <span className='cursor-pointer'>Delete Account</span>
            <span className='cursor-pointer' onClick={handleSignOut}>Sign Out</span>
        </div>
    </div>
  )
}

export default DashProfile