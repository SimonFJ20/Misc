import './Topbar.css'

let username = 'test';
function logoutEvent(e) {
    e.preventDefault();
    sessionStorage.removeItem('authToken');
    window.location.search = '';
}
function loginEvent(e) {
    e.preventDefault();
    window.location.search = 'page=login';
}

const logoutbutton = (
    <button onClick={logoutEvent}>{username}</button>
)

const loginbutton = (
    <button onClick={loginEvent}>Log ind</button>
)

function Userbutton(props) {
    if(props.loggedIn) return (
        logoutbutton
    )
    else return (
        loginbutton
    )
}


function Topbar() {
    
    return (
        <div id="topbar">
            <div id="topbarcontent">
                <Userbutton loggedIn={false}/>
                <h1>GF2Intra</h1>
            </div>
        </div>
    );

}

export default Topbar;
