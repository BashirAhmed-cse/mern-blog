import React, { useEffect, useState } from 'react'
import {Link, useLocation} from 'react-router-dom'
import { HiArrowSmRight, HiUser } from 'react-icons/hi';
import { Sidebar } from 'flowbite-react';
import { useSelector, useDispatch } from 'react-redux';
import {
    signOutUserStart,
    signOutUserFailure,
    signOutUserSuccess
} from '../redux/user/userSlice';

const DashSidebar = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const [ tab, setTab ] = useState();
    useEffect(()=>{
      const urlParams = new URLSearchParams(location.search)
      const tabFromUrl = urlParams.get('tab')
      if(tabFromUrl){
        setTab(tabFromUrl);
      }
    },[location.search]);

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
        <Sidebar className='w-full md:w-56'>
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <Link to='/dashboard?tab=profile'>
                    <Sidebar.Item active={tab==='profile'} icon={HiUser} label={'User'} labelColor='dark'>
                        Profile
                    </Sidebar.Item>
                    </Link>
                    <Sidebar.Item icon={HiArrowSmRight} className='cursor-pointer' onClick={handleSignOut}>
                        Sign out
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    )
}

export default DashSidebar