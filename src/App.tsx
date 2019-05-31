import AdminAPI from "@api/AdminAPI";
import * as React from 'react';


class App extends React.Component {
    public async componentWillMount() {
        const iAdminModel = await AdminAPI.getAdmin();
        console.log(iAdminModel);
    }

    public render() {
        return (
            <div className="App">
                App
            </div>
        );
    }
}

export default App;
