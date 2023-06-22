import "./NavbarContainer.css"

const navItems = [
    {label:'首頁', active:false},
    {label:'綠山住民', active:false},
    {label:'行動情報', active:false},
    {label:'行動情報', active:false},
    {label:'綠行知測', active:false},
    {label:'行動募資', active:true},
    ];

const NavbarContainer = ({ handleNavItem }) => {
        return (
            <div className="navbar-container">
                {navItems.map((item, index) => (
                    <div
                        key={index}
                        className={item.active ? 'navbar-active' : 'navbar'}
                        onClick={() => handleNavItem(index)}
                    >
                        {item.label}
                    </div>
                ))}
            </div>
        );
    }
    
export default NavbarContainer;