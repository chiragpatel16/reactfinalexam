import { NavLink } from 'react-router-dom'

export default function Navbar() {
    const pages = [] 



    return (
        <div>
            {pages.map((el,index) => (
                <NavLink
                    key={index}
                    to={el.path}
                    className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "active" : ""
                }
                >
                    {el.title}
                </NavLink>
            ))}
        </div>
    )
}
