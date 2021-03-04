import Topbar from './components/Topbar'


export const authState = {
    autherized: false,
    token: -1
}



function App() {

    if(sessionStorage.getItem('authToken')) {
        authState.token = sessionStorage.getItem('authToken');
        authState.autherized = true;
    }


    return (
        <div className="App">
            <Topbar></Topbar>
        </div>
    );
}

export default App;
