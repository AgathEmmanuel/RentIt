import Link from 'next/link';

export default ({ currentUser }) => {


    const links = [
        !currentUser && { label: 'Sign Up', href: '/user/signup' },
        !currentUser && { label: 'Sign In', href: '/user/signin' },
        currentUser && { label: 'RentOut', href: '/product/new' },
        currentUser && { label: 'RentIns', href: '/rentins' },
        currentUser && { label: 'Sign Out', href: '/user/signout' }
    ].filter(linksff => linksff) //filter out any entries that are false
     .map(({ label,href }) => {
         return <li key={href} className="nav-item">  


            <Link href={href}>
            <a className='nav-link'>
            {label}
            </a>
            </Link>

         </li>

     })

    return <nav className='navbar navbar-light bg-light'>
        <Link href="/">
            <a className="navbar-brand">RentIt</a>
        </Link>


        <div className="d-flex justify-content-end">
            <ul className="nav d-flex align-items-center">
                {/* 
                {currentUser ? 'Sign Out': 'Sign In'}
                */}
                {links}
            </ul>
        </div>

    </nav>
}