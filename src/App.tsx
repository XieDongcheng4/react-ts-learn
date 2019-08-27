import AdminApi from "@api/admin-api";
import * as React from 'react';
import StyledComponentDemo from "./component/StyledComponentDemo/StyledComponentDemo";
import GlobalCSS from './global-styled'

class App extends React.Component {
     async componentWillMount() {
        const iAdminModel = await AdminApi.getAdmin();
        console.log(iAdminModel);
    }

    public render() {
        return (
            <div className="App">
                <StyledComponentDemo/>
                <GlobalCSS/>
            </div>
        );
    }
}
export default App;
