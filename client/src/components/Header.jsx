import { Avatar, Button, Dropdown, DropdownDivider, DropdownHeader, DropdownItem, Navbar, TextInput } from 'flowbite-react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';
import {toogleTheme} from '../redux/theme/themeSlice';

export default function Header() {
    const path = useLocation().pathname;
    const dispatch = useDispatch();
    const { currentUser } = useSelector(state => state.user)
    const {theme} = useSelector((state) => state.theme);
    return (
        <Navbar className='border-b-2'>
            <Link to="/" className='self-center whitespace-nowrap text-sm 
       sm:text-xl font-semibold dark:text-white'>
                <span className='px-2 py-1 bg-gradient-to-tr from-indigo-500
         via-purple-500 to-pink-500 rounded-lg text-white'>Mern</span>
                Blog
            </Link>
            <form>
                <TextInput
                    type='text'
                    placeholder='Search...'
                    rightIcon={AiOutlineSearch}
                    className='hidden md:inline'
                />
            </form>
            <Button className='w-12 h-10 md:hidden' color='gray' pill>
                <AiOutlineSearch />
            </Button>
            <div className='flex gap-2 md:order-2'>
                <Button className='w-12 h-10 hidden sm:inline' color='gray' 
                pill
                onClick ={()=>dispatch(toogleTheme())}
                 >
                    {theme === 'light' ?  <FaMoon /> :<FaSun/>}
                    
                </Button>
                {currentUser ? (
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                            <Avatar
                                alt='user'
                                rounded
                            />
                        }
                    >
                      <DropdownHeader>
                        <span className='block text-sm'>@{currentUser.username}</span>
                        <span></span>
                      </DropdownHeader>
                      <Link to={'/dashboard?tab=profile'}>
                        <DropdownItem>
                            Profile
                        </DropdownItem>
                      </Link>
                      <DropdownDivider/>
                    <DropdownItem>
                        Sign out
                    </DropdownItem>
                    </Dropdown>
                ) : (
                    <Link to='/sign-in'>
                        <Button gradientDuoTone='purpleToBlue' outline>
                            Sign In
                        </Button>
                    </Link>
                )}

                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                <Navbar.Link active={path === "/"} as={'div'}>
                    <Link to='/'>
                        Home
                    </Link>
                </Navbar.Link>
                <Navbar.Link active={path === "/about"} as={'div'}>
                    <Link to='/about'>
                        About
                    </Link>
                </Navbar.Link>
                <Navbar.Link active={path === "/project"} as={'div'}>
                    <Link to='/project'>
                        Projects
                    </Link>
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>

    )
}
